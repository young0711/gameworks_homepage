/**
 * Supabase 데이터베이스 타입 정의
 * 
 * Supabase CLI를 사용하여 자동 생성:
 * npx supabase gen types typescript --project-id <project-id> > types/database.ts
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string | null;
          name: string;
          student_id: string | null;
          year: number | null;
          major: string | null;
          bio: string | null;
          avatar_url: string | null;
          role: 'member' | 'admin' | 'executive';
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['profiles']['Row'], 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['profiles']['Insert']>;
      };
      posts: {
        Row: {
          id: string;
          author_id: string;
          title: string;
          content: string;
          category: 'qa' | 'notice' | 'general';
          view_count: number;
          is_pinned: boolean;
          is_deleted: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['posts']['Row'], 'id' | 'created_at' | 'updated_at' | 'view_count' | 'is_pinned' | 'is_deleted'>;
        Update: Partial<Database['public']['Tables']['posts']['Insert']>;
      };
      comments: {
        Row: {
          id: string;
          post_id: string;
          author_id: string;
          content: string;
          parent_id: string | null;
          is_deleted: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['comments']['Row'], 'id' | 'created_at' | 'updated_at' | 'is_deleted'>;
        Update: Partial<Database['public']['Tables']['comments']['Insert']>;
      };
      applications: {
        Row: {
          id: string;
          applicant_id: string;
          motivation: string;
          experience: string | null;
          expectations: string | null;
          status: 'pending' | 'reviewing' | 'accepted' | 'rejected';
          reviewed_by: string | null;
          reviewed_at: string | null;
          notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['applications']['Row'], 'id' | 'created_at' | 'updated_at' | 'status' | 'reviewed_by' | 'reviewed_at' | 'notes'>;
        Update: Partial<Database['public']['Tables']['applications']['Insert']>;
      };
      members: {
        Row: {
          id: string;
          profile_id: string;
          position: 'president' | 'vice_president' | 'secretary' | 'member';
          year: number | null;
          semester: string | null;
          tech_stack: string[] | null;
          bio: string | null;
          image_url: string | null;
          display_order: number;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['members']['Row'], 'id' | 'created_at' | 'updated_at' | 'display_order' | 'is_active'>;
        Update: Partial<Database['public']['Tables']['members']['Insert']>;
      };
      events: {
        Row: {
          id: string;
          title: string;
          description: string | null;
          event_type: 'schedule' | 'event' | 'milestone';
          start_date: string | null;
          end_date: string | null;
          is_tentative: boolean;
          requires_meeting: boolean;
          color: string;
          display_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['events']['Row'], 'id' | 'created_at' | 'updated_at' | 'display_order' | 'is_tentative' | 'requires_meeting' | 'color' | 'event_type'>;
        Update: Partial<Database['public']['Tables']['events']['Insert']>;
      };
      history: {
        Row: {
          id: string;
          year: number;
          title: string;
          description: string | null;
          image_url: string | null;
          category: string | null;
          display_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['history']['Row'], 'id' | 'created_at' | 'updated_at' | 'display_order'>;
        Update: Partial<Database['public']['Tables']['history']['Insert']>;
      };
    };
  };
}
