/**
 * 게시판 도메인 타입
 */
import { Database } from './database';

export type Post = Database['public']['Tables']['posts']['Row'];
export type PostInsert = Database['public']['Tables']['posts']['Insert'];
export type PostUpdate = Database['public']['Tables']['posts']['Update'];

export type Comment = Database['public']['Tables']['comments']['Row'];
export type CommentInsert = Database['public']['Tables']['comments']['Insert'];
export type CommentUpdate = Database['public']['Tables']['comments']['Update'];

export interface PostWithAuthor extends Post {
  author: {
    id: string;
    name: string;
    avatar_url: string | null;
  };
  comment_count?: number;
}

export interface CommentWithAuthor extends Comment {
  author: {
    id: string;
    name: string;
    avatar_url: string | null;
  };
  replies?: CommentWithAuthor[];
}
