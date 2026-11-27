/* =========================================================================
   시영과민수 (SIYOUNG & MINSOO) 공식 사이트 — 기본값 파일
   -------------------------------------------------------------------------
   ★ 지금은 구글 스프레드시트에서 사이트를 관리합니다.
     https://docs.google.com/spreadsheets/d/1Db2Zl-JH4MA8RLVC6tQpbZHfO5zUHA3VgbBZdUjIi00/edit
     시트의 값을 고치고 사이트를 새로고침하면 바로 반영됩니다.

   이 파일은 시트를 읽지 못했을 때 쓰는 '기본값'입니다.
   시트가 정상이면 이 파일의 값은 시트 값으로 덮어써집니다.
   ※ 가격·구성은 네이버 스마트스토어(https://smartstore.naver.com/siyoung_minsoo) 판매 기준입니다.
   ========================================================================= */

window.SITE_CONFIG = {
  /* ── 검색·공유 미리보기 ────────────────────────────────────────────── */
  meta: {
    title: "시영과민수 | 웨딩 본식 DVD · 식전영상 · 아이폰 스냅",
    description:
      "신부대기실의 떨림부터 원판·연회장까지. 서울 연남동 기반 웨딩 필름 스튜디오 시영과민수의 본식 DVD, 식전영상, 아이폰 스냅.",
    ogImage: "assets/img/og.jpg",
  },

  /* ── 브랜드 ──────────────────────────────────────────────────────── */
  brand: {
    name: "시영과민수",
    nameEn: "SIYOUNG & MINSOO",
    tagline: "결혼식의 하루를, 한 편의 영화로.",
    location: "서울 마포구 연남동 · 전국 출장 가능",
  },

  /* ── 공식 링크 ───────────────────────────────────────────────────── */
  links: {
    store: "https://smartstore.naver.com/siyoung_minsoo",
    instagram: "https://www.instagram.com/siyoung_minsoo/",
    instagramMood: "https://www.instagram.com/siyoungfilm/",
    blog: "https://blog.naver.com/siyoungfilm",
    youtube: "https://www.youtube.com/@siyoung_minsoo",
  },

  /* ── 상단 공지 배너 (enabled: false 로 끄기, text 를 비우면 안 보임) ── */
  notice: {
    enabled: true,
    text: "2027년 상반기 예식 · 10팀 한정 할인가로 예약 받고 있습니다.",
    linkLabel: "스마트스토어에서 보기",
    linkHref: "https://smartstore.naver.com/siyoung_minsoo",
  },

  /* ── 상단 메뉴 ───────────────────────────────────────────────────── */
  nav: [
    { label: "서비스", href: "#service" },
    { label: "포트폴리오", href: "#portfolio" },
    { label: "진행 과정", href: "#process" },
    { label: "자주 묻는 질문", href: "#faq" },
    { label: "문의", href: "#contact" },
  ],

  /* ── 첫 화면 ─────────────────────────────────────────────────────── */
  hero: {
    eyebrow: "SEOUL · WEDDING FILM STUDIO",
    // titleLines: 한 줄씩 나눠서 크게 표시됩니다. 줄을 추가·삭제해도 됩니다.
    titleLines: ["결혼식의 하루를,", "한 편의 영화로."],
    desc:
      "본식 DVD · 식전영상 · 아이폰 스냅.\n신부대기실의 떨림부터 원판까지, 그날의 처음과 끝을 직접 촬영하고 편집합니다.",
    image: "assets/img/hero.jpg",              // 모바일에서 보이는 가로 사진
    imagePortrait: "assets/img/hero-portrait.jpg", // PC에서 보이는 세로 사진
    imageAlt: "스페이스 남산에서 진행된 본식 촬영 스틸",
    primaryCta: { label: "상담 문의", href: "#contact" },
    // secondaryCta.videoUrl : 첫 화면에서 바로 재생되는 대표 영상
    secondaryCta: { label: "대표 영상 보기", videoUrl: "https://youtu.be/kYrKAckNG8Q" },
    meta: [
      { label: "기반", value: "서울 연남동" },
      { label: "촬영", value: "1~2인 2~5캠" },
      { label: "납품", value: "예식 2개월 후" },
    ],
  },

  /* ── 소개 문장 ───────────────────────────────────────────────────── */
  intro: {
    statement: "가장 빛나던 몇 시간을\n기록이 아니라, 다시 보고 싶은 장면으로.",
    body:
      "시영과민수는 본식 DVD · 식전영상 · 아이폰 스냅을 한 팀이 함께 진행하는 웨딩 필름 스튜디오입니다. 카메라를 들고 하루를 함께 걸으며, 그날의 표정과 목소리를 그대로 담습니다.",
  },

  /* ── 서비스 ──────────────────────────────────────────────────────── */
  services: {
    eyebrow: "01 — Service",
    title: "세 가지 방식, 하나의 톤",

    /* ① 본식 DVD */
    dvd: {
      number: "01",
      title: "본식 DVD",
      en: "WEDDING FILM",
      lead: "예식의 시작부터 끝까지, 한 편의 다큐멘터리로.",
      body:
        "고정캠·핸드헬드·짐벌까지 카메라 2~5대로 하루를 담습니다. 인터뷰와 하이라이트·풀다큐를 편집해 예식 2개월 후 전달하고, 2인 작가 PREMIUM은 연회장까지 함께합니다.",
      image: "assets/img/service-dvd.jpg",
      imageAlt: "본식 촬영 스틸 — 혼주와 신부",
      specs: [
        "촬영 범위 — BASIC~SIGNATURE 신부대기실 연출촬영 ~ 원판 / PREMIUM 연회장까지",
        "인터뷰 — 4~5팀 이상 (양가 혼주님 포함)",
        "납품 — 예식 2개월 후 (1분 하이라이트는 2주 내)",
      ],
      /* price 는 숫자만. promo 는 가격 아래 작게 표시되는 할인 안내입니다. */
      plans: [
        {
          name: "BASIC",
          sub: "1인 2캠",
          price: 390000,
          promo: "",
          desc: "고정캠 1 + 스냅캠 1, 신부대기실부터 원판까지",
          features: [
            "고정캠 1 · 스냅캠 1",
            "신부대기실 연출촬영 ~ 원판촬영",
            "풀다큐 기록 영상",
          ],
          badge: "",
        },
        {
          name: "STANDARD",
          sub: "1인 3캠",
          price: 590000,
          promo: "27년 상반기 ~ 27.08 예식 10팀 한정 · 500,000원",
          desc: "고정캠 2 + 핸드헬드 1, 인터뷰와 하이라이트까지",
          features: [
            "고정캠 2 · 핸드헬드 1",
            "인터뷰 4~5팀",
            "뮤직비디오형 하이라이트 2~3분 + 풀다큐",
            "Log 색보정 · 외장레코더",
          ],
          badge: "",
        },
        {
          name: "SIGNATURE",
          sub: "1인 4캠",
          price: 790000,
          promo: "27년 상반기 예식 한정 · 700,000원",
          desc: "고정캠 2 + 서브짐벌 1 + 짐벌캠 1, 시네마틱 필름",
          features: [
            "고정캠 2 · 서브짐벌 1 · 짐벌캠 1",
            "인터뷰 4~5팀 이상",
            "시네마틱 하이라이트 2~3분 + 풀다큐",
            "SNS 공유용 1분 하이라이트 (2주 내)",
          ],
          badge: "BEST",
        },
        {
          name: "PREMIUM",
          sub: "2인 5캠",
          price: 1090000,
          promo: "",
          desc: "2인 작가 5캠, 신부대기실부터 연회장까지",
          features: [
            "2인 작가 · 카메라 5대",
            "신부대기실 ~ 연회장 촬영",
            "인터뷰 5팀 이상",
            "시네마틱 + 1분 하이라이트 (2주 내) + 풀다큐",
          ],
          badge: "",
        },
      ],
      optionsTitle: "추가 옵션 · 패키지",
      options: [
        "연회장 스케치 촬영 +50,000원",
        "2부 촬영 +150,000원",
        "세로 1분 하이라이트 +50,000원",
        "식전영상 패키지 70,000원 (정가 100,000원 · 30% 할인)",
        "아이폰 스냅 패키지 160,000원 (정가 200,000원 · 20% 할인)",
      ],
      note:
        "초상권 동의·이벤트 할인은 정가에 포함되어 있지 않으며 상담 시 별도로 안내드립니다. 출장비는 방문 지역에 따라 달라지며 촬영 전 최종 금액에 포함해 안내드립니다.",
    },

    /* ② 식전영상 */
    mood: {
      number: "02",
      title: "식전영상",
      en: "MOOD FILM",
      lead: "두 사람의 이야기를, 영화처럼.",
      body:
        "하고 싶었던 말, 처음 만난 날, 서로에게 미처 전하지 못한 마음을 시나리오로 엮어 무드필름으로 만듭니다. 예식장 스크린이 작은 영화관이 되는 순간입니다.",
      image: "assets/img/service-mood.jpg",
      imageAlt: "클래식 시네마 무드필름 촬영 스틸",
      specs: [
        "스토리형 무드필름 · 프리웨딩 시네마틱 필름",
        "음원 변경 · 자막 편집",
        "무빙포스터(영상 포스터) 제작",
      ],
      products: [
        {
          name: "시그니처 화보 식전영상",
          price: 100000,
          note: "본식 DVD와 함께 예약 시 70,000원",
        },
        {
          name: "무빙포스터 식전영상",
          price: 50000,
          note: "4종 디자인 · 당일 제작",
        },
        {
          name: "넷플릭스 컨셉 인트로 영상",
          price: 25000,
          note: "빠른 제작 · 음원 변경",
        },
      ],
      priceNote: "본식 DVD와 함께 예약하시면 패키지 가격이 적용됩니다.",
    },

    /* ③ 아이폰 스냅 */
    snap: {
      number: "03",
      title: "아이폰 스냅",
      en: "IPHONE SNAP",
      lead: "가볍게, 그러나 오래 남게.",
      body:
        "아이폰으로 찍는 본식 스냅입니다. 1인 여성 작가(시영)가 예식 90분 전부터 플라워 샤워까지 함께하며, 당일 원본과 일주일 뒤 보정본을 전달드립니다.",
      image: "", // 사진을 넣고 싶으면 예: "assets/img/snap.jpg" — 비워두면 글자만으로 표시됩니다.
      imageAlt: "아이폰 스냅 촬영 스틸",
      specs: [
        "1인 여성 작가(시영) 진행",
        "예식 90분 전 시작 ~ 플라워 샤워",
        "당일 원본 500~600장 + 짧은 영상",
        "7일 후 보정본 10장 + 감성샷 3장 (+신부픽 5장)",
      ],
      price: 200000,
      priceNote: "예약금 50,000원 + 잔금 150,000원",
      optionsTitle: "추가 옵션",
      options: [
        "SE 감성 서브폰 추가 +50,000원 (원본 300장 이상)",
        "폴라로이드 3장 + 연출샷 +10,000원",
        "원판 촬영 추가 +10,000원",
        "2부 촬영 추가 +50,000원",
        "출장비 — 서울·경기 외 지역은 별도 안내",
      ],
      benefit: "본식 DVD와 함께 예약하시면 20% 할인된 160,000원입니다.",
    },
  },

  /* ── 포트폴리오 ──────────────────────────────────────────────────── */
  portfolio: {
    eyebrow: "02 — Portfolio",
    title: "최근 작업",
    desc: "하이라이트와 무드필름을 유튜브에 차곡차곡 쌓고 있습니다.",
    channelUrl: "https://www.youtube.com/@siyoung_minsoo",
    channelLabel: "유튜브 채널 전체 보기",
    /* featured: 크게 보여줄 대표 영상 */
    featured: {
      url: "https://youtu.be/kYrKAckNG8Q",
      title: "본식 시네마틱 하이라이트",
      place: "파주 센트리움",
      tag: "3캠",
    },
    /* items: 작은 카드 3~6개. url 만 바꾸면 썸네일이 자동으로 바뀝니다. */
    items: [
      {
        url: "https://youtu.be/VzO0QIyZN_A",
        title: "본식 시네마틱 하이라이트",
        place: "서울대 이라운지",
        tag: "본식",
      },
      {
        url: "https://youtu.be/D1g7v9Y1jDE",
        title: "프리웨딩 시네마틱 필름",
        place: "영화 같은 식전영상",
        tag: "식전영상",
      },
      {
        url: "https://youtu.be/f76W2nKwDBA",
        title: "본식 시네마틱 하이라이트",
        place: "스페이스 남산",
        tag: "3캠",
      },
    ],
  },

  /* ── 진행 과정 ───────────────────────────────────────────────────── */
  process: {
    eyebrow: "03 — Process",
    title: "예약부터 납품까지",
    steps: [
      {
        step: "01",
        title: "일정 · 상품 상담",
        desc: "예식 날짜와 장소를 알려주시면 진행 가능 여부와 상품을 안내드립니다.",
      },
      {
        step: "02",
        title: "예약금 입금 · 계약서 작성",
        desc: "예약금 입금과 계약서 작성으로 일정이 확정됩니다.",
      },
      {
        step: "03",
        title: "예식 2주 전 설문지",
        desc: "인터뷰 대상과 촬영 요청 사항을 미리 확인합니다.",
      },
      {
        step: "04",
        title: "본식 촬영",
        desc: "신부대기실 연출촬영부터 원판촬영까지 하루를 함께합니다.",
      },
      {
        step: "05",
        title: "예식 2개월 후 납품",
        desc: "하이라이트와 풀다큐를 편집해 전달드립니다. (1분 하이라이트는 2주 내)",
      },
    ],
  },

  /* ── 짧은 약속 4가지 ─────────────────────────────────────────────── */
  assurance: [
    { title: "1~2인 2~5캠", desc: "구성에 따라 작가 1~2인, 카메라 2~5대를 직접 운용합니다." },
    { title: "인터뷰 4~5팀", desc: "양가 혼주님을 포함한 인터뷰로 하루를 남깁니다." },
    { title: "2개월 후 납품", desc: "편집과 색보정을 거쳐 전달하고, 1분 하이라이트는 2주 내 보내드립니다." },
    { title: "전국 출장", desc: "서울·경기 외 지역은 출장비를 사전에 안내드립니다." },
  ],

  /* ── 자주 묻는 질문 ──────────────────────────────────────────────── */
  faq: {
    eyebrow: "04 — FAQ",
    title: "자주 묻는 질문",
    items: [
      {
        q: "27년 상반기 할인가는 어떻게 적용되나요?",
        a: "STANDARD는 27년 상반기 ~ 27.08 예식 10팀 한정으로 500,000원, SIGNATURE는 27년 상반기 예식에 700,000원으로 진행합니다. 팀이 마감되면 정가로 돌아가며, 예약 전 상담에서 잔여 팀을 확인해 드립니다.",
      },
      {
        q: "출장비가 있나요?",
        a: "서울·경기 외 지역은 출장비가 발생하며 지역별로 다릅니다. 상담 시 방문 지역을 알려주시면 촬영 전 최종 금액에 포함해 안내드립니다.",
      },
      {
        q: "2부·연회장도 촬영되나요?",
        a: "PREMIUM은 신부대기실부터 연회장까지 기본 포함입니다. 그 외 구성은 연회장 스케치 촬영 50,000원, 2부 촬영 150,000원으로 추가할 수 있고, 아이폰 스냅은 2부 촬영 추가 시 50,000원입니다.",
      },
      {
        q: "원판(전체 영상)도 받을 수 있나요?",
        a: "모든 구성이 신부대기실 연출촬영부터 원판촬영까지 담고, 풀다큐로 제공됩니다. 무편집 원본(원판) 추가는 상담 시 안내드립니다.",
      },
      {
        q: "식전영상만 따로 주문할 수 있나요?",
        a: "가능합니다. 시그니처 화보 식전영상 100,000원, 무빙포스터 식전영상 50,000원, 넷플릭스 컨셉 인트로 영상 25,000원으로 각각 예약하실 수 있습니다.",
      },
      {
        q: "아이폰 스냅만 예약할 수 있나요?",
        a: "가능합니다. 200,000원(예약금 50,000원 + 잔금 150,000원)이며, 본식 DVD와 함께 예약하시면 20% 할인된 160,000원입니다.",
      },
      {
        q: "수정은 몇 번까지 가능한가요?",
        a: "1차 납품 후 수정 요청을 받습니다. 하이라이트와 풀다큐 모두 가능하며, 세부 범위는 상담 시 안내드립니다.",
      },
      {
        q: "납품까지 얼마나 걸리나요?",
        a: "본식 DVD는 예식 후 2개월을 기준으로 하고, SNS 공유용 1분 하이라이트는 2주 안에 먼저 전달합니다. 아이폰 스냅은 촬영 당일 원본을, 일주일 안에 보정본을 보내드립니다.",
      },
      {
        q: "예약금과 잔금은 어떻게 되나요?",
        a: "예약금 입금과 계약서 작성으로 일정이 확정되고, 잔금은 촬영 이후에 정산합니다. 아이폰 스냅은 예약금 50,000원, 잔금 150,000원입니다.",
      },
      {
        q: "초상권 동의 할인이 있나요?",
        a: "촬영본을 포트폴리오로 활용하는 데 동의해 주시면 할인 혜택을 드립니다. 금액은 상담 시 안내드립니다.",
      },
    ],
  },

  /* ── 문의 ────────────────────────────────────────────────────────── */
  contact: {
    eyebrow: "05 — Contact",
    title: "예식 날짜와 장소만 알려주세요.",
    desc:
      "남은 일정과 상품을 확인해 가장 잘 맞는 방식으로 안내드립니다. 예식일에는 응대가 조금 늦을 수 있습니다.",
    /* href 가 빈 칸이면 그 버튼은 사이트에 나타나지 않습니다.
       카카오톡 채널·네이버 폼 주소가 생기면 아래 href 에 넣어 주세요. */
    channels: [
      {
        label: "네이버 스마트스토어",
        value: "smartstore.naver.com/siyoung_minsoo",
        href: "https://smartstore.naver.com/siyoung_minsoo",
        note: "상품 구성 · 예약금 결제",
      },
      {
        label: "전화 상담",
        value: "010-2363-9868",
        href: "tel:01023639868",
        note: "가장 빠른 상담",
      },
      {
        label: "인스타그램 DM",
        value: "@siyoung_minsoo",
        href: "https://www.instagram.com/siyoung_minsoo/",
        note: "작업물과 함께 보기",
      },
      {
        label: "무드필름 인스타그램",
        value: "@siyoungfilm",
        href: "https://www.instagram.com/siyoungfilm/",
        note: "식전영상 작업물",
      },
      {
        label: "네이버 블로그",
        value: "blog.naver.com/siyoungfilm",
        href: "https://blog.naver.com/siyoungfilm",
        note: "촬영 후기 · 준비 팁",
      },
      {
        label: "카카오톡 채널",
        value: "채널 주소를 site-config.js에 넣어 주세요",
        href: "",
        note: "",
      },
      {
        label: "네이버 폼",
        value: "폼 주소를 site-config.js에 넣어 주세요",
        href: "",
        note: "",
      },
    ],
    note:
      "상담은 무료이며, 예식 날짜가 정해지지 않았어도 괜찮습니다. 가능한 날짜를 먼저 확인해 드립니다.",
  },

  /* ── 하단 정보 (사업자 정보는 실제와 다르면 고쳐 주세요) ────────────── */
  footer: {
    ceo: "김다은",
    businessNo: "115-40-01613",
    address: "서울 마포구 연남동",
    tel: "010-2363-9868",
    store: "https://smartstore.naver.com/siyoung_minsoo",
    instagram: "https://www.instagram.com/siyoung_minsoo/",
    instagramMood: "https://www.instagram.com/siyoungfilm/",
    blog: "https://blog.naver.com/siyoungfilm",
    youtube: "https://www.youtube.com/@siyoung_minsoo",
    copyright: "© 2026 시영과민수. All rights reserved.",
  },
};
