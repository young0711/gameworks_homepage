export interface Post {
  id: string;
  title: string;
  content: string;
  category: "notice" | "free" | "project" | "qna";
  author: {
    name: string;
    studentId: string;
  };
  createdAt: string;
  views: number;
  comments: Comment[];
}

export interface Comment {
  id: string;
  content: string;
  author: {
    name: string;
    studentId: string;
  };
  createdAt: string;
}

export const categoryLabels: Record<Post["category"], string> = {
  notice: "공지사항",
  free: "자유게시판",
  project: "프로젝트",
  qna: "Q&A",
};

// Mock data for demo
export const mockPosts: Post[] = [
  {
    id: "1",
    title: "2024학년도 2학기 GAMEWORKS 모집 안내",
    content: `안녕하세요, GAMEWORKS입니다.

2024학년도 2학기 신입 부원을 모집합니다!

**모집 기간**: 2024년 9월 1일 ~ 9월 15일
**지원 자격**: 글로벌미디어학부 재학생 누구나
**활동 내용**:
- 매주 정기 세미나 및 스터디
- 게임잼 및 해커톤 참여
- 산업체 연계 프로젝트

지원서는 홈페이지에서 작성해주세요.
많은 관심 부탁드립니다!`,
    category: "notice",
    author: { name: "운영진", studentId: "ADMIN" },
    createdAt: "2024-08-25",
    views: 342,
    comments: [
      {
        id: "c1",
        content: "지원 마감일이 연장될 예정이 있나요?",
        author: { name: "김학생", studentId: "20230001" },
        createdAt: "2024-08-26",
      },
      {
        id: "c2",
        content: "네, 9월 20일까지 연장되었습니다!",
        author: { name: "운영진", studentId: "ADMIN" },
        createdAt: "2024-08-26",
      },
    ],
  },
  {
    id: "2",
    title: "Unity 초보자 스터디 팀원 모집합니다",
    content: `Unity를 처음 배우시는 분들과 함께 스터디를 진행하려고 합니다.

**모집 인원**: 4~5명
**진행 기간**: 10월 ~ 12월 (약 3개월)
**진행 방식**: 
- 주 1회 오프라인 모임 (토요일 오후)
- Unity 공식 튜토리얼 따라하기
- 간단한 2D 게임 만들기 프로젝트

관심 있으신 분은 댓글이나 쪽지 남겨주세요!`,
    category: "project",
    author: { name: "이개발", studentId: "20210015" },
    createdAt: "2024-08-20",
    views: 128,
    comments: [
      {
        id: "c3",
        content: "저도 참여하고 싶습니다! 연락 드려도 될까요?",
        author: { name: "박신입", studentId: "20240003" },
        createdAt: "2024-08-21",
      },
    ],
  },
  {
    id: "3",
    title: "게임잼 후기 - 48시간 동안의 이야기",
    content: `지난 주말 Global Game Jam에 참여했습니다.

정말 힘들었지만 그만큼 보람찬 경험이었어요.
팀원들과 밤새 코딩하고, 디버깅하고, 또 코딩하고...

결국 완성된 게임을 보니 뿌듯했습니다.
다음에 기회가 되면 같이 참여해요!

게임 플레이 영상은 유튜브에 올려놓았습니다.`,
    category: "free",
    author: { name: "최게이머", studentId: "20200042" },
    createdAt: "2024-08-15",
    views: 89,
    comments: [],
  },
  {
    id: "4",
    title: "C# 델리게이트와 이벤트 차이점이 뭔가요?",
    content: `Unity 공부하다가 델리게이트와 이벤트 부분에서 막혔습니다.

둘 다 비슷해 보이는데 어떤 차이가 있나요?
언제 델리게이트를 쓰고, 언제 이벤트를 써야 하는지 모르겠어요.

예시 코드로 설명해주시면 감사하겠습니다!`,
    category: "qna",
    author: { name: "정궁금", studentId: "20230022" },
    createdAt: "2024-08-10",
    views: 56,
    comments: [
      {
        id: "c4",
        content: `간단히 말하면, 이벤트는 델리게이트를 캡슐화한 것입니다.

델리게이트: 외부에서 직접 호출 가능
이벤트: 클래스 내부에서만 호출 가능 (더 안전함)

예를 들어:
\`\`\`csharp
public delegate void MyDelegate();
public event MyDelegate OnSomething;
\`\`\`

이벤트를 사용하면 외부에서 실수로 호출하는 것을 방지할 수 있어요!`,
        author: { name: "이개발", studentId: "20210015" },
        createdAt: "2024-08-11",
      },
    ],
  },
  {
    id: "5",
    title: "정기 세미나 일정 변경 안내",
    content: `이번 주 정기 세미나 일정이 변경되었습니다.

**변경 전**: 9월 5일 (목) 오후 6시
**변경 후**: 9월 6일 (금) 오후 7시

장소는 동일하게 IT대학 세미나실입니다.
참고 부탁드립니다!`,
    category: "notice",
    author: { name: "운영진", studentId: "ADMIN" },
    createdAt: "2024-09-01",
    views: 156,
    comments: [],
  },
];
