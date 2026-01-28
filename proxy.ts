import { NextResponse, type NextRequest } from 'next/server';
import { createClient } from '@/lib/supabase/middleware';

/**
 * Next.js Proxy (formerly Middleware)
 * 인증이 필요한 경로를 보호하고 세션을 갱신합니다.
 *
 * NOTE: Supabase 환경변수가 없으면(로컬 개발 등) 인증 보호를 비활성화하고
 *       요청을 그대로 통과시켜 개발 서버가 크래시 나지 않도록 합니다.
 */
export async function proxy(request: NextRequest) {
  const { supabase, supabaseResponse } = createClient(request);

  // Supabase 설정이 없으면 인증/세션 갱신을 스킵
  if (!supabase) return NextResponse.next();

  // 세션 갱신
  await supabase.auth.getUser();

  // 인증이 필요한 경로 체크
  const { pathname } = request.nextUrl;
  const protectedPaths = ['/board', '/profile', '/apply'];
  const isProtectedPath = protectedPaths.some((path) => pathname.startsWith(path));

  if (isProtectedPath) {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      const redirectUrl = request.nextUrl.clone();
      redirectUrl.pathname = '/login';
      redirectUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(redirectUrl);
    }
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};

