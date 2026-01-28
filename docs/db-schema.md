# 데이터베이스 설계 가이드 (Database Schema)

## 개요
본 문서는 GAMEWORKS 공식 웹사이트의 Supabase PostgreSQL 데이터베이스 스키마 설계를 정의합니다.
Row Level Security (RLS) 정책을 통해 데이터 접근을 제어합니다.

---

## 1. 테이블 구조

### 1.1 `profiles` (사용자 프로필)
Supabase Auth의 `auth.users` 테이블을 확장하는 프로필 테이블입니다.

```sql
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  name TEXT NOT NULL,
  student_id TEXT, -- 학번 (선택)
  year INTEGER, -- 학년 (선택)
  major TEXT, -- 전공 (선택)
  bio TEXT, -- 자기소개
  avatar_url TEXT, -- 프로필 이미지 URL (Supabase Storage)
  role TEXT DEFAULT 'member' CHECK (role IN ('member', 'admin', 'executive')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS 활성화
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- 정책: 모든 사용자는 자신의 프로필 조회 가능
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

-- 정책: 모든 사용자는 자신의 프로필 수정 가능
CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- 정책: 모든 사용자는 자신의 프로필 생성 가능 (회원가입 시)
CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- 정책: 모든 사용자는 공개 프로필 조회 가능 (멤버 페이지용)
CREATE POLICY "Public profiles are viewable by everyone"
  ON profiles FOR SELECT
  USING (true);
```

**인덱스:**
```sql
CREATE INDEX idx_profiles_role ON profiles(role);
CREATE INDEX idx_profiles_created_at ON profiles(created_at);
```

---

### 1.2 `posts` (게시판 게시글)
QA 게시판 및 공지사항을 위한 게시글 테이블입니다.

```sql
CREATE TABLE posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  author_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT DEFAULT 'qa' CHECK (category IN ('qa', 'notice', 'general')),
  view_count INTEGER DEFAULT 0,
  is_pinned BOOLEAN DEFAULT FALSE,
  is_deleted BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS 활성화
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- 정책: 모든 인증된 사용자는 게시글 조회 가능
CREATE POLICY "Posts are viewable by authenticated users"
  ON posts FOR SELECT
  USING (auth.role() = 'authenticated' AND is_deleted = FALSE);

-- 정책: 인증된 사용자는 게시글 작성 가능
CREATE POLICY "Authenticated users can create posts"
  ON posts FOR INSERT
  WITH CHECK (auth.uid() = author_id);

-- 정책: 작성자는 자신의 게시글 수정 가능
CREATE POLICY "Authors can update own posts"
  ON posts FOR UPDATE
  USING (auth.uid() = author_id);

-- 정책: 작성자는 자신의 게시글 삭제 가능 (soft delete)
CREATE POLICY "Authors can delete own posts"
  ON posts FOR UPDATE
  USING (auth.uid() = author_id);
```

**인덱스:**
```sql
CREATE INDEX idx_posts_author_id ON posts(author_id);
CREATE INDEX idx_posts_category ON posts(category);
CREATE INDEX idx_posts_created_at ON posts(created_at DESC);
CREATE INDEX idx_posts_is_pinned ON posts(is_pinned DESC, created_at DESC);
```

---

### 1.3 `comments` (댓글)
게시글에 대한 댓글 테이블입니다.

```sql
CREATE TABLE comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  author_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  parent_id UUID REFERENCES comments(id) ON DELETE CASCADE, -- 대댓글 지원
  is_deleted BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS 활성화
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

-- 정책: 모든 인증된 사용자는 댓글 조회 가능
CREATE POLICY "Comments are viewable by authenticated users"
  ON comments FOR SELECT
  USING (auth.role() = 'authenticated' AND is_deleted = FALSE);

-- 정책: 인증된 사용자는 댓글 작성 가능
CREATE POLICY "Authenticated users can create comments"
  ON comments FOR INSERT
  WITH CHECK (auth.uid() = author_id);

-- 정책: 작성자는 자신의 댓글 수정 가능
CREATE POLICY "Authors can update own comments"
  ON comments FOR UPDATE
  USING (auth.uid() = author_id);

-- 정책: 작성자는 자신의 댓글 삭제 가능
CREATE POLICY "Authors can delete own comments"
  ON comments FOR UPDATE
  USING (auth.uid() = author_id);
```

**인덱스:**
```sql
CREATE INDEX idx_comments_post_id ON comments(post_id);
CREATE INDEX idx_comments_author_id ON comments(author_id);
CREATE INDEX idx_comments_parent_id ON comments(parent_id);
CREATE INDEX idx_comments_created_at ON comments(created_at);
```

---

### 1.4 `applications` (지원 신청)
신규 부원 지원 신청서를 저장하는 테이블입니다.

```sql
CREATE TABLE applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  applicant_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  motivation TEXT NOT NULL, -- 지원 동기
  experience TEXT, -- 관련 경험
  expectations TEXT, -- 기대사항
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'reviewing', 'accepted', 'rejected')),
  reviewed_by UUID REFERENCES profiles(id), -- 검토자 (임원진)
  reviewed_at TIMESTAMPTZ,
  notes TEXT, -- 내부 메모 (검토자용)
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS 활성화
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;

-- 정책: 지원자는 자신의 지원서만 조회 가능
CREATE POLICY "Applicants can view own applications"
  ON applications FOR SELECT
  USING (auth.uid() = applicant_id);

-- 정책: 인증된 사용자는 지원서 작성 가능
CREATE POLICY "Authenticated users can create applications"
  ON applications FOR INSERT
  WITH CHECK (auth.uid() = applicant_id);

-- 정책: 임원진은 모든 지원서 조회 가능
CREATE POLICY "Executives can view all applications"
  ON applications FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('admin', 'executive')
    )
  );

-- 정책: 임원진은 지원서 상태 수정 가능
CREATE POLICY "Executives can update applications"
  ON applications FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('admin', 'executive')
    )
  );
```

**인덱스:**
```sql
CREATE INDEX idx_applications_applicant_id ON applications(applicant_id);
CREATE INDEX idx_applications_status ON applications(status);
CREATE INDEX idx_applications_created_at ON applications(created_at DESC);
```

---

### 1.5 `members` (멤버 정보)
임원진 및 멤버의 상세 정보를 저장하는 테이블입니다.

```sql
CREATE TABLE members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  position TEXT NOT NULL CHECK (position IN ('president', 'vice_president', 'secretary', 'member')),
  year INTEGER, -- 임기 연도
  semester TEXT, -- 학기 (예: '2024-1')
  tech_stack TEXT[], -- 기술 스택 배열
  bio TEXT, -- 멤버 소개
  image_url TEXT, -- 프로필 이미지 URL
  display_order INTEGER DEFAULT 0, -- 표시 순서
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS 활성화
ALTER TABLE members ENABLE ROW LEVEL SECURITY;

-- 정책: 모든 사용자는 활성 멤버 조회 가능
CREATE POLICY "Active members are viewable by everyone"
  ON members FOR SELECT
  USING (is_active = TRUE);

-- 정책: 임원진은 멤버 정보 수정 가능
CREATE POLICY "Executives can manage members"
  ON members FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('admin', 'executive')
    )
  );
```

**인덱스:**
```sql
CREATE INDEX idx_members_profile_id ON members(profile_id);
CREATE INDEX idx_members_position ON members(position);
CREATE INDEX idx_members_display_order ON members(display_order);
CREATE INDEX idx_members_is_active ON members(is_active);
```

---

### 1.6 `events` (이벤트/로드맵)
연간 일정 및 이벤트를 관리하는 테이블입니다.

```sql
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  event_type TEXT DEFAULT 'schedule' CHECK (event_type IN ('schedule', 'event', 'milestone')),
  start_date DATE,
  end_date DATE,
  is_tentative BOOLEAN DEFAULT FALSE, -- 날짜 미정 표시
  requires_meeting BOOLEAN DEFAULT FALSE, -- 회의 필요 일정
  color TEXT DEFAULT 'default', -- UI 색상 (red, blue 등)
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS 활성화
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

-- 정책: 모든 사용자는 이벤트 조회 가능
CREATE POLICY "Events are viewable by everyone"
  ON events FOR SELECT
  USING (true);

-- 정책: 임원진은 이벤트 관리 가능
CREATE POLICY "Executives can manage events"
  ON events FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('admin', 'executive')
    )
  );
```

**인덱스:**
```sql
CREATE INDEX idx_events_start_date ON events(start_date);
CREATE INDEX idx_events_event_type ON events(event_type);
CREATE INDEX idx_events_display_order ON events(display_order);
```

---

### 1.7 `history` (히스토리)
2000년대부터의 주요 활동 기록을 저장하는 테이블입니다.

```sql
CREATE TABLE history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  year INTEGER NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT, -- 히스토리 이미지
  category TEXT, -- 활동 카테고리
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS 활성화
ALTER TABLE history ENABLE ROW LEVEL SECURITY;

-- 정책: 모든 사용자는 히스토리 조회 가능
CREATE POLICY "History is viewable by everyone"
  ON history FOR SELECT
  USING (true);

-- 정책: 임원진은 히스토리 관리 가능
CREATE POLICY "Executives can manage history"
  ON history FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('admin', 'executive')
    )
  );
```

**인덱스:**
```sql
CREATE INDEX idx_history_year ON history(year DESC);
CREATE INDEX idx_history_display_order ON history(display_order);
```

---

## 2. 함수 및 트리거

### 2.1 `updated_at` 자동 업데이트 함수
모든 테이블의 `updated_at` 컬럼을 자동으로 업데이트합니다.

```sql
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 각 테이블에 트리거 적용
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_posts_updated_at
  BEFORE UPDATE ON posts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_comments_updated_at
  BEFORE UPDATE ON comments
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_applications_updated_at
  BEFORE UPDATE ON applications
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_members_updated_at
  BEFORE UPDATE ON members
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_events_updated_at
  BEFORE UPDATE ON events
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_history_updated_at
  BEFORE UPDATE ON history
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
```

### 2.2 프로필 자동 생성 함수
회원가입 시 자동으로 프로필을 생성합니다.

```sql
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'name', NEW.email)
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();
```

---

## 3. Row Level Security (RLS) 정책 요약

### 공개 조회 가능 (모든 사용자)
- `profiles` (공개 프로필만)
- `members` (활성 멤버만)
- `events`
- `history`

### 인증 필요 (로그인한 사용자만)
- `posts` (조회, 작성)
- `comments` (조회, 작성)
- `applications` (자신의 지원서만 조회, 작성)

### 관리자/임원진 전용
- `applications` (모든 지원서 조회, 상태 수정)
- `members` (수정)
- `events` (수정)
- `history` (수정)

---

## 4. Storage Buckets (Supabase Storage)

### `avatars`
- **목적**: 사용자 프로필 이미지
- **권한**: 
  - 업로드: 인증된 사용자 (자신의 이미지만)
  - 조회: 공개

### `post-images`
- **목적**: 게시글 첨부 이미지
- **권한**:
  - 업로드: 인증된 사용자
  - 조회: 인증된 사용자

### `member-images`
- **목적**: 멤버 프로필 이미지
- **권한**:
  - 업로드: 임원진만
  - 조회: 공개

### `history-images`
- **목적**: 히스토리 이미지
- **권한**:
  - 업로드: 임원진만
  - 조회: 공개

---

## 5. 타입 정의 (TypeScript)

Supabase CLI를 사용하여 타입을 자동 생성합니다:

```bash
npx supabase gen types typescript --project-id <project-id> > types/database.ts
```

또는 수동으로 `types/database.ts`에 정의:

```typescript
export type Database = {
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
        Insert: { /* ... */ };
        Update: { /* ... */ };
      };
      // ... 다른 테이블들
    };
  };
};
```

---

## 6. 마이그레이션 관리

### Supabase CLI 사용
```bash
# 마이그레이션 파일 생성
supabase migration new <migration_name>

# 로컬에서 마이그레이션 실행
supabase db reset

# 프로덕션에 배포
supabase db push
```

### 마이그레이션 파일 예시
`supabase/migrations/YYYYMMDDHHMMSS_initial_schema.sql`에 위의 모든 CREATE TABLE 문을 포함합니다.

---

## 7. 초기 데이터 (Seed)

### 임원진 데이터 예시
```sql
-- 프로필 생성 후 members 테이블에 임원진 정보 추가
INSERT INTO members (profile_id, position, year, semester, tech_stack, bio, display_order)
VALUES
  (/* 회장 프로필 ID */, 'president', 2025, '2025-1', ARRAY['React', 'TypeScript'], '회장 소개', 1),
  (/* 부회장 프로필 ID */, 'vice_president', 2025, '2025-1', ARRAY['Next.js'], '부회장 소개', 2);
```

---

## 8. 보안 체크리스트

- [ ] 모든 테이블에 RLS 활성화
- [ ] 인증되지 않은 사용자는 민감한 데이터 접근 불가
- [ ] 사용자는 자신의 데이터만 수정 가능
- [ ] 관리자 권한은 명확히 분리
- [ ] Storage 버킷 권한 설정 확인
- [ ] 환경 변수에 Supabase 키 안전하게 관리

---

## 참고 자료
- [Supabase RLS Documentation](https://supabase.com/docs/guides/auth/row-level-security)
- [Supabase Storage Documentation](https://supabase.com/docs/guides/storage)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
