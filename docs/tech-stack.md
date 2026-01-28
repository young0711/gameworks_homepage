# 기술 명세서 (Tech Stack)

## 프로젝트 개요
- **프레임워크**: Next.js 15 (App Router)
- **언어**: TypeScript
- **스타일링**: Tailwind CSS 4
- **백엔드**: Supabase (PostgreSQL + Auth + Storage)
- **애니메이션**: Framer Motion
- **UI 컴포넌트**: shadcn/ui

---

## 1. Core Framework & Runtime

### Next.js 15 (App Router)
- **버전**: 16.1.6+ (Next.js 15 호환)
- **사용 목적**:
  - Server Components를 통한 SEO 최적화
  - Route Groups `(auth)`, `(dashboard)`를 통한 인증 경계 분리
  - API Routes를 통한 서버 사이드 로직 처리
  - Image Optimization 내장
- **주요 기능**:
  - Server/Client Component 분리
  - Streaming SSR
  - Metadata API를 통한 SEO 관리

### React 19
- **버전**: 19.2.3+
- **특징**: Server Components, Suspense, Concurrent Features 활용

### TypeScript 5
- **버전**: 5+
- **목적**: 타입 안정성 및 개발자 경험 향상

---

## 2. Styling & UI

### Tailwind CSS 4
- **버전**: 4+
- **사용 목적**:
  - 유틸리티 기반 스타일링
  - 반응형 디자인
  - 다크 모드 지원 (향후 확장)
- **설정**: `postcss.config.mjs`, `globals.css`

### shadcn/ui
- **설치**: `npx shadcn-ui@latest init`
- **컴포넌트 위치**: `components/ui/`
- **주요 컴포넌트**:
  - Button, Card, Input, Dialog
  - Select, Textarea, Label
  - Tabs, Accordion (필요시)
- **특징**: 
  - Radix UI 기반 접근성 지원
  - Tailwind CSS로 커스터마이징 가능
  - Copy & Paste 방식의 컴포넌트 관리

### Lucide React
- **설치**: `npm install lucide-react`
- **목적**: 아이콘 라이브러리
- **사용 예시**: Header 네비게이션, Footer SNS 아이콘

---

## 3. Animation & Interaction

### Framer Motion
- **설치**: `npm install framer-motion`
- **사용 목적**:
  - Scroll-driven Animation (Hero Section, Brand Story)
  - Parallax 효과 (History Section)
  - 페이지 전환 애니메이션
  - 인터랙티브 요소 (카드 호버, 버튼 클릭)
- **주요 기능**:
  - `useScroll`, `useMotionValue` 훅
  - `motion.div`, `AnimatePresence` 컴포넌트
  - Viewport 기반 애니메이션 트리거

### React Intersection Observer
- **설치**: `npm install react-intersection-observer` (또는 커스텀 훅 구현)
- **목적**: 스크롤 기반 요소 감지 및 애니메이션 트리거

---

## 4. Backend & Database

### Supabase
- **서비스**: PostgreSQL + Auth + Storage + Realtime
- **설치**: `npm install @supabase/supabase-js @supabase/ssr`
- **주요 기능**:
  - **Authentication**: 이메일/소셜 로그인, 세션 관리
  - **Database**: PostgreSQL with Row Level Security (RLS)
  - **Storage**: 이미지 및 파일 업로드
  - **Realtime**: 실시간 업데이트 (게시판 댓글 등)
- **클라이언트 설정**:
  - `lib/supabase/client.ts`: Client-side (브라우저)
  - `lib/supabase/server.ts`: Server-side (Server Components, API Routes)
  - `lib/supabase/middleware.ts`: Middleware 헬퍼

---

## 5. State Management & Data Fetching

### React Context API
- **사용 위치**: `contexts/AuthContext.tsx`
- **목적**: 전역 인증 상태 관리
- **대안 고려**: Zustand (복잡도 증가 시)

### Server Components + Server Actions
- **Next.js 15 기본 기능**
- **목적**: 서버 사이드 데이터 페칭 및 뮤테이션
- **사용 예시**:
  - 게시판 목록 조회 (Server Component)
  - 게시글 작성 (Server Action)

---

## 6. Form Handling

### React Hook Form
- **설치**: `npm install react-hook-form`
- **목적**: 지원 신청 폼, 게시글 작성 폼
- **검증**: Zod와 통합 가능

### Zod
- **설치**: `npm install zod`
- **목적**: 스키마 기반 폼 검증 및 타입 안정성
- **사용 예시**: 지원 신청 폼 검증, API 요청/응답 검증

---

## 7. Utilities & Helpers

### date-fns
- **설치**: `npm install date-fns`
- **목적**: 날짜 포맷팅 (게시판, 히스토리)
- **대안**: `lib/utils/date.ts` 커스텀 유틸

### clsx / class-variance-authority
- **설치**: `npm install clsx class-variance-authority`
- **목적**: className 조합 (shadcn/ui 의존성)

---

## 8. Development Tools

### ESLint
- **설정**: `eslint.config.mjs`
- **플러그인**: `eslint-config-next`

### TypeScript
- **설정**: `tsconfig.json`
- **엄격 모드**: 활성화 권장

---

## 9. 컴포넌트 설계 원칙

### 1. 도메인 중심 구조
- `components/board/`: 게시판 관련 컴포넌트만 포함
- `components/member/`: 멤버 관련 컴포넌트만 포함
- 각 도메인은 독립적으로 유지보수 가능

### 2. UI 컴포넌트 분리
- `components/ui/`: 순수 UI 컴포넌트 (비즈니스 로직 없음)
- `components/{domain}/`: 도메인별 비즈니스 로직 포함 컴포넌트

### 3. Server/Client Component 분리
- **Server Component 기본**: SEO, 성능 최적화
- **Client Component**: 인터랙션, 상태 관리 필요 시에만 `'use client'` 사용

### 4. 재사용성 우선
- 공통 패턴은 커스텀 훅으로 추출 (`hooks/`)
- 공통 유틸은 `lib/utils/`에 배치

---

## 10. 성능 최적화 전략

### 1. 이미지 최적화
- Next.js `Image` 컴포넌트 사용
- WebP/AVIF 포맷 지원
- Lazy Loading 기본 적용

### 2. 코드 스플리팅
- Route-based Code Splitting (App Router 기본)
- Dynamic Import (`next/dynamic`) 필요 시 활용

### 3. 애니메이션 성능
- Framer Motion의 `will-change` 자동 관리
- GPU 가속 속성만 애니메이션 (`transform`, `opacity`)
- `useReducedMotion` 훅으로 접근성 고려

### 4. 데이터 페칭
- Server Components에서 직접 DB 조회 (중간 API 레이어 제거)
- React Suspense로 로딩 상태 관리
- ISR/SSG 적극 활용 (정적 콘텐츠)

---

## 11. 보안 고려사항

### 1. 인증
- Supabase Auth를 통한 세션 관리
- RLS (Row Level Security) 정책으로 DB 접근 제어
- Middleware에서 인증 체크

### 2. 환경 변수
- `.env.local`: Supabase URL, Anon Key
- `.env.example`: 템플릿 제공
- Git에 실제 키 커밋 금지

### 3. 입력 검증
- Zod 스키마로 서버/클라이언트 양쪽 검증
- XSS 방지: React 기본 이스케이핑 활용

---

## 12. 배포 전략

### Vercel (권장)
- Next.js 최적화 환경
- 환경 변수 관리
- 자동 배포 (Git 연동)

### Supabase
- Database 호스팅
- Edge Functions (필요 시)

---

## 13. 향후 확장 가능성

### 1. 상태 관리
- Zustand (복잡도 증가 시)
- TanStack Query (서버 상태 캐싱 필요 시)

### 2. 테스팅
- Vitest + React Testing Library
- Playwright (E2E 테스트)

### 3. 모니터링
- Vercel Analytics
- Sentry (에러 추적)

---

## 14. 의존성 설치 명령어

```bash
# Core
npm install next@latest react@latest react-dom@latest

# Supabase
npm install @supabase/supabase-js @supabase/ssr

# UI & Styling
npm install tailwindcss@latest postcss autoprefixer
npx shadcn-ui@latest init
npm install lucide-react

# Animation
npm install framer-motion

# Form & Validation
npm install react-hook-form zod @hookform/resolvers

# Utilities
npm install clsx class-variance-authority date-fns

# TypeScript
npm install -D typescript @types/node @types/react @types/react-dom
```

---

## 15. 프로젝트 구조 요약

```
gameworks_homepage/
├── app/              # Next.js App Router (라우팅)
├── components/       # React 컴포넌트 (도메인별 분리)
├── lib/              # 유틸리티 및 Supabase 클라이언트
├── hooks/            # 커스텀 React 훅
├── types/            # TypeScript 타입 정의
├── contexts/         # React Context
└── docs/             # 문서 (이 파일 포함)
```

---

## 참고 자료
- [Next.js 15 Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com)
- [Framer Motion Documentation](https://www.framer.com/motion/)
