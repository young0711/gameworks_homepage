'use client';

import { createBrowserClient } from '@supabase/ssr';
import type { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '@/types/database';

/**
 * 브라우저 환경에서 사용하는 Supabase 클라이언트
 * Client Components에서 사용
 */
export function createClient(): SupabaseClient<Database> | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // 빌드/프리렌더 단계(또는 환경변수 미설정)에서 크래시를 피하기 위해
  // 값이 없으면 null을 반환하고, 호출부에서 기능을 비활성화합니다.
  if (!url || !anonKey) return null;

  return createBrowserClient<Database>(url, anonKey);
}
