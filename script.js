// script.js
document.addEventListener("DOMContentLoaded", () => {
  const track = document.getElementById("track");
  const bubbleLayer = document.getElementById("bubbleLayer");

  const TOTAL = 15;
  const MAIN_IDX = 0;
  const FIN_IDX = 14;

  let current = 0;
  let locked = false;

  // ✅ main(0), fin(14)만 구슬 세트 유지
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

      // ✅ 둥둥 랜덤값(원래 너 코드 그대로 느낌)
      const amp = (18 + Math.random() * 14).toFixed(1) + "px"; // 18~32
      const t = (6.4 + Math.random() * 1.8).toFixed(2) + "s"; // 6.4~8.2
      const d = (-Math.random() * 2.0).toFixed(2) + "s"; // -0~-2.0
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

    // ✅ 0,14만 구슬+둥둥 / 나머진 아예 없음
    if (!bubbleSets[idx]) {
      clearBubbles();
      hideBubbles();
      return;
    }

    renderBubbles(idx);

    // ✅ main & fin에서 둥둥 ON
    bubbleLayer.classList.add("float");

    requestAnimationFrame(() => bubbleLayer.classList.add("show"));
  }

  function go(idx, withAnim = true, push = true) {
    if (locked) return;
    if (idx < 0 || idx >= TOTAL) return;
    if (idx === current) return;

    locked = true;
    current = idx;

    // 이동 중엔 구슬 숨김(잔상 방지)
    hideBubbles();

    track.style.transition = withAnim ? "transform 0.6s ease-in-out" : "none";
    track.style.transform = `translateX(${-100 * idx}vw)`;

    if (push) history.pushState({ idx }, "", `#p${idx}`);

    const after = () => {
      showBubblesNow(idx);
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
    const idx = e.state?.idx;
    if (typeof idx === "number") return go(idx, true, false);

    const m = (location.hash || "").match(/^#p(\d+)$/);
    if (m) go(Number(m[1]), true, false);
  });

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

  document.querySelectorAll("map area").forEach((area) => {
    area.addEventListener("click", (e) => {
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

  window.addEventListener(
    "wheel",
    (e) => {
      if (locked) return;
      if (e.deltaY > 0 && current < TOTAL - 1) go(current + 1, true, true);
      if (e.deltaY < 0 && current > 0) go(current - 1, true, true);
    },
    { passive: true }
  );

  initFromHash();
});
