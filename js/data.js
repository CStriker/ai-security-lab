/**
 * AI Security Lab — content data
 * Edit this file to add news, publications, or members.
 * See HOW_TO_UPDATE.md for a step-by-step guide.
 */

/* ---------------- NEWS ---------------- */
/* Newest first. Stable id; date: "YYYY-MM" or "YYYY-MM-DD" at the verified precision. */
const NEWS = [
  {
    id: "cybiasbench-neurips-2026",
    date: "2026-10-19",
    tagKo: "논문 채택",
    tagEn: "Paper Accepted",
    titleKo: "CyBiasBench: Benchmarking Bias in LLM Agents for Cyber-Attack Scenarios",
    titleEn: "CyBiasBench: Benchmarking Bias in LLM Agents for Cyber-Attack Scenarios",
    subtitleKo: "NeurIPS 2026 채택",
    subtitleEn: "Accepted at NeurIPS 2026",
    bodyKo: "김현준 교수가 공동 교신저자로 참여한 논문입니다. 사이버 공격 시나리오에서 LLM 에이전트의 행동 편향과 작업 수행 성능을 분석했습니다.",
    bodyEn: "Prof. Hyunjun Kim is a co-corresponding author of this paper, which analyzes behavioral bias and task performance in LLM agents across cyber-attack scenarios.",
    sourceUrl: "https://trustworthyai.co.kr/article/2026/cybiasbench-news-eng/",
  },
  {
    id: "vulscope-emse-2026",
    date: "2026-05-11",
    tagKo: "논문 채택",
    tagEn: "Paper Accepted",
    titleKo: "VulScope: Software Vulnerability Detection via Local Context Analysis and Verification",
    titleEn: "VulScope: Software Vulnerability Detection via Local Context Analysis and Verification",
    subtitleKo: "Empirical Software Engineering 채택",
    subtitleEn: "Accepted in Empirical Software Engineering",
    bodyKo: "김현준 교수가 공동 제1저자로 참여한 논문이 2026년 5월 11일 Empirical Software Engineering에 채택되었습니다. 소프트웨어 취약점을 국소 문맥 분석과 검증을 통해 탐지하는 연구입니다.",
    bodyEn: "Prof. Hyunjun Kim is a co-first author of this paper, which was accepted for publication in Empirical Software Engineering on May 11, 2026. It studies software vulnerability detection through local context analysis and verification.",
  },
  {
    id: "fgcs-2026",
    date: "2026-03",
    tagKo: "논문 게재",
    tagEn: "Paper Published",
    titleKo: "Towards an efficient dataflow-flexible accelerator by finding optimal dataflows of DNNs",
    titleEn: "Towards an efficient dataflow-flexible accelerator by finding optimal dataflows of DNNs",
    subtitleKo: "Future Generation Computer Systems 게재",
    subtitleEn: "Published in Future Generation Computer Systems",
    bodyKo: "김현준 교수가 공동 제1저자로 참여한 논문입니다. DNN의 최적 데이터플로우 탐색을 통한 가속기 설계를 다루며, 176권(2026년 3월), 논문 번호 108123으로 게재되었습니다.",
    bodyEn: "Co-first-authored by Prof. Hyunjun Kim, this paper studies accelerator design through optimal DNN dataflow exploration. It was published in volume 176 (March 2026), article 108123.",
    sourceUrl: "https://doi.org/10.1016/j.future.2025.108123",
  },
  {
    id: "faculty-appointment-2026",
    date: "2026-03-01",
    tagKo: "교원 부임",
    tagEn: "Faculty",
    titleKo: "김현준 교수, 명지대학교 컴퓨터정보통신공학부 조교수 부임",
    titleEn: "Prof. Hyunjun Kim Joins Myongji University as Assistant Professor",
    bodyKo: "김현준 교수가 2026년 3월 1일 명지대학교 컴퓨터정보통신공학부 조교수로 부임하였습니다.",
    bodyEn: "Prof. Hyunjun Kim joined the Dept. of Computer, Information and Communications Engineering at Myongji University as Assistant Professor on March 1, 2026.",
  },
  {
    id: "recruitment-2026",
    date: "2026-03-01",
    tagKo: "모집",
    tagEn: "Recruiting",
    titleKo: "2026학년도 학부연구생 모집",
    titleEn: "Undergraduate Researcher Recruitment for 2026",
    bodyKo: "AI 에이전트를 활용한 보안 작업 수행(AI for Security)과 AI 에이전트 자체의 보안 강화(Security for AI)를 함께 연구할 학부연구생을 모집합니다.",
    bodyEn: "We are recruiting undergraduate researchers interested in using AI agents to perform security tasks (AI for Security) and securing AI agents themselves (Security for AI).",
  },
];

/* ---------------- PUBLICATIONS ---------------- */
/* type: "journal" | "conference"; status: "published" | "accepted".
 * authors uses "**Name**" to bold the PI. Keep accepted papers distinct from published papers.
 * Published-paper year is the formal publication year. For a journal accepted
 * but not yet published, use its acceptance year until publication details exist.
 * showInPublications: false counts a paper in totals but announces it only in News.
 */
const PUBLICATIONS = [
  {
    year: 2026,
    type: "journal",
    status: "accepted",
    showInPublications: false,
    newsId: "vulscope-emse-2026",
    titleKo: "VulScope: Software Vulnerability Detection via Local Context Analysis and Verification",
    titleEn: "VulScope: Software Vulnerability Detection via Local Context Analysis and Verification",
    venue: "Empirical Software Engineering",
    noteKo: "공동 제1저자",
    noteEn: "Co-first author",
  },
  {
    year: 2026,
    type: "conference",
    status: "accepted",
    titleKo: "CyBiasBench: Benchmarking Bias in LLM Agents for Cyber-Attack Scenarios",
    titleEn: "CyBiasBench: Benchmarking Bias in LLM Agents for Cyber-Attack Scenarios",
    authors: "Taein Lim, Seongyong Ju, Munhyeok Kim, **Hyunjun Kim**, Hoki Kim",
    venue: "Conference on Neural Information Processing Systems (NeurIPS 2026)",
    noteKo: "공동 교신저자",
    noteEn: "Co-corresponding author",
    linkLabel: "arXiv",
    link: "https://arxiv.org/abs/2605.07830",
  },
  {
    year: 2026,
    type: "journal",
    status: "published",
    titleKo: "Towards an efficient dataflow-flexible accelerator by finding optimal dataflows of DNNs",
    titleEn: "Towards an efficient dataflow-flexible accelerator by finding optimal dataflows of DNNs",
    authors: "**Hyunjun Kim**, Whoi Ree Ha, Yongseok Lee, Dongju Lee, Jongwon Lee, Deumji Woo, Jonghee Yoon, Jemin Lee, Yongin Kwon, Yunheung Paek",
    venue: "Future Generation Computer Systems, vol. 176, article 108123",
    noteKo: "공동 제1저자",
    noteEn: "Co-first author",
    linkLabel: "DOI",
    link: "https://doi.org/10.1016/j.future.2025.108123",
  },
  {
    year: 2023,
    type: "conference",
    status: "published",
    titleKo: "Exploring Clustered Federated Learning's Vulnerability against Property Inference Attack",
    titleEn: "Exploring Clustered Federated Learning's Vulnerability against Property Inference Attack",
    authors: "**Hyunjun Kim**, Yungi Cho, Younghan Lee, Ho Bae, Yunheung Paek",
    venue: "International Symposium on Research in Attacks, Intrusions and Defenses (RAID)",
    noteKo: "공동 제1저자",
    noteEn: "Co-first author",
    linkLabel: "DOI",
    link: "https://doi.org/10.1145/3607199.3607218",
  },
  {
    year: 2023,
    type: "journal",
    status: "published",
    titleKo: "Modeling and Library Support for Early-Stage Exploration of Sparse Tensor Accelerator Designs",
    titleEn: "Modeling and Library Support for Early-Stage Exploration of Sparse Tensor Accelerator Designs",
    authors: "Whoi Ree Ha, **Hyunjun Kim**, Yunheung Paek",
    venue: "IEEE Access, vol. 11, pp. 55361–55369",
    noteKo: "공동 제1저자",
    noteEn: "Co-first author",
    linkLabel: "DOI",
    link: "https://doi.org/10.1109/ACCESS.2023.3278274",
  },
  {
    year: 2021,
    type: "journal",
    status: "published",
    titleKo: "Panop: Mimicry-Resistant ANN-Based Distributed NIDS for IoT Networks",
    titleEn: "Panop: Mimicry-Resistant ANN-Based Distributed NIDS for IoT Networks",
    authors: "**Hyunjun Kim**, Sunwoo Ahn, Whoi Ree Ha, Hyunjae Kang, Dong Seong Kim, Huy Kang Kim, Yunheung Paek",
    venue: "IEEE Access, vol. 9, pp. 111853–111864",
    noteKo: "제1저자",
    noteEn: "First author",
    linkLabel: "DOI",
    link: "https://doi.org/10.1109/ACCESS.2021.3103015",
  },
];

const PUB_STATS = { count: PUBLICATIONS.length };
const FOUNDED_YEAR = 2026;

/* ---------------- PATENTS ---------------- */
const PATENTS = [
  {
    titleKo: "IoT 시스템의 비정상행위 탐지 방법 및 그 장치",
    titleEn: "Method and Apparatus for Detecting Anomalous Behavior in IoT Systems",
    no: "10-2609592",
    inventors: "Yunheung Paek, Hyunjun Kim, Sunwoo Ahn, Whoi Ree Ha",
    filed: "2021.12",
    registered: "2023.11",
    link: "https://patents.google.com/patent/KR102609592B1/ko",
  },
];

/* ---------------- FUNDED PROJECTS ---------------- */
const PROJECTS = [
  {
    titleKo: "비수학적 접근법 중심의 암호화된 신경망 데이터 영오차 처리 기술",
    titleEn: "Zero-Error Processing Technology for Encrypted Neural Network Data via Non-Mathematical Approaches",
    period: "2023.09 – 2025.08",
  },
  {
    titleKo: "익명화된 기밀실행을 이용한 전주기적 데이터 프라이버시 보호 기술 개발",
    titleEn: "Full-Lifecycle Data Privacy Protection Technology Using Anonymized Confidential Execution",
    period: "2024.06 – 2025.08",
  },
  {
    titleKo: "전장부품용 Secure HW/SW 통합 아키텍처 기술개발",
    titleEn: "Secure HW/SW Integrated Architecture Technology for Automotive Components",
    period: "2024.04 – 2025.12",
  },
  {
    titleKo: "개방형 엣지 AI 반도체 설계 및 SW 플랫폼 기술개발",
    titleEn: "Open Edge AI Semiconductor Design and SW Platform Technology Development",
    period: "2023.06 – 2024.02",
  },
  {
    titleKo: "IoT 디바이스 자율 신뢰보장 기술 및 글로벌 표준기반 IoT 통합보안 오픈 플랫폼 기술개발",
    titleEn: "Autonomous Trust Assurance for IoT Devices and Global Standard-Based IoT Integrated Security Open Platform",
    period: "2019.01 – 2021.12",
  },
];

/* ---------------- EXPERIENCE / EDUCATION ---------------- */
const EXPERIENCE = [
  { periodKo: "2026.03 – 현재", periodEn: "2026.03 – Present", titleKo: "명지대학교 컴퓨터정보통신공학부 컴퓨터공학전공 조교수", titleEn: "Assistant Professor, Computer Engineering Major, School of Computer, Information and Communications Engineering, Myongji University" },
  { periodKo: "2025.09 – 2026.02", periodEn: "2025.09 – 2026.02", titleKo: "서울대학교 컴퓨터연구소 연수연구원", titleEn: "Research Fellow, Institute of Computer Technology, Seoul National University" },
  { periodKo: "2025.09 – 2026.02", periodEn: "2025.09 – 2026.02", titleKo: "명지대학교 보안경영공학과 객원교수", titleEn: "Adjunct Professor, Dept. of Security Management Engineering, Myongji University" },
  { periodKo: "2024.09 – 2026.02", periodEn: "2024.09 – 2026.02", titleKo: "숭실대학교 AI테크노융합학과 강사", titleEn: "Lecturer, Dept. of AI Techno-Convergence, Soongsil University" },
];

const EDUCATION = [
  { periodKo: "2018.03 – 2025.08", periodEn: "2018.03 – 2025.08", titleKo: "서울대학교 전기·정보공학부 석박사통합과정 졸업", titleEn: "Ph.D. (Integrated M.S.–Ph.D.), Dept. of Electrical and Computer Engineering, Seoul National University" },
  { periodKo: "2014.03 – 2018.02", periodEn: "2014.03 – 2018.02", titleKo: "서울대학교 전기·정보공학부 학사 졸업", titleEn: "B.S., Dept. of Electrical and Computer Engineering, Seoul National University" },
];

/* ---------------- LAB MEMBERS ---------------- */
/* Use each member's confirmed English name; keep the Korean name until provided.
 * Omit optional interests, photo, and email unless confirmed. Example:
   {
     nameKo: "홍길동", nameEn: "홍길동",
     roleKo: "석사과정", roleEn: "M.S. Student",
     departmentKo: "보안경영공학과",
     departmentEn: "Department of Security Management Engineering",
     // interestKo: "LLM 및 에이전트 보안", interestEn: "LLM and Agent Security",
     // photo: "images/members/hong.jpg",
     // email: "example@mju.ac.kr"
   }
*/
const MEMBERS = [
  {
    nameKo: "이민용",
    nameEn: "이민용",
    roleKo: "석사과정",
    roleEn: "M.S. Student",
    departmentKo: "보안경영공학과",
    departmentEn: "Department of Security Management Engineering",
    interestKo: "AI 기반 바이너리 분석",
    interestEn: "AI-based Binary Analysis",
  },
  {
    nameKo: "김채린",
    nameEn: "김채린",
    roleKo: "학부연구생",
    roleEn: "Undergraduate Researcher",
    departmentKo: "컴퓨터정보통신공학부 컴퓨터공학전공",
    departmentEn: "Computer Engineering Major, School of Computer, Information and Communications Engineering",
    interestKo: "에이전트 보안",
    interestEn: "Agent Security",
  },
  {
    nameKo: "원종빈",
    nameEn: "원종빈",
    roleKo: "학부연구생",
    roleEn: "Undergraduate Researcher",
    departmentKo: "컴퓨터정보통신공학부 컴퓨터공학전공",
    departmentEn: "Computer Engineering Major, School of Computer, Information and Communications Engineering",
    interestKo: "에이전트 보안",
    interestEn: "Agent Security",
  },
];
