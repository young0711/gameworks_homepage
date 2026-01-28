# 프로젝트 구조 (Project Structure)

## 개요
이 문서는 GAMEWORKS 공식 웹사이트의 프로젝트 구조를 설명합니다.

## 폴더 구조

```
gameworks_homepage/
├── app/                          # Next.js 15 App Router
│   ├── (auth)/                   # 인증 관련 라우트 그룹
│   │   ├── login/
│   │   └── signup/
│   ├── (dashboard)/              # 인증 필요 페이지 그룹
│   │   ├── board/
│   │   │   ├── [id]/            # 동적 라우트
│   │   │   └── write/
│   │   ├── profile/
│   │   └── apply/
│   ├── member/                   # 공개 페이지
│   ├── roadmap/
│   ├── history/
│   ├── api/                      # API Routes
│   ├── layout.tsx                # Root Layout
│   ├── page.tsx                  # Landing Page
│   └── providers.tsx             # Context Providers
│
├── components/
│   ├── ui/                       # shadcn/ui 기본 컴포넌트
│   ├── layout/                   # 레이아웃 컴포넌트
│   ├── landing/                  # 랜딩 페이지 섹션
│   ├── board/                    # 게시판 도메인 컴포넌트
│   ├── member/                   # 멤버 도메인 컴포넌트
│   ├── roadmap/                  # 로드맵 도메인 컴포넌트
│   ├── history/                  # 히스토리 도메인 컴포넌트
│   └── apply/                    # 지원 도메인 컴포넌트
│
├── lib/
│   ├── supabase/                 # Supabase 클라이언트
│   │   ├── client.ts             # 브라우저용
│   │   ├── server.ts             # 서버용
│   │   └── middleware.ts         # 미들웨어용
│   ├── utils/                    # 유틸리티 함수
│   │   ├── cn.ts                 # className 유틸
│   │   └── date.ts               # 날짜 포맷팅
│   └── constants/                 # 상수
│       ├── routes.ts
│       └── metadata.ts
│
├── hooks/                         # 커스텀 React 훅
│   ├── useAuth.ts
│   ├── useBoard.ts
│   ├── useApply.ts
│   ├── useScrollAnimation.ts
│   └── useIntersectionObserver.ts
│
├── types/                         # TypeScript 타입 정의
│   ├── database.ts               # Supabase DB 타입
│   ├── api.ts                    # API 응답 타입
│   ├── board.ts                  # 게시판 도메인 타입
│   ├── member.ts                 # 멤버 도메인 타입
│   └── apply.ts                  # 지원 도메인 타입
│
├── contexts/                      # React Context
│   └── AuthContext.tsx
│
├── styles/                       # 스타일 파일
│   └── animations.css
│
├── docs/                         # 문서
│   ├── tech-stack.md
│   ├── db-schema.md
│   └── PROJECT_STRUCTURE.md
│
├── public/                       # 정적 파일
│   ├── images/
│   └── icons/
│
└── middleware.ts                 # Next.js Middleware
```

## 주요 설계 원칙

### 1. 도메인 중심 구조
- 각 도메인(board, member, apply 등)은 독립적인 컴포넌트와 타입을 가집니다.
- 도메인 간 의존성을 최소화하여 유지보수성을 높입니다.

### 2. Route Groups 활용
- `(auth)`: 인증 관련 페이지 그룹
- `(dashboard)`: 인증이 필요한 페이지 그룹
- Route Groups는 URL에 영향을 주지 않으면서 레이아웃과 미들웨어를 공유할 수 있습니다.

### 3. Server/Client Component 분리
- 기본적으로 Server Component를 사용하여 SEO와 성능을 최적화합니다.
- 인터랙션이나 상태 관리가 필요한 경우에만 `'use client'`를 사용합니다.

### 4. 타입 안정성
- Supabase에서 자동 생성된 타입을 `types/database.ts`에 저장합니다.
- 도메인별 타입은 `types/` 폴더에 분리하여 관리합니다.

### 5. 재사용성
- 공통 로직은 커스텀 훅(`hooks/`)으로 추출합니다.
- 공통 유틸리티는 `lib/utils/`에 배치합니다.

## 다음 단계

1. **의존성 설치**
   ```bash
   npm install @supabase/supabase-js @supabase/ssr
   npm install framer-motion
   npm install clsx tailwind-merge
   npm install date-fns
   npx shadcn-ui@latest init
   ```

2. **환경 변수 설정**
   - `.env.local` 파일을 생성하고 `.env.example`의 내용을 참고하여 설정합니다.

3. **Supabase 설정**
   - `docs/db-schema.md`를 참고하여 데이터베이스 스키마를 생성합니다.
   - Supabase CLI를 사용하여 타입을 자동 생성합니다.

4. **컴포넌트 구현**
   - 각 컴포넌트의 TODO 주석을 참고하여 기능을 구현합니다.

## 참고 문서
- [기술 명세서](./tech-stack.md)
- [데이터베이스 설계 가이드](./db-schema.md)
