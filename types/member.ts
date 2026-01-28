/**
 * 멤버 도메인 타입
 */
import { Database } from './database';

export type Member = Database['public']['Tables']['members']['Row'];
export type MemberInsert = Database['public']['Tables']['members']['Insert'];
export type MemberUpdate = Database['public']['Tables']['members']['Update'];

export interface MemberWithProfile extends Member {
  profile: {
    id: string;
    name: string;
    email: string | null;
    avatar_url: string | null;
  };
}
