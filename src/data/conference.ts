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
      { track: "CLOUD", title: "추상화의 손익분기점", speaker: "강시온" },
      {
        track: "TECH",
        title: "Agent와 함께 일하기 위해 처음부터 다시 생각하기 (on AWS, with Kiro)",
        speaker: "김수빈",
      },
      {
        track: "JUMP",
        title: "AI가 개발 다 하는데, 저 뽑힐 수 있나요?",
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
      "AWS의 양자 컴퓨팅 서비스와 함께 간단한 문제를 풀어보며, 양자컴퓨터와 조금은 친해져 봅니다.",
    image: "/assets/ausgcon/speakers/kim-minjun.jpg",
  },
  {
    name: "김대현",
    affiliation: "메가존소프트 / AUSG 9기",
    track: "TECH",
    session: "RAG가 하는 거짓말,\n어떻게 잡을 수 있을까?",
    description:
      "LLM에게 질문하면 그럴듯한 답변이 돌아옵니다. 근데 그 답변이 정말 맞는 건지, Hallucination인지 어떻게 확인하시나요? 이래서 우리는 RAG를 사용하지만, RAG도 검색한 문서를 무시, 없는 내용을 지어내거나, 출처를 잘못 인용하기도 합니다. 그럼 이 답변, 진짜 믿어도 될까요? 한번 Hallucination을 어떻게 잡을 수 있는지 다양한 평가 기법과 파이프라인을 Cloud에 올려 구축한 경험을 한번 공유해 보고자 합니다.",
    image: "/assets/ausgcon/speakers/kim-daehyun.jpg",
  },
  {
    name: "공진성",
    affiliation: "JIRO / AUSG 8기",
    track: "JUMP",
    session: "공진성의 마술쇼",
    description:
      "맨날 실패했던 사람이, 그 실패를 통해 취업한 이야기를 합니다.\n스스로 좋은 카드가 없다고 생각하시나요?",
    image: "/assets/ausgcon/speakers/gong-jinseong.jpg",
  },
  {
    name: "이은지",
    affiliation: "서울대학교 / AUSG 8기",
    track: "CLOUD",
    session: "Bedrock AgentCore로 멀티채널 SNS 에이전트 만들기",
    description:
      "Amazon Bedrock AgentCore(Runtime·Gateway·Memory)를 활용해, 행사명·스폰서·해시태그 등 필수 포함 문구를 입력받아 SNS 게시글 초안을 생성하고, 사용자 컨펌을 거쳐 링크드인·인스타그램·슬랙 각 채널의 톤에 맞게 개별적으로 변환·게시하는 SNS 콘텐츠 반복작업 자동화 에이전트 개발 경험을 발표하고자 합니다.",
    image: "/assets/ausgcon/speakers/lee-eunji.jpg",
  },
  {
    name: "이지호",
    affiliation: "당근 / AUSG 10기",
    track: "TECH",
    session: "Node.js, Java, Go 동시성 비교하기",
    description:
      "AI한테 시키면 어떤 언어로든 코드가 나오는 시대입니다. 그럼 이제 언어를 안다는 건 뭘까요? 동시성이 필요한 간단한 예제 하나를 세 언어로 구현해보며, 각 언어가 어떤 철학을 가지고 있는지 비교해보려 합니다.",
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
      "최근 AI 덕분에 엔지니어 한 명이 감당할 수 있는 업무 범위가 늘어났고, 모노레포 채택도 그에 따라 꽤 늘었습니다. 다만 모노레포를 배포하는 일은 여전히 그리 간단하지는 않습니다. 이 세션에서는 Amazon ECS 위에 모노레포를 배포할 때 주의사항과 큰 틀에서의 전략을 살펴봅니다. 모노레포에서 어떤 부분을 배포할 것인지, 그리고 어떻게 빌드할 것인지에 중점을 둡니다.",
    image: "/assets/ausgcon/speakers/bae-jinsu.jpg",
  },
  {
    name: "길상혁",
    affiliation: "슈퍼진 / AUSG 8기",
    track: "TECH",
    session: "클로 야호~!",
    description: "클로드 안녕~ 이 시간 이후로 클로드가 쉽게 느껴집니다",
    image: "/assets/ausgcon/speakers/gil-sanghyeok.jpg",
  },
  {
    name: "신현수",
    affiliation: "당근 / AUSG 9기",
    track: "JUMP",
    session: "성장곡선과 행복곡선",
    description:
      "순수하게 재밌어서 시작했던 취미가 업이 되기까지, 지금은 대학생이지만 엔지니어로 살고 있는 저의 몇 가지 이야기와 생각들을 가볍게 나누어요.",
    image: "/assets/ausgcon/speakers/shin-hyeonsu.jpg",
  },
  {
    name: "강시온",
    affiliation: "Lablup Inc. / AUSG 6기",
    track: "CLOUD",
    session: "추상화의 손익분기점",
    description: "멀티클라우드 IDP를 만들며 감춘 것과 남긴 것",
    image: "/assets/ausgcon/speakers/kang-sion.jpeg",
  },
  {
    name: "김수빈",
    affiliation: "당근 / AUSG 6기",
    track: "TECH",
    session: "Agent와 함께 일하기 위해 처음부터 다시 생각하기 (on AWS, with Kiro)",
    description:
      "AWS 환경에서 Agent에게 일을 맡기기 위해 환경부터 다시 만들게 되었습니다. 실행 환경과 도구, 개선, 검증 루프를 새롭게 다시 만든 경험을 공유합니다.",
    image: "/assets/ausgcon/speakers/kim-subin.jpg",
  },
  {
    name: "김민태",
    affiliation: "WoowaBros / AUSG 4기",
    track: "JUMP",
    session: "AI가 개발 다 하는데, 저 뽑힐 수 있나요?",
    description:
      "우리는 AI를 사용할 때 대체될 수 있는가? 라는 고민을 많이 합니다. 모든 엔지니어가 이런 고민을 할 때 어떤 자세를 취하는 것이 좋을까요?",
    image: "/assets/ausgcon/speakers/kim-mintae.jpg",
  },
  {
    name: "최용호",
    affiliation: "AWS",
    track: "ALL",
    session: "AI 시대에 알아야 할 AI 트렌드 총정리",
    description:
      "AI 코딩 도구는 개발자들에게 있어서 더 이상 선택이 아닌 일상이 되었습니다. 이러한 변화 속에서 개발자들은 불안합니다. \"AI가 내 일을 대체하는 건 아닐까?\" \"지금 배우는 기술이 내년에도 유효할까?\"\n이 발표에서는 AI 코딩 에이전트의 발전과 MCP 생태계의 폭발적 성장, 하네스 엔지니어링을 거쳐 루프 엔지니어링까지 변화하고 있는 트렌드를 함께 정리해 보고, 뒤처지지 않는 개발자가 되기 위한 기반을 다지는 시간을 갖고자 합니다.",
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
    question: "누구나 참가할 수 있나요?",
    answer:
      "대학생, 개발자, IT 업계 종사자 누구나 참가하실 수 있습니다. 클라우드와 기술, 성장에 관심이 있다면 경력이나 전공에 관계없이 환영합니다.",
  },
  {
    question: "참가비와 신청 마감은 어떻게 되나요?",
    answer:
      "참가비는 15,000원이며, 노쇼 방지와 굿즈 제작, 간식 제공에 사용됩니다. 신청과 환불 모두 8월 30일(토) 오후 11시 30분까지 이벤터스를 통해 가능하며, 조기 마감될 수 있습니다. 당일 현장 신청 및 등록은 불가하니 반드시 티켓 구매 후 참석해주세요.",
  },
  {
    question: "당일 준비물이 있나요?",
    answer:
      "편하게 몸만 오셔도 괜찮아요. 다만 핸즈온 세션에서 직접 실습해보고 싶으시다면 노트북을 챙겨주세요!",
  },
  {
    question: "행사장에 주차가 가능한가요?",
    answer:
      "따로 주차 지원을 제공하고 있지 않습니다. 가급적 대중교통을 이용해 주시면 감사하겠습니다.",
  },
  {
    question: "티켓을 다른 사람에게 양도할 수 있나요?",
    answer:
      "부득이한 사정으로 티켓을 다른 사람에게 양도할 수 있습니다.\n양도를 위해서는 티켓 구매자의 개인정보(휴대폰 번호, 양도자의 이름)를 함께 제공해야 하며, 행사 당일 전달받은 구매자의 개인 정보를 통해 입장이 가능합니다.\n단, 금전적 거래를 통한 양도(암표, 중고거래 등)가 적발될 경우, 해당 티켓으로의 입장이 제한될 수 있습니다.",
  },
  {
    question: "문의는 어디로 하면 되나요?",
    answer:
      "Email : ausg.awskrug@gmail.com\nInstagram : @ausg.awskrug\nAWSKRUG Slack : ausg 채널로 연락 주세요.",
  },
];
