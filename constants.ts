
import { ToneOption, EmailTemplate } from './types';

export const TONE_OPTIONS: ToneOption[] = [
  { 
    id: 'GENERAL', 
    label: '일반 비즈니스', 
    icon: 'fa-envelope', 
    description: '표준적인 격식을 갖춘 업무용 메일 작성이 필요할 때' 
  },
  { 
    id: 'REQUEST', 
    label: '공손한 부탁', 
    icon: 'fa-handshake-angle', 
    description: '타 부서나 거래처에 어려운 협조를 요청할 때' 
  },
  { 
    id: 'THANKS', 
    label: '따뜻한 감사', 
    icon: 'fa-heart', 
    description: '도움이나 협력에 대해 진심 어린 감사를 전하고 싶을 때' 
  },
  { 
    id: 'PROPOSAL', 
    label: '새로운 제안', 
    icon: 'fa-lightbulb', 
    description: '협업 제안이나 새로운 아이디어를 정식으로 제안할 때' 
  },
  { 
    id: 'FOLLOW_UP', 
    label: '회신 확인/리마인드', 
    icon: 'fa-reply-all', 
    description: '상대방의 회신이 늦어질 때 정중하게 진행 현황을 파악하고 싶을 때' 
  },
  { 
    id: 'DELAY', 
    label: '처리 지연 양해', 
    icon: 'fa-hourglass-half', 
    description: '업무 처리가 늦어짐에 대해 미리 양해를 구하고 기한을 재설정할 때' 
  },
  { 
    id: 'REFUSAL', 
    label: '정중한 거절', 
    icon: 'fa-ban', 
    description: '상대방의 기분을 상하게 하지 않으면서 명확하게 거절할 때' 
  },
  { 
    id: 'APOLOGY', 
    label: '사과 및 수습', 
    icon: 'fa-triangle-exclamation', 
    description: '실수를 인정하고 해결 방안을 제시하며 신뢰를 회복할 때' 
  },
];

export const FUN_TONE_OPTIONS: ToneOption[] = [
  { 
    id: 'LEGENDARY_MANAGER', 
    label: '전설의 부장님', 
    icon: 'fa-face-grin-tears', 
    description: '부장님의 주옥같은 아재 개그와 썰렁한 유머로 메일을 장식합니다.' 
  },
  { 
    id: 'MZ_CRAZY', 
    label: 'MZ 감성 병맛', 
    icon: 'fa-rocket', 
    description: '현대적인 밈(Meme)과 드립을 섞어 쿨하고 힙하게 작성합니다.' 
  },
  { 
    id: 'K_DRAMA', 
    label: '드라마 주인공', 
    icon: 'fa-crown', 
    description: 'K-드라마 속 재벌 2세처럼 아주 화려하고 오글거리는 말투로 제안합니다.' 
  },
  { 
    id: 'EXTREME_APOLOGY', 
    label: '석고대죄 모드', 
    icon: 'fa-person-praying', 
    description: '조선시대 대역죄인이 된 것처럼 비장하고 눈물 없이는 볼 수 없게 사과합니다.' 
  },
  { 
    id: 'OBSESSIVE', 
    label: '공포의 집착광공', 
    icon: 'fa-ghost', 
    description: '상대방이 꿈속에서도 메일을 볼 것 같은 소름 돋는 리마인드를 보냅니다.' 
  },
  { 
    id: 'OVER_THE_TOP', 
    label: '주접 떨기', 
    icon: 'fa-fire', 
    description: '상대방의 작은 도움에도 온 우주가 감동한 듯한 주접을 가득 담습니다.' 
  },
  { 
    id: 'IRON_WALL', 
    label: '철벽 방어', 
    icon: 'fa-shield-halved', 
    description: '절대 뚫리지 않는 논리와 유머로 웃으면서 칼같이 거절합니다.' 
  },
  { 
    id: 'SUPERSTAR', 
    label: '우주 대스타', 
    icon: 'fa-star', 
    description: '이미 내가 월드 클래스인 것처럼 거만하고 근거 없는 자신감을 뿜어냅니다.' 
  },
];

export const EMAIL_TEMPLATES: EmailTemplate[] = [
  {
    id: 'meeting',
    label: '회의 일정 조율',
    icon: 'fa-calendar-check',
    content: '다음 주에 프로젝트 관련해서 회의하고 싶습니다. 수요일이나 목요일 오후에 시간 괜찮으신지 여쭤봅니다.'
  },
  {
    id: 'document',
    label: '자료 요청',
    icon: 'fa-file-export',
    content: '지난번에 말씀하신 프로젝트 결과 보고서 파일 좀 보내주세요. 이번 주 금요일까지 필요합니다.'
  },
  {
    id: 'report',
    label: '업무 보고',
    icon: 'fa-chart-line',
    content: '이번 달 마케팅 성과 보고합니다. 광고 효율은 좋았는데 매출은 작년이랑 비슷해요. 상세 내용은 파일 보세요.'
  },
  {
    id: 'intro',
    label: '협업 제안',
    icon: 'fa-lightbulb',
    content: '저희 회사 솔루션을 귀사에 도입하면 좋을 것 같아 연락드렸습니다. 시간 되실 때 소개할 기회를 주시면 좋겠습니다.'
  }
];

export const FUN_EMAIL_TEMPLATES: EmailTemplate[] = [
  {
    id: 'leave',
    label: '금요일 퇴근 사수',
    icon: 'fa-person-running',
    content: '팀장님, 제 영혼이 이미 퇴근 중이라 몸도 따라가야 할 것 같습니다. 오늘 5시에 조퇴해도 될까요?'
  },
  {
    id: 'lunch',
    label: '점심 메뉴 결투',
    icon: 'fa-utensils',
    content: '오늘 점심 짜장면 먹을 사람? 반박 시 오늘 야근각입니다. 다들 투표해주세요.'
  },
  {
    id: 'coffee',
    label: '커피 뇌물 상납',
    icon: 'fa-mug-hot',
    content: '지난번에 도와주셔서 감사합니다. 제 마음(커피 기프티콘)을 보냅니다. 거절은 거절합니다.'
  },
  {
    id: 'bug',
    label: '버그와의 전쟁',
    icon: 'fa-bug',
    content: '개발자님, 버그가 자꾸 저를 괴롭혀요. 이 버그 좀 퇴치해주시면 제가 평생 은인으로 모시겠습니다.'
  }
];
