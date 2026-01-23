document.addEventListener("DOMContentLoaded", () => {
  const track = document.getElementById("track");
  const bubbleLayer = document.getElementById("bubbleLayer");

  // Popup elements
  const popup = document.getElementById("popup");
  const popupDim = document.getElementById("popupDim");
  const popupFrame = document.getElementById("popupFrame");
  const popupClose = document.getElementById("popupClose");

  const TOTAL = 15;
  const MAIN_IDX = 0;
  const FIN_IDX = 14;

  let current = 0;
  let locked = false;

  // ✅ 팝업 열기 전 포커스 저장
  let lastFocusedEl = null;

  const bubbleSets = {
    [MAIN_IDX]: [
      { src: "images/main_01.png", x: "29.43%", y: "15.01%" },
      { src: "images/main_02.png", x: "53.72%", y: "20.82%" },
      { src: "images/main_03.png", x: "58.28%", y: "15.54%" },
      { src: "images/main_05.png", x: "30.50%", y: "39.59%" },
      { src: "images/main_06.png", x: "67.73%", y: "72.32%" },
      { src: "images/main_08.png", x: "8.44%", y: "92.15%" },
    ],
    [FIN_IDX]: [
      { src: "images/main_01.png", x: "29.43%", y: "15.01%" },
      { src: "images/fin_02.png", x: "53.72%", y: "20.82%" },
      { src: "images/main_03.png", x: "58.28%", y: "15.54%" },
      { src: "images/fin_02.png", x: "30.50%", y: "39.59%" },
      { src: "images/main_06.png", x: "67.73%", y: "72.32%" },
      { src: "images/main_08.png", x: "8.44%", y: "92.15%" },
    ],
  };

  // =========================
  // Bubble
  // =========================
  function hideBubbles() {
    if (!bubbleLayer) return;
    bubbleLayer.classList.remove("show");
    bubbleLayer.classList.remove("float");
  }

  function clearBubbles() {
    if (!bubbleLayer) return;
    bubbleLayer.innerHTML = "";
  }

  function renderBubbles(idx) {
    if (!bubbleLayer) return;
    bubbleLayer.innerHTML = "";

    const list = bubbleSets[idx];
    if (!list) return;

    list.forEach((b, i) => {
      const el = document.createElement("div");
      el.className = "bubble";
      el.style.left = b.x;
      el.style.top = b.y;

      const amp = (18 + Math.random() * 14).toFixed(1) + "px";
      const t = (6.4 + Math.random() * 1.8).toFixed(2) + "s";
      const d = (-Math.random() * 2.0).toFixed(2) + "s";
      el.style.setProperty("--amp", amp);
      el.style.setProperty("--t", t);
      el.style.setProperty("--d", d);

      const easings = ["ease-in-out", "ease-in", "ease-out"];
      el.style.animationTimingFunction = easings[i % easings.length];

      const img = document.createElement("img");
      img.src = b.src;
      img.alt = "bubble";
      el.appendChild(img);

      bubbleLayer.appendChild(el);
    });
  }

  function showBubblesNow(idx) {
    if (!bubbleLayer) return;

    if (!bubbleSets[idx]) {
      clearBubbles();
      hideBubbles();
      return;
    }

    renderBubbles(idx);
    bubbleLayer.classList.add("float");
    requestAnimationFrame(() => bubbleLayer.classList.add("show"));
  }

  // =========================
  // Popup (show 클래스로 토글 + no-scroll 적용)
  // =========================
  function hasPopupUI() {
    return popup && popupDim && popupFrame;
  }

  function isPopupOpen() {
    return hasPopupUI() && popup.classList.contains("show");
  }

  function openPopup(url) {
    if (!hasPopupUI() || !url) return;

    // ✅ 포커스 저장
    lastFocusedEl = document.activeElement;

    // ✅ 구슬 숨기기
    hideBubbles();

    // ✅ iframe 로드
    popupFrame.src = url;

    // ✅ show로 열기
    popup.classList.add("show");
    popupDim.classList.add("show");
    popup.setAttribute("aria-hidden", "false");
    popupDim.setAttribute("aria-hidden", "false");

    // ✅ 뒤 스크롤 잠금
    document.documentElement.classList.add("no-scroll");
    document.body.classList.add("no-scroll");

    if (popupClose) popupClose.focus();
  }

  // ✅ restoreBubbles 옵션 추가 (뒤로가기/이동 시 깜빡임 방지)
  function closePopup({ restoreBubbles = true, returnFocus = true } = {}) {
    if (!hasPopupUI()) return;

    // ✅ show로 닫기
    popup.classList.remove("show");
    popupDim.classList.remove("show");
    popup.setAttribute("aria-hidden", "true");
    popupDim.setAttribute("aria-hidden", "true");

    // ✅ 뒤 스크롤 해제
    document.documentElement.classList.remove("no-scroll");
    document.body.classList.remove("no-scroll");

    // ✅ iframe 비우기
    popupFrame.src = "";

    // ✅ 구슬 복구(옵션)
    if (restoreBubbles) showBubblesNow(current);

    // ✅ 포커스 복귀(옵션)
    if (returnFocus && lastFocusedEl && typeof lastFocusedEl.focus === "function") {
      lastFocusedEl.focus();
      lastFocusedEl = null;
    }
  }

  if (popupClose) popupClose.addEventListener("click", () => closePopup());
  if (popupDim) popupDim.addEventListener("click", () => closePopup());

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && isPopupOpen()) closePopup();
  });

  // =========================
  // Slide navigation
  // =========================
  function go(idx, withAnim = true, push = true) {
    if (locked) return;
    if (idx < 0 || idx >= TOTAL) return;
    if (idx === current) return;

    // ✅ 팝업 열려있으면 먼저 닫고(구슬 복구는 안 함)
    if (isPopupOpen()) closePopup({ restoreBubbles: false, returnFocus: false });

    locked = true;
    current = idx;

    hideBubbles();

    track.style.transition = withAnim ? "transform 0.6s ease-in-out" : "none";
    track.style.transform = `translateX(${-100 * idx}vw)`;

    if (push) history.pushState({ idx }, "", `#p${idx}`);

    const after = () => {
      if (!isPopupOpen()) showBubblesNow(idx);
    };

    if (!withAnim) {
      after();
      locked = false;
      return;
    }

    let done = false;
    const onEnd = (e) => {
      if (done) return;
      if (e.target !== track || e.propertyName !== "transform") return;
      done = true;
      track.removeEventListener("transitionend", onEnd);
      after();
    };

    track.addEventListener("transitionend", onEnd);

    setTimeout(() => {
      if (done) return;
      done = true;
      track.removeEventListener("transitionend", onEnd);
      after();
    }, 800);

    setTimeout(() => (locked = false), 650);
  }

  function initFromHash() {
    const m = (location.hash || "").match(/^#p(\d+)$/);
    const idx = m ? Math.max(0, Math.min(TOTAL - 1, Number(m[1]))) : 0;

    current = idx;

    track.style.transition = "none";
    track.style.transform = `translateX(${-100 * idx}vw)`;

    history.replaceState({ idx }, "", `#p${idx}`);

    hideBubbles();
    showBubblesNow(current);
    locked = false;
  }

  window.addEventListener("popstate", (e) => {
    // ✅ 뒤로가기 때 팝업이 열려있으면: 구슬 복구 없이 닫기(깜빡임 방지)
    if (isPopupOpen()) closePopup({ restoreBubbles: false, returnFocus: false });

    const idx = e.state?.idx;
    if (typeof idx === "number") return go(idx, true, false);

    const m = (location.hash || "").match(/^#p(\d+)$/);
    if (m) go(Number(m[1]), true, false);
  });

  // =========================
  // Image map responsive
  // =========================
  function makeMapResponsive(img) {
    const usemap = img.getAttribute("usemap");
    if (!usemap) return;

    const mapName = usemap.replace("#", "");
    const map = document.querySelector(`map[name="${mapName}"]`);
    if (!map) return;

    const areas = map.querySelectorAll("area");
    areas.forEach((a) => {
      if (!a.dataset.origCoords) a.dataset.origCoords = a.coords;
    });

    const recalc = () => {
      const nw = img.naturalWidth,
        nh = img.naturalHeight;
      const cw = img.clientWidth,
        ch = img.clientHeight;
      if (!nw || !nh || !cw || !ch) return;

      const scale = Math.max(cw / nw, ch / nh);
      const displayedW = nw * scale;
      const displayedH = nh * scale;
      const offsetX = (displayedW - cw) / 2;
      const offsetY = (displayedH - ch) / 2;

      areas.forEach((a) => {
        const o = a.dataset.origCoords.split(",").map(Number);

        let x1 = o[0] * scale - offsetX;
        let y1 = o[1] * scale - offsetY;
        let x2 = o[2] * scale - offsetX;
        let y2 = o[3] * scale - offsetY;

        x1 = Math.max(0, Math.min(cw, x1));
        x2 = Math.max(0, Math.min(cw, x2));
        y1 = Math.max(0, Math.min(ch, y1));
        y2 = Math.max(0, Math.min(ch, y2));

        a.coords = [x1, y1, x2, y2].map((v) => Math.round(v)).join(",");
      });
    };

    if (img.complete) recalc();
    img.addEventListener("load", recalc);
    window.addEventListener("resize", recalc);

    if ("ResizeObserver" in window) {
      const ro = new ResizeObserver(recalc);
      ro.observe(img);
    }
  }

  document.querySelectorAll("img[usemap]").forEach(makeMapResponsive);

  // =========================
  // Area click (go/stay + popup)
  // =========================
  document.querySelectorAll("map area").forEach((area) => {
    area.addEventListener("click", (e) => {
      const popupUrl = area.dataset.popup;
      if (popupUrl) {
        e.preventDefault();
        openPopup(popupUrl);
        return;
      }

      const href = area.getAttribute("href") || "";

      const m = href.match(/^#go(\d+)$/);
      if (m) {
        e.preventDefault();
        return go(Number(m[1]), true, true);
      }

      const s = href.match(/^#stay(\d+)$/);
      if (s) {
        e.preventDefault();
        const target = Number(s[1]);
        if (target === current) return;
        return go(target, false, true);
      }
    });
  });

  // =========================
  // Wheel navigation
  // =========================
  window.addEventListener(
    "wheel",
    (e) => {
      if (isPopupOpen()) return;
      if (locked) return;

      if (e.deltaY > 0 && current < TOTAL - 1) go(current + 1, true, true);
      if (e.deltaY < 0 && current > 0) go(current - 1, true, true);
    },
    { passive: true }
  );

  initFromHash();
});
