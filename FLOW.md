
# 서비스 아키텍처 및 페이지 구조 (Flowchart)
flowchart TD
    subgraph Client
        HOME[Home]
        BOARD[Board]
        BOARD_DETAIL[BoardDetail]
        BOARD_WRITE[BoardWrite]
        PROFILE[Profile]
        CAREER[Career]
        APPLY[Apply]
    end

    subgraph NextApp["Next.js App Layer"]
        AUTH_CTX[AuthContext]
        BOARD_SVC[BoardService]
        APPLY_SVC[ApplyService]
    end

    subgraph Backend
        API[API]
        DB[(Database)]
    end

    HOME --> BOARD
    BOARD --> BOARD_DETAIL
    BOARD --> BOARD_WRITE
    HOME --> PROFILE
    PROFILE --> CAREER
    HOME --> APPLY

    BOARD_WRITE --> AUTH_CTX
    APPLY --> AUTH_CTX

    BOARD --> BOARD_SVC
    BOARD_DETAIL --> BOARD_SVC
    BOARD_WRITE --> BOARD_SVC
    APPLY --> APPLY_SVC

    AUTH_CTX --> API
    BOARD_SVC --> API
    APPLY_SVC --> API

    API --> DB


# 사용자 여정 및 로직 흐름 (Sequence Diagram)
sequenceDiagram
    autonumber
    actor V as Visitor
    participant W as WebApp
    participant A as Auth
    participant B as Board
    participant P as Apply
    participant D as DB

    V->>W: Open Home
    W-->>V: Render Landing Sections

    V->>W: Go to Board
    W->>B: Fetch Post List
    B->>D: Query Posts
    D-->>B: Posts
    B-->>W: Post List Data
    W-->>V: Render Post List

    V->>W: Open Post Detail
    W->>B: Fetch Post Detail
    B->>D: Query Post and Comments
    D-->>B: Post and Comments
    B-->>W: Detail Data
    W-->>V: Render Detail

    alt Create Post or Comment
        V->>W: Submit Content
        W->>A: Check Auth and Profile
        alt Not Logged In
            A-->>V: Show Login or Signup
            V->>A: Signup
            A->>D: Create User
            D-->>A: User Created
            A-->>V: Request Profile Completion
            V->>A: Complete Profile
            A->>D: Save Profile
            D-->>A: Profile Saved
        end
        W->>B: Create Post or Comment
        B->>D: Save Post or Comment
        D-->>B: Saved
        B-->>W: Success
        W-->>V: Show Success
    end

    V->>W: Click Apply
    W->>P: Open Apply Form
    P->>A: Check Auth and Profile
    alt Not Ready
        A-->>V: Login and Complete Profile
    end
    V->>P: Submit Application
    P->>D: Save Application
    D-->>P: Saved
    P-->>V: Application Complete
