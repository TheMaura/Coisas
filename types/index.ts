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
  category: 'career' | 'achievement' | 'inspiration' | 'challenge' | 'legacy';
  image_url?: string;
  video_url?: string;
  is_featured: boolean;
  created_by?: string;
  created_at?: string;
  updated_at?: string;
  legend?: Legend;
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
  user_id: string;
  title: string;
  message: string;
  type: 'new_legend' | 'update' | 'general' | 'story' | 'media';
  read: boolean;
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
