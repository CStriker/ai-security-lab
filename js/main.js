/* AI Security Lab — bilingual content and accessible navigation */
(function () {
  "use strict";
  const root = document.documentElement;
  const header = document.querySelector(".site-header");
  const navToggle = document.querySelector(".nav-toggle");
  const mainNav = document.querySelector(".main-nav");
  const backToTop = document.querySelector(".back-to-top");
  const mobile = window.matchMedia("(max-width: 980px)");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  function updateMenuLabel() {
    if (!navToggle) return;
    const open = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-label", root.lang === "en"
      ? (open ? "Close navigation" : "Open navigation")
      : (open ? "메뉴 닫기" : "메뉴 열기"));
  }
  function closeMenu(returnFocus) {
    if (!mainNav || !navToggle) return;
    mainNav.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
    updateMenuLabel();
    if (returnFocus) navToggle.focus();
  }
  function setLang(lang) {
    lang = lang === "en" ? "en" : "ko";
    root.dataset.lang = lang;
    root.lang = lang;
    // Storage restrictions must not prevent navigation or content rendering.
    try { localStorage.setItem("asl-lang", lang); } catch (_) { /* session only */ }
    document.querySelectorAll(".lang-toggle button").forEach((button) => {
      const selected = button.dataset.lang === lang;
      button.classList.toggle("is-active", selected);
      button.setAttribute("aria-pressed", String(selected));
    });
    document.querySelectorAll("[data-label-ko][data-label-en]").forEach((el) => {
      el.setAttribute("aria-label", lang === "en" ? el.dataset.labelEn : el.dataset.labelKo);
    });
    document.querySelectorAll("iframe[data-title-ko][data-title-en]").forEach((el) => {
      el.title = lang === "en" ? el.dataset.titleEn : el.dataset.titleKo;
    });
    document.title = (lang === "en" ? root.dataset.titleEn : root.dataset.titleKo) || document.title;
    document.querySelectorAll('meta[property="og:title"], meta[name="twitter:title"]').forEach((el) => {
      el.content = document.title;
    });
    document.querySelectorAll("meta[data-content-ko][data-content-en]").forEach((el) => {
      el.content = lang === "en" ? el.dataset.contentEn : el.dataset.contentKo;
    });
    if (backToTop) backToTop.setAttribute("aria-label", lang === "en" ? "Back to top" : "맨 위로");
    updateMenuLabel();
  }
  let initialLang = root.dataset.lang || "ko";
  try { initialLang = localStorage.getItem("asl-lang") || initialLang; } catch (_) { /* default */ }
  document.querySelectorAll(".lang-toggle button").forEach((button) => {
    button.addEventListener("click", () => setLang(button.dataset.lang));
  });
  if (navToggle && mainNav) {
    navToggle.addEventListener("click", () => {
      if (mainNav.classList.contains("is-open")) closeMenu(false);
      else {
        mainNav.classList.add("is-open");
        navToggle.setAttribute("aria-expanded", "true");
        updateMenuLabel();
        mainNav.querySelector("a")?.focus();
      }
    });
    mainNav.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => closeMenu(false)));
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && mainNav.classList.contains("is-open")) closeMenu(true);
    });
    document.addEventListener("click", (event) => {
      if (!mainNav.contains(event.target) && !navToggle.contains(event.target)) closeMenu(false);
    });
    document.addEventListener("focusin", (event) => {
      if (header && !header.contains(event.target)) closeMenu(false);
    });
    mobile.addEventListener("change", () => closeMenu(false));
  }
  const updateScroll = () => {
    header?.classList.toggle("is-scrolled", window.scrollY > 8);
    backToTop?.classList.toggle("is-visible", window.scrollY > 480);
  };
  window.addEventListener("scroll", updateScroll, { passive: true });
  updateScroll();
  backToTop?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: reducedMotion.matches ? "auto" : "smooth" });
  });

  /* Values in data.js are text, not HTML. */
  const escapeHtml = (value) => String(value ?? "").replace(/[&<>"']/g, (c) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[c]));
  const bi = (ko, en) => `<span class="ko">${escapeHtml(ko)}</span><span class="en">${escapeHtml(en)}</span>`;
  const fmtAuthors = (value) => escapeHtml(value).replace(/\*\*(.*?)\*\*/g, '<strong class="self">$1</strong>');
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  function fmtDate(value, lang) {
    const [year, month, day] = value.split("-");
    if (!month) return year;
    return lang === "en"
      ? `${months[Number(month) - 1]}${day ? ` ${Number(day)},` : ""} ${year}`
      : `${year}.${month}${day ? `.${day}` : ""}`;
  }
  const newsId = (item, index) => item.id || `news-${index + 1}`;
  const externalLink = (url, ko, en, className = "cite") =>
    `<a class="${className}" href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer">${bi(ko, en)} ↗</a>`;
  const newsHeading = (item, level) => `<div class="news-heading">
    <h${level}${item.titleKo === item.titleEn ? ' lang="en"' : ""}>${bi(item.titleKo, item.titleEn)}</h${level}>
    ${item.subtitleKo || item.subtitleEn ? `<p class="news-event">${bi(item.subtitleKo, item.subtitleEn)}</p>` : ""}
  </div>`;

  // Month-only entries precede dated entries in the same month. The sort key
  // affects ordering only; displayed dates retain their original precision.
  const newsSortKey = (item) => item.date.length === 7 ? `${item.date}-99` : item.date;
  const news = [...(typeof NEWS !== "undefined" ? NEWS : [])]
    .sort((a, b) => newsSortKey(b).localeCompare(newsSortKey(a)));
  const preview = document.querySelector('[data-render="news-preview"]');
  if (preview) preview.innerHTML = news.slice(0, 3).map((item, index) => `
    <article class="news-card reveal">
      <div class="news-meta"><span class="tag">${bi(item.tagKo, item.tagEn)}</span>
        <time datetime="${escapeHtml(item.date)}">${bi(fmtDate(item.date, "ko"), fmtDate(item.date, "en"))}</time></div>
      ${newsHeading(item, 3)}<p class="news-body">${bi(item.bodyKo, item.bodyEn)}</p>
      <a class="news-link" href="news.html#${escapeHtml(newsId(item, index))}">${bi("자세히 보기", "Read more")} →</a>
    </article>`).join("");
  const fullNews = document.querySelector('[data-render="news-full"]');
  if (fullNews) fullNews.innerHTML = news.map((item, index) => `
    <article class="news-row reveal" id="${escapeHtml(newsId(item, index))}">
      <time class="news-date" datetime="${escapeHtml(item.date)}">${bi(fmtDate(item.date, "ko"), fmtDate(item.date, "en"))}</time>
      <div><div class="news-meta"><span class="tag">${bi(item.tagKo, item.tagEn)}</span></div>
        ${newsHeading(item, 2)}<p class="news-body">${bi(item.bodyKo, item.bodyEn)}</p>
        ${item.sourceUrl ? externalLink(item.sourceUrl, "관련 자료", "Source") : ""}
      </div>
    </article>`).join("");

  const publications = typeof PUBLICATIONS !== "undefined" ? PUBLICATIONS : [];
  // Some newly accepted papers are counted but announced only in News until
  // their full publication details are ready for the selected-paper list.
  const listedPublications = publications.filter((item) => item.showInPublications !== false);
  const patents = typeof PATENTS !== "undefined" ? PATENTS : [];
  const publicationList = document.querySelector('[data-render="pub-list"]');
  if (publicationList) {
    const years = [...new Set(listedPublications.map((item) => item.year))].sort((a, b) => b - a);
    publicationList.innerHTML = years.map((year) => `
      <section class="pub-year reveal" aria-label="${year}">
        <h3 class="pub-year-head"><span class="yr">${year}</span><span class="line"></span></h3>
        ${listedPublications.filter((item) => item.year === year).map((item) => {
          const noteKo = item.noteKo ?? item.note?.split(" · ")[0] ?? "";
          const noteEn = item.noteEn ?? item.note?.split(" · ")[1] ?? "";
          return `<article class="pub-item">
            <div class="pub-type">${bi(item.type === "journal" ? "학술지" : "학술대회", item.type === "journal" ? "Journal" : "Conference")}</div>
            <div><h4 class="pub-title">${bi(item.titleKo, item.titleEn || item.titleKo)}</h4>
              <p class="pub-authors">${fmtAuthors(item.authors)}</p>
              <div class="pub-venue"><span class="publication-venue-name">${escapeHtml(item.venue)}</span>
                <div class="publication-meta"><span class="tag publication-status">${item.status === "accepted" ? bi("채택", "Accepted") : bi("게재", "Published")}</span>
                  ${noteKo || noteEn ? `<span class="publication-note">${bi(noteKo, noteEn)}</span>` : ""}</div>
                ${externalLink(item.link, item.linkLabel || "논문", item.linkLabel || "Paper")}
              </div>
            </div>
          </article>`;
        }).join("")}
      </section>`).join("");
  }
  const acceptedCount = publications.filter((item) => item.status === "accepted").length;
  const figures = [
    [publications.length, "전체 논문(채택 포함)", "Papers (Including Accepted)"],
    [publications.length - acceptedCount, "게재 논문", "Published Papers"],
    [acceptedCount, "채택 논문", "Accepted Papers"],
    [patents.length, "연구 관련 등록 특허", "Research-Related Granted Patents"]
  ];
  document.querySelectorAll('[data-render="home-stats"], [data-render="pub-stats"]').forEach((el) => {
    const home = el.dataset.render === "home-stats";
    el.innerHTML = figures.map(([number, ko, en]) => `<div class="${home ? "stat-cell" : "pub-stat"}">
      <div class="${home ? "stat-num" : "num"}">${number}</div>
      <div class="${home ? "stat-label" : "lbl"}">${bi(ko, en)}</div></div>`).join("");
  });
  const patentList = document.querySelector('[data-render="patents"]');
  if (patentList) patentList.innerHTML = patents.map((item) => `
    <article class="patent-item reveal"><h3>${bi(item.titleKo, item.titleEn)}</h3>
      <p>${bi("등록번호", "Registration No.")} ${escapeHtml(item.no)} · ${bi("출원", "Filed")} ${escapeHtml(item.filed)} · ${bi("등록", "Granted")} ${escapeHtml(item.registered)}</p>
      <p>${bi("발명자", "Inventors")}: ${escapeHtml(item.inventors)}</p>
      ${item.link ? externalLink(item.link, "특허 공보", "Patent record") : ""}
    </article>`).join("");
  const projectList = document.querySelector('[data-render="projects"]');
  if (projectList && typeof PROJECTS !== "undefined") projectList.innerHTML = PROJECTS.map((item) => `
    <article class="project-item reveal"><h3>${bi(item.titleKo, item.titleEn)}</h3>
      <div class="period"><span class="period-label">${bi("개인 참여기간", "PI participation")}</span>${escapeHtml(item.period)}</div>
    </article>`).join("");
  function renderTimeline(selector, items) {
    const el = document.querySelector(selector);
    if (!el) return;
    el.innerHTML = items.map((item) => `<div class="timeline-item reveal">
      <div class="timeline-period">${bi(item.periodKo ?? item.period, item.periodEn ?? item.period)}</div>
      <div class="timeline-body"><h4>${bi(item.titleKo, item.titleEn)}</h4></div>
    </div>`).join("");
  }
  renderTimeline('[data-render="experience"]', typeof EXPERIENCE !== "undefined" ? EXPERIENCE : []);
  renderTimeline('[data-render="education"]', typeof EDUCATION !== "undefined" ? EDUCATION : []);
  const memberList = document.querySelector('[data-render="members"]');
  const members = typeof MEMBERS !== "undefined" ? MEMBERS : [];
  if (memberList) memberList.innerHTML = members.length ? members.map((item) => `
    <article class="member-card reveal">
      <div class="member-avatar">${item.photo ? `<img src="${escapeHtml(item.photo)}" alt="${escapeHtml(item.nameEn)}" loading="lazy">` : escapeHtml((item.nameKo || item.nameEn || "?").slice(0, 1))}</div>
      <h3${item.nameKo === item.nameEn ? ' lang="ko"' : ''}>${bi(item.nameKo, item.nameEn)}</h3><div class="m-role">${bi(item.roleKo, item.roleEn)}</div>
      ${item.departmentKo || item.departmentEn ? `<p class="m-department">${bi(item.departmentKo, item.departmentEn)}</p>` : ""}
      ${item.interestKo || item.interestEn ? `<p class="m-interest">${bi(item.interestKo, item.interestEn)}</p>` : ""}
      ${item.email ? `<a class="cite" href="mailto:${escapeHtml(item.email)}">${bi("이메일", "Email")}</a>` : ""}
    </article>`).join("") : `
    <div class="empty-state reveal">
      <h3>${bi("구성원 정보를 준비 중입니다", "Member profiles are being prepared")}</h3>
      <p>${bi("연구 참여에 관심이 있으시면 아래 모집 안내를 참고해 주세요.", "Please see the information below if you are interested in joining the lab.")}</p>
    </div>`;

  setLang(initialLang);
  // Observe after all content exists. CSS stays readable without this enhancement.
  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !reducedMotion.matches) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    revealEls.forEach((el) => observer.observe(el));
  } else revealEls.forEach((el) => el.classList.add("is-visible"));
})();
