# GAMEWORKS 공식 웹사이트

GAMEWORKS는 숭실대학교 글로벌미디어학부의 20년 이상의 역사를 가진 종합 학술 소모임입니다.
이 프로젝트는 GAMEWORKS의 역사를 인터랙티브하게 체험할 수 있는 공식 웹사이트입니다.

## 기술 스택

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Backend**: Supabase (PostgreSQL + Auth + Storage)
- **Animation**: Framer Motion
- **UI Components**: shadcn/ui

## 프로젝트 구조

자세한 프로젝트 구조는 [docs/PROJECT_STRUCTURE.md](./docs/PROJECT_STRUCTURE.md)를 참고하세요.

## 시작하기

### 1. 의존성 설치

```bash
npm install
# 또는
pnpm install
```

### 2. 필수 패키지 설치

```bash
# Supabase
npm install @supabase/supabase-js @supabase/ssr

# Animation
npm install framer-motion

# Utilities
npm install clsx tailwind-merge date-fns

# shadcn/ui 초기화
npx shadcn-ui@latest init
```

### 3. 환경 변수 설정

`.env.local` 파일을 생성하고 다음 내용을 추가하세요:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

`.env.example` 파일을 참고할 수 있습니다.

### 4. 개발 서버 실행

```bash
npm run dev
# 또는
pnpm dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

## 문서

- [기술 명세서](./docs/tech-stack.md) - 사용된 기술 스택과 라이브러리 상세 정보
- [데이터베이스 설계 가이드](./docs/db-schema.md) - Supabase 데이터베이스 스키마 설계
- [프로젝트 구조](./docs/PROJECT_STRUCTURE.md) - 폴더 구조 및 설계 원칙

## 주요 기능

- 🏠 **랜딩 페이지**: 스크롤 기반 인터랙티브 히스토리 체험
- 👥 **멤버 페이지**: 임원진 및 멤버 정보
- 📅 **로드맵**: 연간 일정 및 이벤트
- 📜 **히스토리**: 2000년대부터의 주요 활동 기록
- 💬 **게시판**: QA 및 공지사항
- 📝 **지원 신청**: 신규 부원 지원 폼

## 배포

Vercel을 사용한 배포를 권장합니다:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/gameworks_homepage)

## 라이선스

이 프로젝트는 GAMEWORKS 소모임의 공식 프로젝트입니다.
