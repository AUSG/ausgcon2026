export type Track = "CLOUD" | "TECH" | "JUMP";

export interface TimetableSession {
  track: Track;
  title: string;
  speaker: string;
}

export interface TimetableRow {
  time: string;
  shared?: {
    title: string;
    speaker: string;
    image?: string;
    imageAlt?: string;
    imageKind?: "keyring" | "logo";
    description?: string;
  };
  sessions?: TimetableSession[];
}

export interface HandsOnSession {
  time: string;
  title: string;
  speaker: string;
}

export interface Speaker {
  name: string;
  affiliation: string;
  credential?: string;
  track: Track | "ALL" | "HANDS-ON";
  session: string;
  description: string;
  image: string | string[] | null;
}

export interface FAQ {
  question: string;
  answer: string;
}

export const timetable: TimetableRow[] = [
  {
    time: "12:30 - 13:00",
    shared: {
      title: "CHECK-IN",
      speaker: "참가자 입장",
      image: "/assets/ausgcon/keyring.png",
      imageAlt: "AUSGCON 키링",
      imageKind: "keyring",
      description: "등록 확인 후 입장 안내를 받고 AUSGCON 2026을 시작합니다.",
    },
  },
  {
    time: "13:00 - 13:20",
    shared: {
      title: "OPENING",
      speaker: "행사 및 스폰서 소개",
      image: "/assets/ausgcon/sponsor-ausg.png",
      imageAlt: "AUSG 로고",
      imageKind: "logo",
      description: "AUSGCON 2026 행사와 함께해 주신 스폰서를 소개합니다.",
    },
  },
  {
    time: "13:30 - 14:00",
    sessions: [
      {
        track: "CLOUD",
        title: "양자 중첩으로 미로 탈출\nw/ Amazon Braket",
        speaker: "김민준",
      },
      {
        track: "TECH",
        title: "RAG가 하는 거짓말,\n어떻게 잡을 수 있을까?",
        speaker: "김대현",
      },
      { track: "JUMP", title: "공진성의 마술쇼", speaker: "공진성" },
    ],
  },
  {
    time: "14:15 - 14:45",
    sessions: [
      {
        track: "CLOUD",
        title: "Bedrock AgentCore로 멀티채널 SNS 에이전트 만들기",
        speaker: "이은지",
      },
      {
        track: "TECH",
        title: "Node.js, Java, Go 동시성 비교하기",
        speaker: "이지호",
      },
      { track: "JUMP", title: "슬기로운 인턴생활", speaker: "김보람" },
    ],
  },
  {
    time: "15:10 - 15:40",
    sessions: [
      {
        track: "CLOUD",
        title: "모노레포 쪼개고 배포하기: Monorepo on ECS",
        speaker: "배진수",
      },
      { track: "TECH", title: "클로 야호~!", speaker: "길상혁" },
      { track: "JUMP", title: "성장곡선과 행복곡선", speaker: "신현수" },
    ],
  },
  {
    time: "15:55 - 16:25",
    sessions: [
      { track: "CLOUD", title: "TBD", speaker: "강시온" },
      {
        track: "TECH",
        title: "Agent와 일하기 위해 처음부터 다시 생각하기",
        speaker: "김수빈",
      },
      {
        track: "JUMP",
        title: "우리는 AI를 어떤 자세로 사용해야 할까?",
        speaker: "김민태",
      },
    ],
  },
  {
    time: "16:40 - 17:10",
    shared: {
      title: "AI 시대에 알아야 할 AI 트렌드 총정리",
      speaker: "최용호",
    },
  },
  {
    time: "17:20 - 17:50",
    shared: { title: "CLOSING", speaker: "" },
  },
];

export const handsOnSessions: HandsOnSession[] = [
  {
    time: "13:30 - 14:45",
    title: "더 똑똑한 RAG 만들기: Vector RAG vs GraphRAG",
    speaker: "지현숙 & 장인호",
  },
  {
    time: "15:10 - 17:10",
    title: "Serverless Agentic AI 직접 구현하기",
    speaker: "박상운",
  },
];

export const speakers: Speaker[] = [
  {
    name: "김민준",
    affiliation: "AUSG 8기",
    track: "CLOUD",
    session: "양자 중첩으로 미로 탈출\nw/ Amazon Braket",
    description:
      "AWS 양자 컴퓨팅 서비스와 간단한 문제를 풀며 양자컴퓨터를 가깝게 만납니다.",
    image: "/assets/ausgcon/speakers/kim-minjun.jpg",
  },
  {
    name: "김대현",
    affiliation: "메가존소프트 / AUSG 9기",
    track: "TECH",
    session: "RAG가 하는 거짓말,\n어떻게 잡을 수 있을까?",
    description:
      "RAG의 환각을 발견하고 평가하는 방법과 Cloud에 구축한 검증 파이프라인을 공유합니다.",
    image: "/assets/ausgcon/speakers/kim-daehyun.jpg",
  },
  {
    name: "공진성",
    affiliation: "JIRO / AUSG 8기",
    track: "JUMP",
    session: "공진성의 마술쇼",
    description:
      "반복된 실패를 발판 삼아 취업까지 이어 간 경험과 자신만의 카드를 발견한 이야기를 나눕니다.",
    image: "/assets/ausgcon/speakers/gong-jinseong.jpg",
  },
  {
    name: "이은지",
    affiliation: "서울대학교 / AUSG 8기",
    track: "CLOUD",
    session: "Bedrock AgentCore로 멀티채널 SNS 에이전트 만들기",
    description:
      "채널별 톤에 맞는 SNS 콘텐츠를 생성하고 게시하는 자동화 에이전트 개발 경험을 소개합니다.",
    image: "/assets/ausgcon/speakers/lee-eunji.jpg",
  },
  {
    name: "이지호",
    affiliation: "당근 / AUSG 10기",
    track: "TECH",
    session: "Node.js, Java, Go 동시성 비교하기",
    description:
      "동시성이 필요한 하나의 예제를 세 언어로 구현하며 각 언어의 철학을 비교합니다.",
    image: "/assets/ausgcon/speakers/lee-jiho.jpg",
  },
  {
    name: "김보람",
    affiliation: "뱅크샐러드 / AUSG 9기",
    track: "JUMP",
    session: "슬기로운 인턴생활",
    description:
      "체험형 인턴에서 정규직 전환까지, 그 여정을 들려드립니다. 그리고 한 명의 개발자가 방향을 찾아가는 이야기를 나눠요.",
    image: "/assets/ausgcon/speakers/kim-boram.jpg",
  },
  {
    name: "배진수",
    affiliation: "AUSG 4기",
    track: "CLOUD",
    session: "모노레포 쪼개고 배포하기: Monorepo on ECS",
    description:
      "Amazon ECS에서 모노레포를 선택적으로 빌드하고 배포하는 전략과 주의점을 살펴봅니다.",
    image: "/assets/ausgcon/speakers/bae-jinsu.jpg",
  },
  {
    name: "길상혁",
    affiliation: "슈퍼진 / AUSG 8기",
    track: "TECH",
    session: "클로 야호~!",
    description:
      "Claude를 더 쉽고 친숙하게 활용할 수 있도록 실제 사용 경험을 가볍게 공유합니다.",
    image: "/assets/ausgcon/speakers/gil-sanghyeok.jpg",
  },
  {
    name: "신현수",
    affiliation: "당근 / AUSG 9기",
    track: "JUMP",
    session: "성장곡선과 행복곡선",
    description:
      "재미로 시작한 취미가 업이 되기까지, 대학생 엔지니어의 성장과 행복에 대한 생각을 나눕니다.",
    image: "/assets/ausgcon/speakers/shin-hyeonsu.jpg",
  },
  {
    name: "강시온",
    affiliation: "AUSG 6기",
    track: "CLOUD",
    session: "TBD",
    description: "세션 상세 정보는 곧 공개됩니다.",
    image: null,
  },
  {
    name: "김수빈",
    affiliation: "당근 / AUSG 6기",
    track: "TECH",
    session: "Agent와 일하기 위해 처음부터 다시 생각하기",
    description:
      "AWS와 Kiro로 Agent의 실행 환경, 도구, 개선과 검증 루프를 다시 만든 경험을 공유합니다.",
    image: "/assets/ausgcon/speakers/kim-subin.jpg",
  },
  {
    name: "김민태",
    affiliation: "WoowaBros / AUSG 4기",
    track: "JUMP",
    session: "우리는 AI를 어떤 자세로 사용해야 할까?",
    description:
      "AI 시대의 엔지니어가 대체에 대한 불안을 넘어 어떤 태도를 취해야 할지 함께 질문합니다.",
    image: "/assets/ausgcon/speakers/kim-mintae.jpg",
  },
  {
    name: "최용호",
    affiliation: "AWS",
    track: "ALL",
    session: "AI 시대에 알아야 할 AI 트렌드 총정리",
    description:
      "AI 코딩 에이전트와 MCP, 하네스 엔지니어링부터 루프 엔지니어링까지의 흐름을 정리합니다.",
    image: "/assets/ausgcon/speakers/choi-yongho.jpg",
  },
  {
    name: "지현숙 · 장인호",
    affiliation: "AUSG 9기",
    track: "HANDS-ON",
    session: "더 똑똑한 RAG 만들기: Vector RAG vs GraphRAG",
    description:
      "같은 문서와 같은 질문인데, 왜 RAG의 답은 달라질까요? Amazon Bedrock Knowledge Bases와 Amazon Neptune Analytics를 활용해 Vector RAG와 GraphRAG를 직접 구축합니다. 의미적으로 가까운 문서를 찾는 방식과 문서 속 관계를 따라가는 방식을 동일한 데이터로 비교하며, 어떤 질문에서 두 RAG의 차이가 드러나는지 확인합니다.",
    image: [
      "/assets/ausgcon/speakers/ji-hyeonsuk.jpg",
      "/assets/ausgcon/speakers/jang-inho.jpg",
    ],
  },
  {
    name: "박상운",
    affiliation: "메가존클라우드",
    track: "HANDS-ON",
    session: "Serverless Agentic AI 직접 구현하기",
    description:
      "직접 구현하며 Serverless Agentic AI의 구성과 실행 흐름을 경험합니다.",
    image: "/assets/ausgcon/speakers/park-sangwoon.jpg",
  },
];

export const faqs: FAQ[] = [
  {
    question: "행사는 누구나 참가할 수 있나요?",
    answer:
      "클라우드와 기술, 성장에 관심 있는 누구나 참가할 수 있습니다. 세부 신청 기준은 등록 오픈과 함께 안내합니다.",
  },
  {
    question: "행사 당일 준비물이 있나요?",
    answer:
      "등록 확인을 위한 신분증과 모바일 티켓을 준비해 주세요. 노트북은 필수가 아닙니다.",
  },
  {
    question: "세션은 어떻게 구성되나요?",
    answer:
      "CLOUD, TECH, JUMP 세 개의 챕터를 따라 기반에서 실행, 성장으로 이어지는 이야기를 전합니다.",
  },
  {
    question: "발표 자료는 추후 공개되나요?",
    answer:
      "공개 가능한 발표 자료는 행사 종료 후 AUSG 공식 채널을 통해 순차적으로 공유할 예정입니다.",
  },
  {
    question: "문의는 어디로 하면 되나요?",
    answer: "공식 커뮤니티 채널 또는 ausgcon@ausg.me로 문의해 주세요.",
  },
];
