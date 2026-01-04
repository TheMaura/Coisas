// Tipos TypeScript para o aplicativo

export interface User {
  id: string;
  email: string;
  created_at?: string;
}

export interface Profile {
  id: string;
  email: string;
  full_name?: string;
  name?: string;
  bio?: string;
  avatar_url?: string;
  favorite_legend_id?: string;
  is_admin: boolean;
  stats?: {
    favorites_count: number;
    stories_read: number;
  };
  preferences?: {
    notifications_enabled: boolean;
    theme: string;
  };
  created_at?: string;
  updated_at?: string;
}

export interface Legend {
  id: string;
  name: string;
  full_name?: string;
  nationality: string;
  position: string;
  current_club?: string;
  club?: string;
  birth_date?: string;
  biography: string;
  achievements?: string[];
  image_url?: string;
  video_url?: string;
  gallery?: string[];
  is_active?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface Story {
  id: string;
  legend_id: string;
  title: string;
  content: string;
  category?: 'career' | 'achievement' | 'inspiration' | 'challenge' | 'legacy';
  image_url?: string;
  video_url?: string;
  is_featured: boolean;
  created_by?: string;
  created_at?: string;
  updated_at?: string;
  legend?: Legend;
  reading_time?: number;
  view_count?: number;
  like_count?: number;
  tags?: string[];
  author_name?: string;
  image_gallery?: string[];
  related_stories?: string[];
}

export interface Media {
  id: string;
  legend_id: string;
  story_id?: string;
  type: 'image' | 'video';
  url: string;
  thumbnail_url?: string;
  title?: string;
  description?: string;
  source?: string;
  year?: number;
  is_featured: boolean;
  created_at?: string;
}

export interface Favorite {
  id: string;
  user_id: string;
  legend_id: string;
  created_at?: string;
  legends?: Legend;
}

export interface Notification {
  id: string;
  user_id?: string; // Pode ser null para notificações gerais
  title: string;
  message: string;
  type: 'new_legend' | 'update' | 'general' | 'story' | 'media' | 'legend';
  read?: boolean; // Compatibilidade com schema antigo
  is_read?: boolean; // Novo nome preferido
  legend_id?: string;
  created_at?: string;
}

export interface Comment {
  id: string;
  legend_id: string;
  user_id: string;
  content: string;
  parent_id?: string;
  likes_count: number;
  is_approved: boolean;
  created_at?: string;
  updated_at?: string;
  user?: Profile;
  replies?: Comment[];
}

export interface ContentModeration {
  id: string;
  content_type: 'legend' | 'story' | 'media' | 'comment';
  content_id: string;
  status: 'pending' | 'approved' | 'rejected' | 'flagged';
  reason?: string;
  moderated_by?: string;
  moderated_at?: string;
  notes?: string;
}

export interface ViewStat {
  id: string;
  legend_id?: string;
  story_id?: string;
  media_id?: string;
  user_id?: string;
  view_type: 'legend' | 'story' | 'media';
  viewed_at?: string;
}

export interface Trophy {
  id: string;
  legend_id: string;
  name: string;
  competition: string;
  year: number;
  season?: string;
  description?: string;
  image_url?: string;
  category: 'club' | 'national' | 'individual' | 'youth';
  is_major: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface YouTubeVideo {
  id: string;
  legend_id: string;
  title: string;
  description?: string;
  youtube_id: string;
  thumbnail_url?: string;
  duration?: number;
  view_count: number;
  category: 'highlights' | 'documentary' | 'interview' | 'goals' | 'skills' | 'history';
  is_featured: boolean;
  published_at?: string;
  created_at?: string;
  updated_at?: string;
}

export interface CareerMilestone {
  id: string;
  legend_id: string;
  title: string;
  description: string;
  date: string;
  milestone_type: 'debut' | 'transfer' | 'goal' | 'trophy' | 'record' | 'retirement' | 'award' | 'injury' | 'comeback';
  importance: 'low' | 'normal' | 'high' | 'legendary';
  image_url?: string;
  video_url?: string;
  club_name?: string;
  competition_name?: string;
  metadata?: Record<string, any>;
  created_at?: string;
  updated_at?: string;
}

export interface QuizResult {
  id: string;
  user_id: string;
  total_questions: number;
  correct_answers: number;
  score: number;
  time_taken?: number;
  difficulty: string;
  quiz_type: string;
  completed_at?: string;
  created_at?: string;
}

export interface SearchFilters {
  query?: string;
  nationality?: string;
  position?: string;
  club?: string;
  category?: string;
  year?: number;
  sortBy?: 'name' | 'created_at' | 'popularity';
  sortOrder?: 'asc' | 'desc';
}
