-- ============================================
-- EXPANDIR SCHEMA COMPLETO - FUTEBOL LEGENDS
-- Adiciona: Troféus, Vídeos YouTube, Histórico, Quiz Expandido
-- ============================================

-- ============================================
-- 1. TABELA DE TROFÉUS
-- ============================================
CREATE TABLE IF NOT EXISTS trophies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  legend_id UUID NOT NULL REFERENCES legends(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  competition TEXT NOT NULL, -- Ex: "Copa do Mundo", "Champions League", "Brasileirão"
  year INTEGER NOT NULL,
  season TEXT, -- Ex: "2022/2023"
  description TEXT,
  image_url TEXT, -- URL da imagem do troféu
  category TEXT DEFAULT 'club', -- 'club', 'national', 'individual', 'youth'
  is_major BOOLEAN DEFAULT false, -- Troféus principais destacados
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_trophies_legend_id ON trophies(legend_id);
CREATE INDEX IF NOT EXISTS idx_trophies_year ON trophies(year DESC);
CREATE INDEX IF NOT EXISTS idx_trophies_category ON trophies(category);

-- ============================================
-- 2. TABELA DE VÍDEOS DO YOUTUBE
-- ============================================
CREATE TABLE IF NOT EXISTS youtube_videos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  legend_id UUID NOT NULL REFERENCES legends(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  youtube_id TEXT NOT NULL UNIQUE, -- ID do vídeo do YouTube
  thumbnail_url TEXT,
  duration INTEGER, -- Duração em segundos
  view_count INTEGER DEFAULT 0,
  category TEXT DEFAULT 'highlights', -- 'highlights', 'documentary', 'interview', 'goals', 'skills', 'history'
  is_featured BOOLEAN DEFAULT false,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_youtube_videos_legend_id ON youtube_videos(legend_id);
CREATE INDEX IF NOT EXISTS idx_youtube_videos_category ON youtube_videos(category);
CREATE INDEX IF NOT EXISTS idx_youtube_videos_featured ON youtube_videos(is_featured) WHERE is_featured = true;

-- ============================================
-- 3. TABELA DE HISTÓRICO COMPLETO (MARCOS DA CARREIRA)
-- ============================================
CREATE TABLE IF NOT EXISTS career_milestones (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  legend_id UUID NOT NULL REFERENCES legends(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  date DATE NOT NULL,
  milestone_type TEXT NOT NULL, -- 'debut', 'transfer', 'goal', 'trophy', 'record', 'retirement', 'award', 'injury', 'comeback'
  importance TEXT DEFAULT 'normal', -- 'low', 'normal', 'high', 'legendary'
  image_url TEXT,
  video_url TEXT,
  club_name TEXT,
  competition_name TEXT,
  metadata JSONB, -- Dados adicionais flexíveis
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_career_milestones_legend_id ON career_milestones(legend_id);
CREATE INDEX IF NOT EXISTS idx_career_milestones_date ON career_milestones(date DESC);
CREATE INDEX IF NOT EXISTS idx_career_milestones_type ON career_milestones(milestone_type);

-- ============================================
-- 4. CRIAR/EXPANDIR TABELA DE QUIZ QUESTIONS
-- ============================================
-- Criar tabela se não existir
CREATE TABLE IF NOT EXISTS quiz_questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question TEXT NOT NULL,
  options JSONB NOT NULL,
  correct_answer INTEGER NOT NULL,
  explanation TEXT,
  difficulty TEXT DEFAULT 'medium',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Adicionar colunas para expandir o quiz (se não existirem)
ALTER TABLE quiz_questions 
  ADD COLUMN IF NOT EXISTS legend_id UUID REFERENCES legends(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS question_type TEXT DEFAULT 'general', -- 'general', 'biography', 'statistics', 'trophies', 'career', 'trivia'
  ADD COLUMN IF NOT EXISTS points INTEGER DEFAULT 10,
  ADD COLUMN IF NOT EXISTS time_limit INTEGER DEFAULT 30, -- Segundos
  ADD COLUMN IF NOT EXISTS tags TEXT[] DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS image_url TEXT,
  ADD COLUMN IF NOT EXISTS video_url TEXT,
  ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true;

CREATE INDEX IF NOT EXISTS idx_quiz_questions_legend_id ON quiz_questions(legend_id);
CREATE INDEX IF NOT EXISTS idx_quiz_questions_type ON quiz_questions(question_type);
CREATE INDEX IF NOT EXISTS idx_quiz_questions_difficulty ON quiz_questions(difficulty);
CREATE INDEX IF NOT EXISTS idx_quiz_questions_active ON quiz_questions(is_active) WHERE is_active = true;

-- ============================================
-- 5. TABELA DE RESULTADOS DO QUIZ
-- ============================================
CREATE TABLE IF NOT EXISTS quiz_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  total_questions INTEGER NOT NULL,
  correct_answers INTEGER NOT NULL,
  score INTEGER NOT NULL,
  time_taken INTEGER, -- Segundos
  difficulty TEXT DEFAULT 'medium',
  quiz_type TEXT DEFAULT 'general', -- Tipo de quiz realizado
  completed_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_quiz_results_user_id ON quiz_results(user_id);
CREATE INDEX IF NOT EXISTS idx_quiz_results_score ON quiz_results(score DESC);
CREATE INDEX IF NOT EXISTS idx_quiz_results_completed_at ON quiz_results(completed_at DESC);

-- ============================================
-- 6. EXPANDIR TABELA DE STORIES
-- ============================================
ALTER TABLE stories
  ADD COLUMN IF NOT EXISTS reading_time INTEGER, -- Tempo estimado de leitura em minutos
  ADD COLUMN IF NOT EXISTS view_count INTEGER DEFAULT 0,
  ADD COLUMN IF NOT EXISTS like_count INTEGER DEFAULT 0,
  ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS tags TEXT[] DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS author_name TEXT,
  ADD COLUMN IF NOT EXISTS image_gallery TEXT[] DEFAULT '{}', -- Array de URLs de imagens
  ADD COLUMN IF NOT EXISTS video_url TEXT,
  ADD COLUMN IF NOT EXISTS related_stories UUID[] DEFAULT '{}'; -- IDs de histórias relacionadas

CREATE INDEX IF NOT EXISTS idx_stories_featured ON stories(is_featured) WHERE is_featured = true;
CREATE INDEX IF NOT EXISTS idx_stories_view_count ON stories(view_count DESC);

-- ============================================
-- 7. EXPANDIR TABELA DE MEDIA
-- ============================================
ALTER TABLE media
  ADD COLUMN IF NOT EXISTS view_count INTEGER DEFAULT 0,
  ADD COLUMN IF NOT EXISTS like_count INTEGER DEFAULT 0,
  ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS tags TEXT[] DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS location TEXT, -- Local onde foi tirada/gravada
  ADD COLUMN IF NOT EXISTS photographer TEXT,
  ADD COLUMN IF NOT EXISTS resolution TEXT, -- Ex: "1920x1080"
  ADD COLUMN IF NOT EXISTS file_size INTEGER, -- Tamanho em bytes
  ADD COLUMN IF NOT EXISTS metadata JSONB; -- Dados EXIF ou outros metadados

CREATE INDEX IF NOT EXISTS idx_media_featured ON media(is_featured) WHERE is_featured = true;
CREATE INDEX IF NOT EXISTS idx_media_view_count ON media(view_count DESC);

-- ============================================
-- 8. TABELA DE LIKES EM STORIES E MEDIA
-- ============================================
CREATE TABLE IF NOT EXISTS story_likes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  story_id UUID NOT NULL REFERENCES stories(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, story_id)
);

CREATE TABLE IF NOT EXISTS media_likes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  media_id UUID NOT NULL REFERENCES media(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, media_id)
);

CREATE INDEX IF NOT EXISTS idx_story_likes_story_id ON story_likes(story_id);
CREATE INDEX IF NOT EXISTS idx_media_likes_media_id ON media_likes(media_id);

-- ============================================
-- 9. POLÍTICAS RLS PARA NOVAS TABELAS
-- ============================================

-- Troféus: Todos podem ver, apenas admins podem modificar
ALTER TABLE trophies ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can view trophies" ON trophies;
CREATE POLICY "Anyone can view trophies" ON trophies
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admins can manage trophies" ON trophies;
CREATE POLICY "Admins can manage trophies" ON trophies
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid() AND profiles.is_admin = true
    )
  );

-- Vídeos YouTube: Todos podem ver, apenas admins podem modificar
ALTER TABLE youtube_videos ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can view youtube videos" ON youtube_videos;
CREATE POLICY "Anyone can view youtube videos" ON youtube_videos
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admins can manage youtube videos" ON youtube_videos;
CREATE POLICY "Admins can manage youtube videos" ON youtube_videos
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid() AND profiles.is_admin = true
    )
  );

-- Marcos da Carreira: Todos podem ver, apenas admins podem modificar
ALTER TABLE career_milestones ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can view career milestones" ON career_milestones;
CREATE POLICY "Anyone can view career milestones" ON career_milestones
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admins can manage career milestones" ON career_milestones;
CREATE POLICY "Admins can manage career milestones" ON career_milestones
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid() AND profiles.is_admin = true
    )
  );

-- Resultados do Quiz: Usuários podem ver e criar seus próprios resultados
ALTER TABLE quiz_results ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own quiz results" ON quiz_results;
CREATE POLICY "Users can view own quiz results" ON quiz_results
  FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can create own quiz results" ON quiz_results;
CREATE POLICY "Users can create own quiz results" ON quiz_results
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Likes: Usuários podem gerenciar seus próprios likes
ALTER TABLE story_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE media_likes ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can manage own story likes" ON story_likes;
CREATE POLICY "Users can manage own story likes" ON story_likes
  FOR ALL USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can manage own media likes" ON media_likes;
CREATE POLICY "Users can manage own media likes" ON media_likes
  FOR ALL USING (auth.uid() = user_id);

-- ============================================
-- 10. FUNÇÕES PARA ATUALIZAR CONTADORES
-- ============================================

-- Função para atualizar contador de views em stories
CREATE OR REPLACE FUNCTION update_story_view_count()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE stories
  SET view_count = view_count + 1
  WHERE id = NEW.story_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para atualizar view_count quando uma view é registrada
DROP TRIGGER IF EXISTS trigger_update_story_view_count ON view_stats;
CREATE TRIGGER trigger_update_story_view_count
  AFTER INSERT ON view_stats
  FOR EACH ROW
  WHEN (NEW.view_type = 'story' AND NEW.story_id IS NOT NULL)
  EXECUTE FUNCTION update_story_view_count();

-- Função para atualizar contador de likes em stories
CREATE OR REPLACE FUNCTION update_story_like_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE stories SET like_count = like_count + 1 WHERE id = NEW.story_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE stories SET like_count = GREATEST(0, like_count - 1) WHERE id = OLD.story_id;
  END IF;
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

-- Trigger para atualizar like_count em stories
DROP TRIGGER IF EXISTS trigger_update_story_like_count ON story_likes;
CREATE TRIGGER trigger_update_story_like_count
  AFTER INSERT OR DELETE ON story_likes
  FOR EACH ROW
  EXECUTE FUNCTION update_story_like_count();

-- Função para atualizar contador de likes em media
CREATE OR REPLACE FUNCTION update_media_like_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE media SET like_count = like_count + 1 WHERE id = NEW.media_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE media SET like_count = GREATEST(0, like_count - 1) WHERE id = OLD.media_id;
  END IF;
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

-- Trigger para atualizar like_count em media
DROP TRIGGER IF EXISTS trigger_update_media_like_count ON media_likes;
CREATE TRIGGER trigger_update_media_like_count
  AFTER INSERT OR DELETE ON media_likes
  FOR EACH ROW
  EXECUTE FUNCTION update_media_like_count();

-- ============================================
-- 11. VERIFICAÇÃO
-- ============================================

-- Verificar tabelas criadas
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
  AND table_name IN ('trophies', 'youtube_videos', 'career_milestones', 'quiz_results', 'story_likes', 'media_likes')
ORDER BY table_name;

-- Verificar índices criados
SELECT indexname, tablename 
FROM pg_indexes 
WHERE schemaname = 'public' 
  AND tablename IN ('trophies', 'youtube_videos', 'career_milestones', 'quiz_results', 'story_likes', 'media_likes')
ORDER BY tablename, indexname;

-- ============================================
-- FIM
-- ============================================

