/* =========================================================================
   시영과민수 — 구글 시트 실시간 연동
   -------------------------------------------------------------------------
   구글 스프레드시트의 값을 읽어 site-config.js 위에 덮어씁니다.
   · 시트를 고치고 사이트를 새로고침하면 바로 반영됩니다. (재배포 불필요)
   · 시트를 읽지 못하면 site-config.js 의 기본값이 그대로 쓰입니다.
   · 시트는 '링크가 있는 모든 사용자 · 뷰어'로 공유되어 있어야 읽을 수 있습니다.
   ========================================================================= */
(function () {
  "use strict";

  var SHEET = {
    id: "1Db2Zl-JH4MA8RLVC6tQpbZHfO5zUHA3VgbBZdUjIi00",
    tabs: {
      basic: "기본설정",
      products: "상품가격",
      portfolio: "포트폴리오",
      faq: "자주묻는질문",
    },
  };

  window.SITE_SHEET = SHEET;
  window.SM_SHEET_URL = SHEET.id
    ? "https://docs.google.com/spreadsheets/d/" + SHEET.id + "/edit"
    : "";
  window.SM_SHEET_ACTIVE = !!SHEET.id;

  /* 시트를 쓰지 않을 때는 아무 것도 하지 않습니다. */
  if (!SHEET.id) return;

  var seq = 0;

  /* ── gviz 응답 읽기 ─────────────────────────────────────────────── */
  function parseGviz(text) {
    var start = text.indexOf("{");
    var end = text.lastIndexOf("}");
    if (start < 0 || end <= start) throw new Error("unexpected sheet response");
    return JSON.parse(text.slice(start, end + 1));
  }

  function readTable(res) {
    var table = res && res.table;
    if (!table || !table.rows) throw new Error("no table in sheet response");
    return table.rows.map(function (row) {
      return (row.c || []).map(function (cell) {
        if (!cell) return "";
        if (cell.v === null || cell.v === undefined) return "";
        return cell.v;
      });
    });
  }

  /* CORS 없이 읽기 — gviz 응답을 script 로 받아 처리합니다. */
  function loadTabJsonp(name) {
    return new Promise(function (resolve, reject) {
      var cbName = "__smSheetCallback" + ++seq;
      var script = document.createElement("script");
      var timer = setTimeout(function () {
        finish(new Error("timeout"));
      }, 15000);

      function finish(err, value) {
        clearTimeout(timer);
        try {
          delete window[cbName];
        } catch (e) {
          window[cbName] = undefined;
        }
        if (script.parentNode) script.parentNode.removeChild(script);
        if (err) reject(err);
        else resolve(value);
      }

      window[cbName] = function (res) {
        finish(null, readTable(res));
      };
      script.onerror = function () {
        finish(new Error("network error"));
      };
      script.src =
        "https://docs.google.com/spreadsheets/d/" +
        SHEET.id +
        "/gviz/tq?tqx=out:json;responseHandler:" +
        cbName +
        "&sheet=" +
        encodeURIComponent(name) +
        "&headers=1";
      document.head.appendChild(script);
    });
  }

  function loadTab(name) {
    return loadTabJsonp(name);
  }

  /* ── 값 다루기 ──────────────────────────────────────────────────── */
  function str(value) {
    if (value === null || value === undefined) return "";
    if (typeof value === "number") return String(value);
    return String(value).trim();
  }

  function num(value) {
    if (value === null || value === undefined || value === "") return "";
    if (typeof value === "number") return value;
    var digits = String(value).replace(/[^\d]/g, "");
    return digits === "" ? "" : Number(digits);
  }

  function isOn(value) {
    var v = str(value).toLowerCase();
    if (v === "") return true;
    return ["y", "yes", "o", "ok", "true", "1", "예", "보임", "사용", "노출"].indexOf(v) >= 0;
  }

  function splitList(value) {
    return str(value)
      .split(/[|｜]/)
      .map(function (s) {
        return s.trim();
      })
      .filter(function (s) {
        return s !== "";
      });
  }

  function setPath(obj, path, value) {
    var keys = path.split(".");
    var cur = obj;
    for (var i = 0; i < keys.length - 1; i++) {
      var key = keys[i];
      var nextIsIndex = /^\d+$/.test(keys[i + 1]);
      if (cur[key] === null || cur[key] === undefined || typeof cur[key] !== "object") {
        cur[key] = nextIsIndex ? [] : {};
      }
      cur = cur[key];
    }
    cur[keys[keys.length - 1]] = value;
  }

  /* ── 구글 드라이브 사진 링크 → 바로 보이는 이미지 주소 ───────────── */
  var IMAGE_KEY = /(^|\.)(ogImage|image|imagePortrait|photo)$/i;

  function driveFileId(url) {
    var m = String(url).match(
      /drive\.google\.com\/(?:file\/d\/|open\?id=|uc\?(?:export=download&)?id=|thumbnail\?id=)([A-Za-z0-9_-]{10,})/
    );
    if (!m) m = String(url).match(/[?&]id=([A-Za-z0-9_-]{10,})/);
    return m ? m[1] : "";
  }

  function imageUrl(value, key) {
    var s = str(value);
    if (s === "") return "";
    var imageField = key === undefined || IMAGE_KEY.test(key);
    if (imageField && /^https?:\/\/(drive|docs)\.google\.com\//.test(s)) {
      var id = driveFileId(s);
      if (id) return "https://lh3.googleusercontent.com/d/" + id + "=w1600";
    }
    return s;
  }

  /* ── 기본설정 탭 ────────────────────────────────────────────────── */
  function applyBasic(rows, cfg) {
    var provided = {};
    rows.forEach(function (row) {
      var key = str(row[0]);
      if (!key || key.charAt(0) === "#") return;
      var value = row.length > 2 ? row[2] : "";
      provided[key] = true;
      if (key === "notice.enabled") {
        setPath(cfg, key, isOn(value));
        return;
      }
      if (typeof value === "number") {
        setPath(cfg, key, value);
        return;
      }
      setPath(cfg, key, imageUrl(value, key));
    });
    return provided;
  }

  /* 하단 SNS 링크는 '공식 링크' 값을 따라갑니다 (따로 적었으면 그 값을 사용). */
  function syncFooterLinks(cfg, provided) {
    var links = cfg.links || {};
    var footer = cfg.footer || (cfg.footer = {});
    var pairs = [
      ["store", "store"],
      ["instagram", "instagram"],
      ["instagramMood", "instagramMood"],
      ["blog", "blog"],
      ["youtube", "youtube"],
    ];
    pairs.forEach(function (pair) {
      var key = "footer." + pair[0];
      if (provided[key]) return;
      var value = links[pair[1]];
      if (value) footer[pair[0]] = value;
    });
  }

  /* ── 상품가격 탭 ────────────────────────────────────────────────── */
  function applyProducts(rows, cfg, data) {
    var plans = [];
    var dvdOptions = [];
    var moodProducts = [];
    var snapOptions = [];
    var snap = null;

    rows.forEach(function (row) {
      var cat = str(row[0]);
      if (!cat || cat.charAt(0) === "#") return;
      var item = {
        name: str(row[1]),
        sub: str(row[2]),
        price: num(row[3]),
        promo: str(row[4]),
        desc: str(row[5]),
        features: splitList(row[6]),
        badge: str(row[7]),
      };
      if (!isOn(row[8])) return;

      switch (cat) {
        case "본식DVD":
          if (item.name) plans.push(item);
          break;
        case "본식DVD옵션":
          if (item.name) dvdOptions.push(item);
          break;
        case "식전영상":
          if (item.name) moodProducts.push(item);
          break;
        case "아이폰스냅":
          snap = item;
          break;
        case "아이폰스냅옵션":
          if (item.name) snapOptions.push(item);
          break;
      }
    });

    if (plans.length) {
      cfg.services.dvd.plans = plans;
      data.plans = true;
    }
    if (dvdOptions.length) {
      data.dvdOptions = dvdOptions;
    }
    if (moodProducts.length) {
      cfg.services.mood.products = moodProducts.map(function (p) {
        return { name: p.name, price: p.price, note: p.promo };
      });
      data.mood = true;
    }
    if (snap) {
      if (snap.price !== "") cfg.services.snap.price = snap.price;
      if (snap.sub) cfg.services.snap.priceNote = snap.sub;
      if (snap.promo) cfg.services.snap.benefit = snap.promo;
    }
    if (snapOptions.length) {
      data.snapOptions = snapOptions;
    }
  }

  /* ── 포트폴리오 탭 ──────────────────────────────────────────────── */
  function applyPortfolio(rows, cfg, data) {
    var featured = null;
    var items = [];

    rows.forEach(function (row) {
      if (!isOn(row[0])) return;
      var cats = str(row[1])
        .split(/[\/／·,]/)
        .map(function (s) {
          return s.trim();
        })
        .filter(Boolean);
      var isFeatured = cats.some(function (c) {
        return c === "대표";
      });
      var item = {
        url: str(row[4]),
        photo: imageUrl(row[5], "photo"),
        title: str(row[2]),
        place: str(row[3]),
        tag: cats
          .filter(function (c) {
            return c !== "대표";
          })
          .join(" "),
      };
      if (!item.url && !item.photo) return;
      if (isFeatured && !featured) featured = item;
      else items.push(item);
    });

    if (!featured && !items.length) return;
    cfg.portfolio.featured = featured || {};
    cfg.portfolio.items = items;
    data.portfolio = true;
  }

  /* ── 자주묻는질문 탭 ────────────────────────────────────────────── */
  function applyFaq(rows, cfg, data) {
    var items = [];
    rows.forEach(function (row) {
      if (!isOn(row[0])) return;
      var q = str(row[1]);
      if (!q) return;
      items.push({ q: q, a: str(row[2]) });
    });
    if (!items.length) return;
    cfg.faq.items = items;
    data.faq = items;
  }

  /* ── 반영 ───────────────────────────────────────────────────────── */
  function apply(res) {
    var cfg = window.SITE_CONFIG || (window.SITE_CONFIG = {});
    ["services", "portfolio", "faq", "links", "footer"].forEach(function (key) {
      if (!cfg[key] || typeof cfg[key] !== "object") cfg[key] = {};
    });
    if (!cfg.services.dvd) cfg.services.dvd = {};
    if (!cfg.services.mood) cfg.services.mood = {};
    if (!cfg.services.snap) cfg.services.snap = {};

    var data = {};

    if (res.basic) {
      var provided = applyBasic(res.basic, cfg);
      syncFooterLinks(cfg, provided);
    }
    if (res.products) applyProducts(res.products, cfg, data);
    if (res.portfolio) applyPortfolio(res.portfolio, cfg, data);
    if (res.faq) applyFaq(res.faq, cfg, data);

    window.SM_SHEET_DATA = data;
    if (window.SM && typeof window.SM.refresh === "function") window.SM.refresh();
  }

  function load() {
    var tabs = SHEET.tabs;
    var jobs = [
      loadTab(tabs.basic).then(
        function (rows) {
          return { key: "basic", rows: rows };
        },
        function () {
          return null;
        }
      ),
      loadTab(tabs.products).then(
        function (rows) {
          return { key: "products", rows: rows };
        },
        function () {
          return null;
        }
      ),
      loadTab(tabs.portfolio).then(
        function (rows) {
          return { key: "portfolio", rows: rows };
        },
        function () {
          return null;
        }
      ),
      loadTab(tabs.faq).then(
        function (rows) {
          return { key: "faq", rows: rows };
        },
        function () {
          return null;
        }
      ),
    ];

    Promise.all(jobs).then(function (results) {
      var res = {};
      var loaded = 0;
      results.forEach(function (r) {
        if (!r) return;
        res[r.key] = r.rows;
        loaded++;
      });
      if (!loaded) return;
      try {
        apply(res);
      } catch (e) {
        /* 시트 값이 이상해도 사이트 기본값으로 계속 동작합니다. */
        if (window.console) console.warn("[sheet] 적용 실패", e);
      }
    });
  }

  /* ── '페이지 편집' 버튼은 시트로 안내 ───────────────────────────── */
  function prepareButton() {
    var btn = document.getElementById("edit-start");
    if (!btn || !window.SM_SHEET_URL) return;
    btn.textContent = "시트에서 수정";
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      window.open(window.SM_SHEET_URL, "_blank", "noopener");
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      prepareButton();
      load();
    });
  } else {
    prepareButton();
    load();
  }
})();
