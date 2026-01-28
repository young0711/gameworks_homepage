/**
 * 지원 도메인 타입
 */
import { Database } from './database';

export type Application = Database['public']['Tables']['applications']['Row'];
export type ApplicationInsert = Database['public']['Tables']['applications']['Insert'];
export type ApplicationUpdate = Database['public']['Tables']['applications']['Update'];

export interface ApplicationWithApplicant extends Application {
  applicant: {
    id: string;
    name: string;
    email: string | null;
  };
}
