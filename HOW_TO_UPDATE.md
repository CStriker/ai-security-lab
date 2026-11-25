# AI Security Lab 홈페이지 — 수정·배포 안내

이 홈페이지는 HTML, CSS, JavaScript로 구성된 정적 사이트입니다. 프레임워크 빌드나 데이터베이스가 필요하지 않습니다. 새소식·논문·랩원·경력은 `js/data.js`에서 수정합니다. 변경한 파일은 UTF-8로 저장하세요.

## 1. 새소식

`NEWS` 배열에 항목을 추가합니다. `id`는 영문 소문자·숫자·하이픈으로 만든 고유한 값으로 유지하세요. 이 값이 개별 소식으로 이동하는 링크에 사용됩니다. 날짜는 정확한 날짜를 알면 `YYYY-MM-DD`, 월만 확인되면 `YYYY-MM` 형식으로 적습니다. 확인되지 않은 날짜를 임의로 채우지 마세요.

```js
{
  id: "research-update-2027-03",
  date: "2027-03",
  tagKo: "연구", tagEn: "Research",
  titleKo: "확인된 소식 제목",
  titleEn: "Verified news title",
  bodyKo: "소식 본문을 입력합니다.",
  bodyEn: "Write the news description here.",
  sourceUrl: "", // 공식 발표·논문 등의 HTTPS 원문 주소가 있으면 입력
},
```

논문 소식의 `titleKo`, `titleEn`에는 논문 정식 제목을 넣고, `subtitleKo`, `subtitleEn`에는 학회·학술지와 채택·게재 상태를 적습니다. 홈 카드와 새소식 본문은 같은 제목·부제 형식을 사용합니다. 날짜는 확인된 정밀도를 유지합니다.

홈에는 최신 소식 일부가, 새소식 페이지에는 전체 항목이 표시됩니다. 날짜 내림차순으로 자동 정렬하며, 같은 달에서는 월만 있는 항목(YYYY-MM)이 일자가 있는 항목(YYYY-MM-DD)보다 먼저 표시됩니다. 같은 날짜의 항목은 배열 순서를 유지합니다. 같은 항목의 `id`를 바꾸면 기존에 공유한 개별 소식 링크도 바뀝니다.

## 2. 논문과 실적

`PUBLICATIONS`에 논문을 추가합니다. 게재된 논문은 `status: "published"`, 게재 승인되었지만 아직 출판 전이면 `status: "accepted"`로 구분합니다. `authors`에서 `**이름**`으로 감싸면 지도교수 이름이 강조됩니다.

```js
{
  year: 2027,
  type: "journal", // journal 또는 conference
  status: "published", // published 또는 accepted
  titleKo: "실제 논문 제목",
  titleEn: "Actual paper title",
  authors: "**Hyunjun Kim**, Co Author",
  venue: "학술지 또는 학회명",
  noteKo: "제1저자",
  noteEn: "First author",
  link: "", // 해당 논문의 정확한 DOI·arXiv·출판사 HTTPS 주소
  linkLabel: "DOI", // 실제 링크에 맞게 DOI, arXiv 등으로 표기
},
```

`showInPublications: false`인 항목은 실적 집계에 포함하되 논문 실적 목록에는 노출하지 않습니다. 현재 CyBiasBench와 VulScope는 채택 소식을 새소식에 안내하고 집계에 포함합니다. 정식 게재 또는 학술대회 발표가 확인되면 해당 실적의 `status`를 `published`로 바꾸고, 실제 발행연도·저자 순서·권호·DOI를 확인해 입력한 뒤 `showInPublications`를 `true`로 바꿉니다. 학술대회 발표 여부만으로 학술지 게재 상태를 변경하지 않습니다.

논문 전체·게재·채택 건수는 논문 데이터에서, 연구 관련 등록 특허 수는 `PATENTS`에서 자동 계산합니다. 홈페이지의 특허 목록에는 연구 관련 특허만 넣습니다. 인용 수·h-index를 고정 숫자로 별도 입력하지 않습니다. 연구자의 최신 인용 실적은 사이트의 Google Scholar 링크에서 확인할 수 있습니다.

## 3. 랩원과 경력

`MEMBERS`에 구성원을 추가합니다. 사진은 `images/members/`에 넣고 상대경로로 지정합니다. 사진을 비워 두면 이름 첫 글자가 표시됩니다. 공동연구 및 연구원 지원 문의 안내는 `contact.html`에서 수정합니다. 공개 화면에는 학부연구생 모집 공고를 표시하지 않습니다. 영문 이름은 본인이 사용하는 표기를 확인한 뒤 입력하고, 확인 전에는 `nameEn`에도 한글 이름을 유지합니다. 학과·전공과 연구분야는 아래 필드에서 수정합니다.

```js
{
  nameKo: "홍길동", nameEn: "Gildong Hong",
  roleKo: "석사과정", roleEn: "M.S. Student",
  departmentKo: "보안경영공학과",
  departmentEn: "Department of Security Management Engineering",
  interestKo: "에이전트 보안",
  interestEn: "Agent Security",
  photo: "images/members/hong.jpg", // 선택 사항
  email: "", // 필요한 경우 공개할 이메일만 입력
},
```

`EXPERIENCE`와 `EDUCATION`의 기간은 `periodKo`, `periodEn`으로 구분합니다.

```js
{
  periodKo: "2026.03 – 현재",
  periodEn: "Mar. 2026 – Present",
  titleKo: "기관과 직위",
  titleEn: "Institution and position",
},
```

연락처·건물·호실은 `contact.html`의 한국어와 영어를 함께 수정합니다. 화면에 남아 있는 미정 정보는 확정된 내용으로 바꾼 후 공개하세요.

## 4. 로컬 미리보기

`index.html`을 브라우저로 열면 기본 내용을 확인할 수 있습니다. 외부 웹폰트와 Google 지도는 인터넷 연결이 필요하므로 완전한 오프라인 동작을 전제로 하지 않습니다. 실제 호스팅과 비슷하게 확인하려면 `lab-website` 폴더에서 다음 명령을 실행하세요.

```sh
python -m http.server 8000
```

브라우저에서 `http://localhost:8000`을 열고 한국어/영어, 모바일 메뉴, 새소식 상세 링크, 논문 링크, 이메일과 지도를 확인합니다. 미리보기 서버 종료는 터미널에서 `Ctrl+C`입니다.

## 5. 공개할 파일 준비

현재 실제 호스팅 주소와 학교 도메인은 확정되지 않았습니다. 아래 `example.org`와 `example.github.io`는 설명용 주소이므로 그대로 배포하지 마세요. 승인된 실제 HTTPS 주소를 사용하면 배포본에 canonical, Open Graph 주소·이미지, `sitemap.xml`, `robots.txt`가 만들어집니다. 원본 HTML은 바뀌지 않습니다.

Node.js 24 또는 최신 LTS가 설치된 환경에서 `lab-website` 폴더를 열어 실행합니다. 별도 npm 패키지 설치는 없습니다.

```sh
# 학교 도메인 등 사이트 루트에 공개하는 경우
node tools/prepare-deploy.mjs https://lab.example.org/

# GitHub 프로젝트 사이트처럼 하위 경로에 공개하는 경우
node tools/prepare-deploy.mjs https://example.github.io/lab-website/

# 산출물을 별도 폴더에 보관하려는 경우
node tools/prepare-deploy.mjs https://lab.example.org/ --output ../lab-public-files
```

기본 산출물은 `dist/`입니다. 이 도구는 HTML 6개, 사이트 CSS·JS, favicon, `images/`의 이미지와 생성된 검색 메타데이터만 복사합니다. 수정 안내서, 검토 자료, 도구, GitHub 설정은 공개 파일에 포함되지 않습니다. 홈페이지 주소가 바뀌면 새 주소로 다시 실행하세요.

같은 산출물 폴더에 재실행하면 허용된 파일만 덮어씁니다. 예상하지 못한 파일이나 이전에 삭제한 이미지가 산출물에 남아 있으면 중단합니다. 자동으로 삭제하지 않으므로 새 빈 `--output` 폴더를 지정하면 됩니다. 출력 폴더는 기본 `dist/` 또는 원본 트리 밖의 별도 폴더를 사용해야 합니다.

`robots.txt`는 검색로봇이 도메인 루트에서 읽는 파일입니다. GitHub의 `/lab-website/` 같은 프로젝트 하위경로에서는 해당 산출물의 robots 파일이 호스트 전체의 규칙을 바꾸지는 않습니다. 이 경우에도 `sitemap.xml`의 페이지 주소는 하위경로에 맞게 생성됩니다.

## 6. GitHub Pages에 공개하기

1. GitHub 저장소 루트에 `index.html`, `css/`, `js/`, `images/`, `tools/`, `.github/` 등이 오도록 **`lab-website` 안의 내용**을 올립니다. 압축파일 자체를 올리는 방식은 아닙니다.
2. 저장소의 **Settings → Pages → Build and deployment → Source**를 **GitHub Actions**로 설정합니다.
3. 공개할 준비가 되면 **Actions → Deploy lab website to GitHub Pages → Run workflow**를 실행합니다.
4. workflow가 Pages에 설정된 실제 기본 주소를 읽어 `dist/`를 만들고, 그 공개 파일만 배포합니다. 완료 화면에서 제공하는 주소로 확인합니다.

포함된 workflow는 수동 실행만 지원합니다. 로컬에서 파일을 고치거나 저장소에 push하는 것만으로 자동 배포되지 않습니다. 소스가 저장소 루트에 있어야 하며, 기본 브랜치에 workflow가 존재해야 수동 실행할 수 있습니다. 자동 배포가 필요해지면 별도로 `push` 트리거를 추가할 수 있습니다.

GitHub 무료 계정의 공개 저장소로 Pages를 운영하면 소스 파일도 공개됩니다. 저장소에 업로드할 때는 사이트 운영에 필요한 파일만 선택하세요. 도구가 제외하는 문서를 저장소에 넣으면 웹사이트 산출물에는 없더라도 저장소에서는 보일 수 있습니다.

공식 안내: [GitHub Pages custom workflows](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages), [configure-pages의 실제 주소 출력](https://github.com/actions/configure-pages/blob/main/action.yml).

## 7. 학교 도메인 연결과 다른 호스팅

학교에서 희망 호스트명을 승인하고 DNS 관리자가 연결 레코드를 등록해야 합니다. GitHub Pages에서는 저장소 **Settings → Pages → Custom domain**에도 승인된 학교 도메인을 설정합니다. DNS 연결·검증과 HTTPS 준비가 끝난 뒤 workflow를 다시 실행하면 새 도메인을 기준으로 메타데이터가 생성됩니다.

아직 GitHub 계정·저장소·학교 호스트명이 정해지지 않았으므로 DNS 요청값을 고정해 두지 않았습니다. 학교에는 승인받을 호스트명, 선택한 호스팅 서비스, 그 서비스가 제공한 CNAME/A/TXT 값과 용도를 전달하세요. 일반적인 웹페이지 URL의 `https://`나 `/저장소명/` 전체를 DNS 레코드 값으로 넣지는 않습니다. CNAME은 호스팅 서비스가 안내한 **호스트명**을 가리킵니다.

Firebase Hosting 또는 학교 웹서버를 선택해도 사용할 수 있습니다. 실제 공개 주소로 도구를 실행한 뒤 **`dist/` 내부 내용만** 해당 서비스의 공개 폴더에 배포하세요. 이 도구는 로컬 파일 준비만 하며 로그인, 업로드, DNS 변경, 외부 배포를 수행하지 않습니다.


## 학교 로고

공통 푸터의 명지대학교 로고는 공식 영문 홈페이지에서 제공하는 원본 `images/mju-signature-en.png`를 사용합니다. 원래 색상과 종횡비를 유지하며, 연구실 로고용 흰색 필터를 적용하지 않습니다.

- 공식 원본: https://www.mju.ac.kr/sites/us/images/eng/logo_eng.png
- UI 안내: https://www.mju.ac.kr/us/3475/subview.do
