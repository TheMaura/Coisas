-- Schema estendido para funcionalidades completas

-- Atualizar tabela profiles com mais campos
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS full_name TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS bio TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS favorite_legend_id UUID REFERENCES legends(id);
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS stats JSONB DEFAULT '{"favorites_count": 0, "stories_read": 0}'::jsonb;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS preferences JSONB DEFAULT '{"notifications_enabled": true, "theme": "dark"}'::jsonb;

-- Tabela de histórias inspiradoras
CREATE TABLE IF NOT EXISTS stories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  legend_id UUID REFERENCES legends(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT CHECK (category IN ('career', 'achievement', 'inspiration', 'challenge', 'legacy')),
  image_url TEXT,
  video_url TEXT,
  order_index INTEGER DEFAULT 0,
  is_featured BOOLEAN DEFAULT FALSE,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabela de mídias (imagens e vídeos)
CREATE TABLE IF NOT EXISTS media (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  legend_id UUID REFERENCES legends(id) ON DELETE CASCADE NOT NULL,
  story_id UUID REFERENCES stories(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('image', 'video')),
  url TEXT NOT NULL,
  thumbnail_url TEXT,
  title TEXT,
  description TEXT,
  source TEXT,
  year INTEGER,
  is_featured BOOLEAN DEFAULT FALSE,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabela de moderação de conteúdo
CREATE TABLE IF NOT EXISTS content_moderation (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  content_type TEXT NOT NULL CHECK (content_type IN ('legend', 'story', 'media', 'comment')),
  content_id UUID NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('pending', 'approved', 'rejected', 'flagged')),
  reason TEXT,
  moderated_by UUID REFERENCES auth.users(id),
  moderated_at TIMESTAMPTZ DEFAULT NOW(),
  notes TEXT
);

-- Tabela de comentários (funcionalidade adicional)
CREATE TABLE IF NOT EXISTS comments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  legend_id UUID REFERENCES legends(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  content TEXT NOT NULL,
  parent_id UUID REFERENCES comments(id) ON DELETE CASCADE,
  likes_count INTEGER DEFAULT 0,
  is_approved BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabela de curtidas em comentários
CREATE TABLE IF NOT EXISTS comment_likes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  comment_id UUID REFERENCES comments(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(comment_id, user_id)
);

-- Tabela de estatísticas de visualização
CREATE TABLE IF NOT EXISTS view_stats (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  legend_id UUID REFERENCES legends(id) ON DELETE CASCADE,
  story_id UUID REFERENCES stories(id) ON DELETE CASCADE,
  media_id UUID REFERENCES media(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  view_type TEXT NOT NULL CHECK (view_type IN ('legend', 'story', 'media')),
  viewed_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices para performance
CREATE INDEX IF NOT EXISTS idx_stories_legend_id ON stories(legend_id);
CREATE INDEX IF NOT EXISTS idx_stories_category ON stories(category);
CREATE INDEX IF NOT EXISTS idx_stories_featured ON stories(is_featured);
CREATE INDEX IF NOT EXISTS idx_media_legend_id ON media(legend_id);
CREATE INDEX IF NOT EXISTS idx_media_type ON media(type);
CREATE INDEX IF NOT EXISTS idx_media_featured ON media(is_featured);
CREATE INDEX IF NOT EXISTS idx_comments_legend_id ON comments(legend_id);
CREATE INDEX IF NOT EXISTS idx_comments_user_id ON comments(user_id);
CREATE INDEX IF NOT EXISTS idx_view_stats_legend_id ON view_stats(legend_id);
CREATE INDEX IF NOT EXISTS idx_view_stats_user_id ON view_stats(user_id);

-- RLS para stories
ALTER TABLE stories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view approved stories" ON stories
  FOR SELECT USING (true);

CREATE POLICY "Admins can manage stories" ON stories
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid() AND profiles.is_admin = TRUE
    )
  );

-- RLS para media
ALTER TABLE media ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view media" ON media
  FOR SELECT USING (true);

CREATE POLICY "Admins can manage media" ON media
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid() AND profiles.is_admin = TRUE
    )
  );

-- RLS para comments
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view approved comments" ON comments
  FOR SELECT USING (is_approved = TRUE);

CREATE POLICY "Users can create comments" ON comments
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own comments" ON comments
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own comments" ON comments
  FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Admins can moderate comments" ON comments
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid() AND profiles.is_admin = TRUE
    )
  );

-- RLS para content_moderation
ALTER TABLE content_moderation ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view moderation" ON content_moderation
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid() AND profiles.is_admin = TRUE
    )
  );

CREATE POLICY "Admins can manage moderation" ON content_moderation
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid() AND profiles.is_admin = TRUE
    )
  );

-- Função para atualizar estatísticas de visualização
CREATE OR REPLACE FUNCTION update_view_stats()
RETURNS TRIGGER AS $$
BEGIN
  -- Atualizar contador de visualizações do perfil
  IF NEW.user_id IS NOT NULL THEN
    UPDATE profiles
    SET stats = jsonb_set(
      COALESCE(stats, '{}'::jsonb),
      '{stories_read}',
      to_jsonb((COALESCE(stats->>'stories_read', '0')::int + 1))
    )
    WHERE id = NEW.user_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_view_stats_trigger
  AFTER INSERT ON view_stats
  FOR EACH ROW EXECUTE FUNCTION update_view_stats();

-- Função para atualizar contador de favoritos
CREATE OR REPLACE FUNCTION update_favorites_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE profiles
    SET stats = jsonb_set(
      COALESCE(stats, '{}'::jsonb),
      '{favorites_count}',
      to_jsonb((COALESCE(stats->>'favorites_count', '0')::int + 1))
    )
    WHERE id = NEW.user_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE profiles
    SET stats = jsonb_set(
      COALESCE(stats, '{}'::jsonb),
      '{favorites_count}',
      to_jsonb(GREATEST((COALESCE(stats->>'favorites_count', '0')::int - 1), 0))
    )
    WHERE id = OLD.user_id;
  END IF;
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_favorites_count_trigger
  AFTER INSERT OR DELETE ON favorites
  FOR EACH ROW EXECUTE FUNCTION update_favorites_count();

