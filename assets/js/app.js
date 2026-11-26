/* =========================================================================
   시영과민수 — 사이트 동작
   site-config.js 의 값을 읽어 문구·가격·영상·링크를 그립니다.
   (설정을 고치면 이 파일은 건드릴 필요 없습니다.)
   ========================================================================= */
(function () {
  "use strict";

  function cfg() {
    return window.SITE_CONFIG || {};
  }

  /* ── 도우미 ─────────────────────────────────────────────────────── */
  function getPath(obj, path) {
    if (!path) return undefined;
    return path.split(".").reduce(function (acc, key) {
      if (acc === null || acc === undefined) return undefined;
      return acc[key];
    }, obj);
  }

  function formatWon(value) {
    if (typeof value === "number") {
      return value.toLocaleString("ko-KR") + "원";
    }
    if (typeof value === "string" && value.trim() !== "") {
      // "590000" 처럼 숫자만 적은 경우에도 쉼표를 붙여 줍니다.
      var digits = value.replace(/\s/g, "");
      if (/^\d+$/.test(digits)) {
        return Number(digits).toLocaleString("ko-KR") + "원";
      }
      return value;
    }
    return "";
  }

  function youtubeId(url) {
    if (!url) return "";
    var m = String(url).match(
      /(?:youtu\.be\/|youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|live\/))([A-Za-z0-9_-]{6,})/
    );
    if (m) return m[1];
    if (/^[A-Za-z0-9_-]{11}$/.test(String(url).trim())) return String(url).trim();
    return "";
  }

  function thumbUrl(id) {
    return "https://i.ytimg.com/vi/" + id + "/maxresdefault.jpg";
  }

  var SM = (window.SM = {
    getPath: getPath,
    formatWon: formatWon,
    youtubeId: youtubeId,
  });

  /* ── 문구 채우기 ────────────────────────────────────────────────── */
  function hydrate(root) {
    (root || document).querySelectorAll("[data-edit]").forEach(function (el) {
      var value = getPath(cfg(), el.getAttribute("data-edit"));
      if (value === undefined || value === null) return;
      var fmt = el.getAttribute("data-format");
      var text = fmt === "won" || fmt === "won-optional" ? formatWon(value) : String(value);
      if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
        el.value = text;
      } else {
        el.textContent = text;
      }
    });
  }

  /* ── 링크·이미지 반영 ───────────────────────────────────────────── */
  function applyAttrs() {
    // 일반 링크
    document.querySelectorAll("[data-href]").forEach(function (el) {
      var href = getPath(cfg(), el.getAttribute("data-href"));
      if (href) el.setAttribute("href", href);
    });

    // 전화 링크
    document.querySelectorAll("[data-tel]").forEach(function (el) {
      var tel = (getPath(cfg(), "footer.tel") || "").replace(/[^0-9]/g, "");
      if (tel) el.setAttribute("href", "tel:" + tel);
    });

    // 이미지 · 대체 텍스트
    document.querySelectorAll("[data-src-map]").forEach(function (el) {
      var src = getPath(cfg(), el.getAttribute("data-src-map"));
      if (src) {
        if (el.tagName === "SOURCE") {
          el.setAttribute("srcset", src);
          el.hidden = false;
        } else if (el.tagName === "IMG") {
          el.setAttribute("src", src);
          el.hidden = false;
        }
      }
    });
    document.querySelectorAll("[data-alt-map]").forEach(function (el) {
      var alt = getPath(cfg(), el.getAttribute("data-alt-map"));
      if (alt) el.setAttribute("alt", alt);
    });

    // 히어로 대표 영상 링크
    document.querySelectorAll("[data-video-link]").forEach(function (el) {
      var url = getPath(cfg(), el.getAttribute("data-video-link"));
      if (url) {
        el.setAttribute("href", url);
        el.setAttribute("target", "_blank");
        el.setAttribute("rel", "noopener");
        var id = youtubeId(url);
        if (id) el.setAttribute("data-video", id);
      }
    });

    // 사진이 비어 있는 서비스는 글자 패널로
    document.querySelectorAll("[data-media-if]").forEach(function (figure) {
      var src = getPath(cfg(), figure.getAttribute("data-media-if"));
      var img = figure.querySelector("img");
      var empty = figure.querySelector(".service__media--empty");
      if (src) {
        if (empty) empty.style.display = "none";
        if (img) {
          img.hidden = false;
          img.setAttribute("src", src);
        }
      } else {
        if (empty) empty.style.display = "";
        if (img) img.hidden = true;
      }
    });

    // 문의 채널 (주소가 비어 있으면 숨김)
    var contact = cfg().contact || {};
    (contact.channels || []).forEach(function (ch, i) {
      var el = document.querySelector('[data-channel="' + i + '"]');
      if (!el) return;
      if (ch.href) {
        el.hidden = false;
        el.setAttribute("href", ch.href);
        if (/^https?:/.test(ch.href)) {
          el.setAttribute("target", "_blank");
          el.setAttribute("rel", "noopener");
        } else {
          el.removeAttribute("target");
        }
      } else {
        el.hidden = true;
      }
    });

    // 추천 배지가 비면 강조 카드 해제
    document.querySelectorAll("[data-featured-if]").forEach(function (card) {
      var badge = getPath(cfg(), card.getAttribute("data-featured-if"));
      card.classList.toggle("plan--featured", !!badge);
    });

    // 공지 배너
    var notice = document.getElementById("notice-bar");
    if (notice) {
      var n = cfg().notice || {};
      var dismissed = false;
      try {
        dismissed = sessionStorage.getItem("sm_notice_closed") === "1";
      } catch (e) {}
      notice.hidden = !n.enabled || !n.text || dismissed;
    }

    // 페이지 제목 · 설명 · 공유 이미지
    var meta = cfg().meta;
    if (meta) {
      if (meta.title) document.title = meta.title;
      var d = document.querySelector('meta[name="description"]');
      if (d && meta.description) d.setAttribute("content", meta.description);
      var og = document.querySelector('meta[property="og:title"]');
      if (og && meta.title) og.setAttribute("content", meta.title);
      var ogd = document.querySelector('meta[property="og:description"]');
      if (ogd && meta.description) ogd.setAttribute("content", meta.description);
      var ogi = document.querySelector('meta[property="og:image"]');
      if (ogi && meta.ogImage) ogi.setAttribute("content", meta.ogImage);
    }
  }

  /* ── 포트폴리오 카드 ───────────────────────────────────────────── */
  function videoCard(item, opts) {
    opts = opts || {};
    var path = opts.path;
    var id = youtubeId(item.url);
    var card = document.createElement("div");
    card.className = "video";
    card.setAttribute("role", "button");
    card.setAttribute("tabindex", "0");
    card.setAttribute("aria-label", (item.title || "영상") + " 재생");
    if (id) card.setAttribute("data-video", id);

    var thumb = id
      ? '<img src="' + thumbUrl(id) + '" alt="' + (item.place || item.title || "영상") +
        ' 썸네일" loading="lazy" onerror="this.onerror=null;this.src=\'https://i.ytimg.com/vi/' + id + '/hqdefault.jpg\'">'
      : "";

    var tag = item.tag
      ? '<span class="video__tag" data-edit="' + path + '.tag">' + item.tag + "</span>"
      : "";

    card.innerHTML =
      thumb +
      '<span class="video__play" aria-hidden="true"><svg viewBox="0 0 12 14"><path d="M0 0l12 7-12 7z"/></svg></span>' +
      '<span class="video__caption">' +
      "<span>" +
      '<h3 data-edit="' + path + '.title">' + (item.title || "") + "</h3>" +
      '<p data-edit="' + path + '.place">' + (item.place || "") + "</p>" +
      "</span>" +
      tag +
      "</span>";

    card.addEventListener("click", function (e) {
      if (document.body.classList.contains("is-editing")) return;
      if (e.target.closest && e.target.closest("input, [contenteditable]")) return;
      if (!id) return;
      openLightbox(id);
    });
    card.addEventListener("keydown", function (e) {
      if (document.body.classList.contains("is-editing")) return;
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        if (id) openLightbox(id);
      }
    });
    return card;
  }

  function renderPortfolio() {
    var featuredWrap = document.getElementById("portfolio-featured");
    var gridWrap = document.getElementById("portfolio-grid");
    if (!featuredWrap || !gridWrap) return;
    var p = cfg().portfolio || {};

    featuredWrap.innerHTML = "";
    if (p.featured && p.featured.url) {
      featuredWrap.removeAttribute("hidden");
      featuredWrap.appendChild(videoCard(p.featured, { path: "portfolio.featured" }));
    } else {
      featuredWrap.setAttribute("hidden", "");
    }

    gridWrap.innerHTML = "";
    (p.items || []).forEach(function (item, i) {
      if (!item || !item.url) return;
      gridWrap.appendChild(videoCard(item, { path: "portfolio.items." + i }));
    });
  }
  SM.hydrate = hydrate;
  SM.applyAttrs = applyAttrs;
  SM.renderPortfolio = renderPortfolio;

  /* ── 라이트박스 ────────────────────────────────────────────────── */
  var lightbox = document.getElementById("lightbox");
  var lightboxFrame = document.getElementById("lightbox-frame");
  var lastFocus = null;

  function openLightbox(id) {
    if (!lightbox || !lightboxFrame) return;
    lastFocus = document.activeElement;
    lightboxFrame.innerHTML =
      '<iframe src="https://www.youtube-nocookie.com/embed/' +
      id +
      '?autoplay=1&rel=0&modestbranding=1" title="영상 재생" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>';
    lightbox.classList.add("is-open");
    document.body.style.overflow = "hidden";
    var closeBtn = document.getElementById("lightbox-close");
    if (closeBtn) closeBtn.focus();
  }
  SM.openLightbox = openLightbox;

  function closeLightbox() {
    if (!lightbox || !lightbox.classList.contains("is-open")) return;
    lightbox.classList.remove("is-open");
    lightboxFrame.innerHTML = "";
    document.body.style.overflow = "";
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  /* ── 이벤트 ────────────────────────────────────────────────────── */
  function bind() {
    var closeBtn = document.getElementById("lightbox-close");
    if (closeBtn) closeBtn.addEventListener("click", closeLightbox);
    if (lightbox) {
      lightbox.addEventListener("click", function (e) {
        if (e.target === lightbox) closeLightbox();
      });
    }
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        closeLightbox();
        document.body.classList.remove("nav-open");
      }
    });

    // 대표 영상 링크는 사이트 안에서 재생
    document.querySelectorAll("[data-video-link]").forEach(function (el) {
      el.addEventListener("click", function (e) {
        if (document.body.classList.contains("is-editing")) return;
        var id = el.getAttribute("data-video");
        if (id) {
          e.preventDefault();
          openLightbox(id);
        }
      });
    });

    // 모바일 메뉴
    var menuToggle = document.getElementById("menu-toggle");
    var mobileNav = document.getElementById("mobile-nav");
    if (menuToggle) {
      menuToggle.addEventListener("click", function () {
        var open = document.body.classList.toggle("nav-open");
        menuToggle.setAttribute("aria-expanded", open ? "true" : "false");
        if (mobileNav) mobileNav.setAttribute("aria-hidden", open ? "false" : "true");
      });
    }
    if (mobileNav) {
      mobileNav.querySelectorAll("a").forEach(function (a) {
        a.addEventListener("click", function () {
          document.body.classList.remove("nav-open");
          if (menuToggle) menuToggle.setAttribute("aria-expanded", "false");
          if (mobileNav) mobileNav.setAttribute("aria-hidden", "true");
        });
      });
    }

    // 공지 닫기
    var noticeClose = document.getElementById("notice-close");
    if (noticeClose) {
      noticeClose.addEventListener("click", function () {
        var bar = document.getElementById("notice-bar");
        if (bar) bar.hidden = true;
        try {
          sessionStorage.setItem("sm_notice_closed", "1");
        } catch (e) {}
      });
    }

    // 헤더 스크롤 상태
    var header = document.getElementById("site-header");
    var onScroll = function () {
      if (header) header.classList.toggle("is-scrolled", window.scrollY > 12);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    // 스크롤 등장
    var reveals = document.querySelectorAll(".reveal");
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-in");
              io.unobserve(entry.target);
            }
          });
        },
        { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
      );
      reveals.forEach(function (el) {
        io.observe(el);
      });
    } else {
      reveals.forEach(function (el) {
        el.classList.add("is-in");
      });
    }

    // FAQ 한 번에 하나만 열기
    var faqItems = document.querySelectorAll(".faq__item");
    faqItems.forEach(function (item) {
      item.addEventListener("toggle", function () {
        if (!item.open) return;
        faqItems.forEach(function (other) {
          if (other !== item) other.open = false;
        });
      });
    });
  }

  /* ── 시작 ──────────────────────────────────────────────────────── */
  function init() {
    hydrate();
    applyAttrs();
    renderPortfolio();
    bind();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
