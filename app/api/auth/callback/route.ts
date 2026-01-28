import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');

  if (code) {
    const supabase = await createClient();
    // Supabase 환경변수가 없으면(로컬 개발 등) 인증 처리를 스킵
    if (supabase) {
      await supabase.auth.exchangeCodeForSession(code);
    }
  }

  // 인증 후 리다이렉트할 URL
  return NextResponse.redirect(requestUrl.origin);
}
