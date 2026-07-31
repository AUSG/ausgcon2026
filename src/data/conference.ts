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
  };
  sessions?: TimetableSession[];
}

export interface Speaker {
  name: string;
  company: string;
  role: string;
  session: string;
  image: string | null;
}

export interface FAQ {
  question: string;
  answer: string;
}

export const timetable: TimetableRow[] = [
  {
    time: "13:00 - 13:20",
    shared: { title: "OPENING", speaker: "AUSG Organizer" },
  },
  {
    time: "13:30 - 14:00",
    sessions: [
      { track: "CLOUD", title: "Session title TBA", speaker: "Speaker TBA" },
      { track: "JUMP", title: "Session title TBA", speaker: "Speaker TBA" },
      { track: "TECH", title: "Session title TBA", speaker: "Speaker TBA" },
    ],
  },
  {
    time: "14:10 - 14:40",
    sessions: [
      { track: "CLOUD", title: "Session title TBA", speaker: "Speaker TBA" },
      { track: "JUMP", title: "Session title TBA", speaker: "Speaker TBA" },
      { track: "TECH", title: "Session title TBA", speaker: "Speaker TBA" },
    ],
  },
  {
    time: "15:00 - 15:30",
    sessions: [
      { track: "CLOUD", title: "Session title TBA", speaker: "Speaker TBA" },
      { track: "JUMP", title: "Session title TBA", speaker: "Speaker TBA" },
      { track: "TECH", title: "Session title TBA", speaker: "Speaker TBA" },
    ],
  },
  {
    time: "15:40 - 16:10",
    sessions: [
      { track: "CLOUD", title: "Session title TBA", speaker: "Speaker TBA" },
      { track: "JUMP", title: "Session title TBA", speaker: "Speaker TBA" },
      { track: "TECH", title: "Session title TBA", speaker: "Speaker TBA" },
    ],
  },
  {
    time: "16:20 - 16:50",
    sessions: [
      { track: "CLOUD", title: "Session title TBA", speaker: "Speaker TBA" },
      { track: "JUMP", title: "Session title TBA", speaker: "Speaker TBA" },
      { track: "TECH", title: "Session title TBA", speaker: "Speaker TBA" },
    ],
  },
  {
    time: "17:00 - 18:00",
    shared: { title: "CLOSING & NETWORKING", speaker: "AUSG" },
  },
];

export const speakers: Speaker[] = [
  { name: "Speaker 01", company: "Company", role: "Cloud Engineer", session: "클라우드 인프라 아키텍처의 선택", image: null },
  { name: "Speaker 02", company: "Company", role: "Platform Engineer", session: "확장 가능한 시스템을 설계하는 방법", image: null },
  { name: "Speaker 03", company: "Company", role: "Software Engineer", session: "실제 기술 도입 경험과 선택", image: null },
  { name: "Speaker 04", company: "Company", role: "DevOps Engineer", session: "운영 환경에서 마주한 문제와 해결", image: null },
  { name: "Speaker 05", company: "Company", role: "Engineering Lead", session: "실패를 다음 성장으로 연결하는 방법", image: null },
  { name: "Speaker 06", company: "AUSG", role: "Community Builder", session: "다음 도약을 만드는 커뮤니티", image: null },
];

export const faqs: FAQ[] = [
  {
    question: "행사는 누구나 참가할 수 있나요?",
    answer: "클라우드와 기술, 성장에 관심 있는 누구나 참가할 수 있습니다. 세부 신청 기준은 등록 오픈과 함께 안내합니다.",
  },
  {
    question: "행사 당일 준비물이 있나요?",
    answer: "등록 확인을 위한 신분증과 모바일 티켓을 준비해 주세요. 노트북은 필수가 아닙니다.",
  },
  {
    question: "세션은 어떻게 구성되나요?",
    answer: "CLOUD, TECH, JUMP 세 개의 챕터를 따라 기반에서 실행, 성장으로 이어지는 이야기를 전합니다.",
  },
  {
    question: "발표 자료는 추후 공개되나요?",
    answer: "공개 가능한 발표 자료는 행사 종료 후 AUSG 공식 채널을 통해 순차적으로 공유할 예정입니다.",
  },
  {
    question: "문의는 어디로 하면 되나요?",
    answer: "공식 커뮤니티 채널 또는 ausgcon@ausg.me로 문의해 주세요.",
  },
];
