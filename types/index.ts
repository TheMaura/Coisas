export interface User {
  id: string;
  email?: string;
  full_name?: string;
  avatar_url?: string;
  is_admin?: boolean;
  created_at: string;
  updated_at: string;
}

export interface Legend {
  id: string;
  name: string;
  full_name?: string;
  nationality?: string;
  position?: string;
  current_club?: string;
  birth_date?: string;
  biography?: string;
  achievements?: string;
  image_url?: string;
  created_at: string;
  updated_at: string;
  created_by?: string;
  is_active?: boolean;
}

export interface Story {
  id: string;
  legend_id: string;
  title: string;
  content: string;
  image_url?: string;
  created_at: string;
  updated_at: string;
  created_by?: string;
  is_active?: boolean;
}

export interface Media {
  id: string;
  legend_id: string;
  media_type: 'image' | 'video';
  url: string;
  thumbnail_url?: string;
  title?: string;
  description?: string;
  created_at: string;
  created_by?: string;
  is_active?: boolean;
}

export interface Favorite {
  id: string;
  user_id: string;
  legend_id: string;
  created_at: string;
  legend?: Legend;
}

export interface Notification {
  id: string;
  user_id?: string;
  title: string;
  message: string;
  type?: string;
  legend_id?: string;
  is_read?: boolean;
  created_at: string;
}

