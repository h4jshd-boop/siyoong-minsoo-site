/* =========================================================================
   시영과민수 — 간편 편집 모드
   · 주소 뒤에 ?edit=1 을 붙이거나, 페이지 맨 아래 "페이지 편집"을 누르면 켜집니다.
   · 화면의 문구·가격·유튜브 주소를 그 자리에서 고칠 수 있습니다.
   · 고친 내용은 이 브라우저에 임시 저장되고, 아래 버튼으로 site-config.js
     파일을 내려받아 사이트 폴더의 같은 파일에 덮어쓰면 반영됩니다.
   · 일반 방문자에게는 이 기능이 전혀 보이지 않습니다.
   ========================================================================= */
(function () {
  "use strict";

  /* 구글 시트로 운영 중이면 이 화면 편집 대신 시트에서 고칩니다. */
  if (window.SM_SHEET_ACTIVE) return;

  var STORE_KEY = "sm_site_draft_v1";
  var siteOriginal = JSON.parse(JSON.stringify(window.SITE_CONFIG || {}));
  var originalJson = JSON.stringify(siteOriginal);
  var draft = JSON.parse(originalJson);
  var editing = false;
  var saveTimer = null;
  var bar = null;

  /* ── 도우미 ─────────────────────────────────────────────────────── */
  function hash(str) {
    var h = 5381;
    for (var i = 0; i < str.length; i++) {
      h = ((h << 5) + h + str.charCodeAt(i)) | 0;
    }
    return String(h);
  }

  function getPath(obj, path) {
    return path.split(".").reduce(function (acc, key) {
      return acc === null || acc === undefined ? undefined : acc[key];
    }, obj);
  }

  function setPath(obj, path, value) {
    var keys = path.split(".");
    var last = keys.pop();
    var target = keys.reduce(function (acc, key) {
      if (acc[key] === null || acc[key] === undefined || typeof acc[key] !== "object") {
        acc[key] = /^\d+$/.test(key) ? [] : {};
      }
      return acc[key];
    }, obj);
    target[last] = value;
  }

  function save() {
    if (saveTimer) clearTimeout(saveTimer);
    saveTimer = setTimeout(function () {
      try {
        localStorage.setItem(
          STORE_KEY,
          JSON.stringify({ base: hash(originalJson), data: draft })
        );
        setHint("임시 저장됨 — 아래 버튼으로 파일을 내려받아 주세요");
      } catch (e) {
        setHint("이 브라우저에서는 임시 저장이 되지 않습니다");
      }
    }, 400);
  }

  function loadStored() {
    try {
      var raw = localStorage.getItem(STORE_KEY);
      if (!raw) return false;
      var parsed = JSON.parse(raw);
      // 사이트의 site-config.js 가 바뀐 뒤라면 예전 임시 저장은 버립니다.
      if (!parsed || parsed.base !== hash(originalJson)) {
        localStorage.removeItem(STORE_KEY);
        return false;
      }
      draft = parsed.data;
      return true;
    } catch (e) {
      return false;
    }
  }

  function setHint(text) {
    var el = document.querySelector(".edit-bar__hint");
    if (el) el.textContent = text;
  }

  /* ── 편집 가능하게 만들기 ───────────────────────────────────────── */
  function decorate() {
    document.querySelectorAll("[data-edit]").forEach(function (el) {
      if (el.closest(".edit-bar")) return;

      // 여러 줄 문구는 그대로 줄바꿈을 유지합니다.
      var multi =
        el.classList.contains("hero__desc") ||
        el.classList.contains("intro__statement") ||
        el.getAttribute("data-edit").indexOf("desc") > -1;

      if (el.dataset.editReady === "1") return;
      el.dataset.editReady = "1";
      try {
        el.contentEditable = multi ? "plaintext-only" : "plaintext-only";
        if (el.contentEditable !== "plaintext-only") el.contentEditable = "true";
      } catch (e) {
        el.contentEditable = "true";
      }
      el.spellcheck = false;

      el.addEventListener("input", function () {
        commit(el);
        // 가격 칸은 입력 중에는 그대로 두고, 포커스를 잃을 때 정리합니다.
      });

      el.addEventListener("blur", function () {
        commit(el);
        var value = getPath(draft, el.getAttribute("data-edit"));
        var fmt = el.getAttribute("data-format");
        if (fmt === "won" || fmt === "won-optional") {
          el.textContent = window.SM.formatWon(value);
        }
      });

      el.addEventListener("keydown", function (e) {
        if (e.key === "Enter" && !e.shiftKey && el.tagName !== "P" && el.tagName !== "DIV") {
          e.preventDefault();
          el.blur();
        }
      });
    });
    addUrlInputs();
  }

  function commit(el) {
    var path = el.getAttribute("data-edit");
    var fmt = el.getAttribute("data-format");
    var text = (el.innerText || "")
      .replace(/\u00a0/g, " ")
      .replace(/\s+$/, "");
    var value = text;

    if (fmt === "won" || fmt === "won-optional") {
      var digits = text.replace(/[,\s원]/g, "");
      if (digits === "") value = "";
      else if (/^\d+$/.test(digits)) value = Number(digits);
      else value = text;
    }
    setPath(draft, path, value);
    save();
  }

  /* ── 유튜브 주소 입력칸 ─────────────────────────────────────────── */
  function addUrlInputs() {
    document.querySelectorAll(".video").forEach(function (card) {
      if (card.querySelector(".edit-url")) return;
      var titleEl = card.querySelector('[data-edit$=".title"]');
      if (!titleEl) return;
      var base = titleEl.getAttribute("data-edit").replace(/\.title$/, "");

      var field = document.createElement("input");
      field.type = "url";
      field.className = "edit-url";
      field.value = getPath(draft, base + ".url") || "";
      field.setAttribute("aria-label", "유튜브 주소");
      field.addEventListener("change", function () {
        setPath(draft, base + ".url", field.value.trim());
        save();
        window.SM.renderPortfolio();
        decorate();
      });
      card.appendChild(field);
    });
  }

  /* ── 파일로 내려받기 ───────────────────────────────────────────── */
  var NOTES = {
    meta: "검색·공유 미리보기 (title / description / ogImage)",
    brand: "브랜드 이름과 슬로건",
    notice: "상단 공지 배너 (enabled: false 로 끄기)",
    nav: "상단 메뉴",
    hero: "첫 화면",
    intro: "소개 문장",
    services: "서비스와 상품 단가 (price 는 숫자만)",
    portfolio: "포트폴리오 (url 에 유튜브 주소를 넣으면 썸네일·재생 자동 연결)",
    process: "진행 과정",
    assurance: "짧은 약속 4가지",
    faq: "자주 묻는 질문",
    contact: "문의 채널 (href 가 비면 그 버튼은 사이트에서 숨겨집니다)",
    footer: "하단 사업자 정보",
  };

  var HEAD = [
    "/* =========================================================================",
    "   시영과민수 (SIYOUNG & MINSOO) 공식 사이트 — 설정 파일",
    "   -------------------------------------------------------------------------",
    "   · 글자만 바꿀 때 : 따옴표(\" \") 안의 내용만 바꾸세요.",
    "   · 가격을 바꿀 때 : 390000 처럼 숫자만 씁니다. (쉼표·\"원\" 은 사이트가 붙여 줍니다)",
    "   · 영상을 바꿀 때 : url 에 유튜브 주소를 붙여넣으면 썸네일·재생이 자동으로 연결됩니다.",
    "   · 저장 후 브라우저를 새로고침하면 바로 반영됩니다.",
    "   · 이 파일은 페이지 편집(?edit=1) 화면에서 내려받은 것입니다.",
    "   ========================================================================= */",
    "",
  ].join("\n");

  function buildConfigFile(data) {
    var out = [HEAD, "window.SITE_CONFIG = {"];
    Object.keys(data).forEach(function (key, index) {
      var note = NOTES[key] || key;
      var line = "  /* ── " + note + " ";
      while (line.length < 74) line += "─";
      line += " */";
      var json = JSON.stringify(data[key], null, 2)
        .replace(/^(\s*)"([A-Za-z_][A-Za-z0-9_]*)":/gm, "$1$2:")
        .split("\n")
        .join("\n  ");
      out.push("");
      out.push(line);
      out.push("  " + key + ": " + json + (index === Object.keys(data).length - 1 ? "" : ","));
    });
    out.push("};");
    out.push("");
    return out.join("\n");
  }

  function download() {
    var text = buildConfigFile(draft);
    var blob = new Blob([text], { type: "text/javascript;charset=utf-8" });
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url;
    a.download = "site-config.js";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(function () {
      URL.revokeObjectURL(url);
    }, 4000);
    setHint("내려받았습니다 → 사이트 폴더의 site-config.js 에 덮어쓰세요");
  }

  /* ── 편집 바 ───────────────────────────────────────────────────── */
  function mountBar() {
    if (bar) return;
    bar = document.createElement("div");
    bar.className = "edit-bar";
    bar.setAttribute("role", "toolbar");
    bar.setAttribute("aria-label", "페이지 편집 도구");
    bar.innerHTML =
      '<span class="edit-bar__hint">문구·가격을 눌러 바로 고치세요</span>' +
      '<button type="button" class="edit-bar__btn" data-act="reset">원래대로</button>' +
      '<button type="button" class="edit-bar__btn edit-bar__btn--primary" data-act="download">site-config.js 내려받기</button>' +
      '<button type="button" class="edit-bar__btn" data-act="exit">나가기</button>';
    document.body.appendChild(bar);

    var flag = document.createElement("div");
    flag.className = "edit-flag";
    flag.textContent = "EDIT MODE";
    document.body.appendChild(flag);

    bar.addEventListener("click", function (e) {
      var btn = e.target.closest("[data-act]");
      if (!btn) return;
      var act = btn.getAttribute("data-act");
      if (act === "download") download();
      if (act === "exit") exit();
      if (act === "reset") {
        if (!confirm("내려받지 않은 수정 내용이 모두 사라집니다. 되돌릴까요?")) return;
        try {
          localStorage.removeItem(STORE_KEY);
        } catch (err) {}
        draft = JSON.parse(originalJson);
        window.SITE_CONFIG = draft;
        window.SM.hydrate();
        window.SM.applyAttrs();
        window.SM.renderPortfolio();
        decorate();
        setHint("처음 상태로 되돌렸습니다");
      }
    });
  }

  function uneditable() {
    document.querySelectorAll("[data-edit]").forEach(function (el) {
      el.removeAttribute("contenteditable");
      delete el.dataset.editReady;
      el.blur();
    });
    document.querySelectorAll(".edit-url").forEach(function (el) {
      el.remove();
    });
  }

  /* ── 시작 / 종료 ───────────────────────────────────────────────── */
  function start() {
    if (editing) return;
    editing = true;
    var restored = loadStored();
    document.body.classList.add("is-editing");
    window.SITE_CONFIG = draft;
    window.SM.hydrate();
    window.SM.applyAttrs();
    window.SM.renderPortfolio();
    decorate();
    mountBar();
    setHint(
      restored
        ? "이 브라우저에 저장된 수정 내용을 불러왔습니다"
        : "문구·가격을 눌러 바로 고치세요"
    );
    if (!/[?&]edit=1/.test(location.search)) {
      try {
        var url = new URL(location.href);
        url.searchParams.set("edit", "1");
        history.replaceState(null, "", url.toString());
      } catch (e) {}
    }
  }

  function exit() {
    uneditable();
    editing = false;
    document.body.classList.remove("is-editing");
    if (bar) {
      bar.remove();
      bar = null;
    }
    var flag = document.querySelector(".edit-flag");
    if (flag) flag.remove();
    try {
      var url = new URL(location.href);
      url.searchParams.delete("edit");
      location.href = url.toString();
    } catch (e) {
      location.reload();
    }
  }

  /* ── 이벤트 ───────────────────────────────────────────────────── */
  document.addEventListener("click", function (e) {
    if (!editing) return;
    var a = e.target.closest("a");
    if (a && !a.closest(".edit-bar")) {
      e.preventDefault();
    }
  }, true);

  window.SM_EDIT = { start: start, exit: exit, buildConfigFile: buildConfigFile, get draft() { return draft; } };

  function boot() {
    var startBtn = document.getElementById("edit-start");
    if (startBtn) startBtn.addEventListener("click", start);
    if (/[?&]edit=1\b/.test(location.search)) start();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
