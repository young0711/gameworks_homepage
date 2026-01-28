# GAMEWORKS 공식 웹사이트 PRD

## Project Name
**GAMEWORKS Official Website**

## Core Concept
**A Legacy in Motion**

## Design Reference
- https://toss.im  
  (Scroll-based interaction, bold typography)

---

## 1. Project Overview & Vision

### 1.1 프로젝트 개요

GAMEWORKS는 숭실대학교 글로벌미디어학부의 시작과 함께 성장해온  
**20년 이상의 역사를 가진 종합 학술 소모임**이다.

본 프로젝트는 GAMEWORKS의 역사를 단순히 나열하는 것이 아닌,  
스크롤과 인터랙션을 통해 **“움직이는 역사(Legacy in Motion)”로 체험**하게 하는  
공식 웹사이트 구축을 목표로 한다.

### 1.2 핵심 목표

#### 브랜딩
- 전통 + 기술력 + 학생 중심 정체성 확립

#### 신규 부원 모집
- 스토리 기반 몰입 → 신청 폼 전환 최적화

#### 네트워킹 & 아카이빙
- QA 게시판을 통한 선후배 교류
- 활동 기록의 체계적 보관

---

## 2. User Persona

### Target A – 예비 부원 (1~2학년)
- 관심사: 분위기, 성장 가능성, 실제 활동
- 주요 행동: 모바일 중심, 빠른 판단
- 핵심 니즈: 감성 + 신뢰

### Target B – 고학번 / 졸업생
- 관심사: 현재 활동 수준, 연혁
- 주요 행동: 데스크톱 중심, 깊은 탐색
- 핵심 니즈: 구조화된 정보

### Target C – 교수진 / 외부 협력사
- 관심사: 기술적 역량, 지속성
- 주요 행동: 짧은 체류, 핵심 정보 확인
- 핵심 니즈: 신뢰성과 완성도

---

## 3. UI / UX Specification

### 3.1 Header & Navigation

- Sticky Header
- 좌측
  - GAMEWORKS 로고 + 텍스트 (홈 이동)
- 우측 메뉴
  - member
  - roadmap
  - history
- 스크롤 시
  - 헤더 높이 축소
  - 반투명 처리

---

## 3.2 Landing Page – Scroll Journey

### Hero Section
- 배경: Black
- 중앙: 대형 GAMEWORKS 타이포그래피
- 하단 서브텍스트  
  - “글로벌미디어학부 종합 학술 소모임”
- 스크롤 시
  - Scale
  - Fade Out 애니메이션

---

### Brand Story
- 배경: White
- 2000년대 초반부터 이어진 GAMEWORKS 역사 서술
- 문단별 Fade-in 애니메이션

---

### History Section
- 카피: “역사 있는 소모임”
- 이미지: 야경 빌딩
- Parallax 또는 Grid 레이아웃

---

### DEV – Category Open
- 배경 이미지: 그레이 톤
- 중앙 텍스트: DEV
- 스크롤 시
  - 개발 관련 이미지 좌우 고속 플로우 애니메이션

---

### For Students
- 이미지: 노트 필기
- 카피: “학생을 위하는 소모임”
- 감성 중심, 정적인 연출

---

### Events – Category Open
- 이미지: 벚꽃 단체사진
- 중앙 텍스트: Events
- 마우스 휠 속도에 반응하는 가로 스크롤

---

### Executive Team
- 문구: “발전하는 소모임”

#### 구성
- 회장: 조영찬 / 장윤아
- 부회장: 유다은 / 최서정 / 최지원 / 박서연
- 총무: 박서영

#### UI
- 카드 레이아웃 (사진 + 역할)

#### 하단 슬로건
- “글미를 넘어 숭실대를 대표하는 그날까지…”

---

### Footer
- 매우 작은 폰트
- 구성 요소
  - 이메일
  - 연락처
  - 지원하기 버튼
  - SNS 아이콘

---

## 4. Detailed Pages

### 4.1 Member
- 임원진 상세 리스트
- 개인별 기술 스택 시각화

---

### 4.2 Roadmap
- 기간: 2월 OT ~ 11월 해커톤
- `@` : 날짜 미정
- Red Color
  - 회의 필요 일정
- 타임라인 기반 UI
  - 세로 또는 가로 스크롤

---

### 4.3 History
- 기간: 2000 ~ 2025
- 카드 기반 수평 스크롤
- 연도별 주요 활동 요약

---

## 5. Technical Requirements

### Frontend
- React.js 또는 Next.js
- SEO 최적화 필수

### Animation
- Framer Motion 또는 GSAP
- Scroll-driven Animation 필수
- 성능 저하 없는 구현

### Backend
- Node.js 또는 Firebase
- QA 게시판
- 지원 신청 폼 처리

### Database
- 활동 기록
- 공지사항
- QA 데이터
- 확장 가능한 구조 설계


---

## 6. User Flow & Success Metrics

### User Flow
1. 랜딩 페이지 진입
2. 역사 & 스토리 몰입
3. 활동 / 이벤트 확인
4. 지원하기 버튼 클릭
5. 신청 완료

### Success Metrics
- 평균 페이지 체류 시간
- 신청 폼 클릭률
- QA 게시판 활성도
- 재방문율

---

## Appendix

본 웹사이트는 단순한 소개 페이지가 아닌  
**GAMEWORKS의 시간, 사람, 기술을 기록하는 인터랙티브 아카이브**이다.

이 문서는 디자이너·개발자가 즉시 작업에 착수할 수 있는  
**실행 중심 PRD**를 목표로 작성되었다.
