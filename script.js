// script.js
document.addEventListener("DOMContentLoaded", () => {
  const track = document.getElementById("track");
  const bubbleLayer = document.getElementById("bubbleLayer");
  const TOTAL = 15;
  const PROFILE_IDX = 9;
  const MYSELF01_IDX = 10;
  const MYSELF02_IDX = 11;
  const MYSELF03_IDX = 12;
  const MYSELF04_IDX = 13;
  const FIN_IDX = 14;

  let current = 0;
  let locked = false;

  const bubbleSets = {
    0: [
      { src: "images/main_01.png", x: "29.43%", y: "15.01%" },
      { src: "images/main_02.png", x: "53.72%", y: "20.82%" },
      { src: "images/main_03.png", x: "58.28%", y: "15.54%" },
      { src: "images/main_05.png", x: "30.50%", y: "39.59%" },
      { src: "images/main_06.png", x: "67.73%", y: "72.32%" },
      { src: "images/main_08.png", x: "8.44%", y: "92.15%" },
    ],

    1: [
      { src: "images/sub_style_01.png", x: "13.33%", y: "26.26%" },
      { src: "images/sub_style_02.png", x: "25.99%", y: "40.59%" },
      { src: "images/sub_style_03.png", x: "17.99%", y: "69.30%" },
      { src: "images/sub_style_04.png", x: "74.25%", y: "32.22%" },
      { src: "images/sub_style_05.png", x: "90.52%", y: "27.46%" },
      { src: "images/sub_style_06.png", x: "82.86%", y: "71.13%" },
    ],

    2: [
      { src: "images/sub_style_01.png", x: "24.01%", y: "28.27%" },
      { src: "images/sub_style_02.png", x: "9.69%", y: "74.00%" },
      { src: "images/sub_style_03.png", x: "25.16%", y: "63.41%" },
      { src: "images/sub_style_04.png", x: "73.20%", y: "31.34%" },
      { src: "images/sub_style_06.png", x: "88.49%", y: "34.73%" },
      { src: "images/sub_style_05.png", x: "77.24%", y: "65.69%" },
    ],

    3: [
      { src: "images/sub_style_01.png", x: "14.09%", y: "29.85%" },
      { src: "images/sub_style_02.png", x: "30.50%", y: "42.76%" },
      { src: "images/sub_style_03.png", x: "14.81%", y: "68.12%" },
      { src: "images/sub_style_06.png", x: "73.45%", y: "28.08%" },
      { src: "images/sub_style_05.png", x: "87.92%", y: "36.04%" },
      { src: "images/sub_style_04.png", x: "67.99%", y: "67.09%" },
    ],

    4: [
      { src: "images/sub_style_01.png", x: "21.50%", y: "26.50%" },
      { src: "images/sub_style_02.png", x: "14.24%", y: "69.77%" },
      { src: "images/sub_style_03.png", x: "31.48%", y: "48.74%" },
      { src: "images/sub_style_05.png", x: "73.50%", y: "27.00%" },
      { src: "images/sub_style_04.png", x: "88.96%", y: "37.41%" },
      { src: "images/sub_style_06.png", x: "78.00%", y: "72.00%" },
    ],

    5: [
      { src: "images/sub_style_01.png", x: "12.50%", y: "28.50%" },
      { src: "images/sub_style_03.png", x: "28.75%", y: "53.98%" },
      { src: "images/sub_style_02.png", x: "13.50%", y: "73.50%" },
      { src: "images/sub_style_04.png", x: "69.00%", y: "30.00%" },
      { src: "images/sub_style_06.png", x: "88.50%", y: "33.50%" },
      { src: "images/sub_style_05.png", x: "69.50%", y: "69.50%" },
    ],

    6: [
      { src: "images/sub_style_01.png", x: "16.50%", y: "27.00%" },
      { src: "images/sub_style_02.png", x: "34.00%", y: "36.00%" },
      { src: "images/sub_style_03.png", x: "22.00%", y: "68.50%" },
      { src: "images/sub_style_05.png", x: "71.50%", y: "28.50%" },
      { src: "images/sub_style_04.png", x: "86.33%", y: "30.54%" },
      { src: "images/sub_style_06.png", x: "78.50%", y: "72.50%" },
    ],

    7: [
      { src: "images/sub_style_01.png", x: "12.95%", y: "27.56%" },
      { src: "images/sub_style_02.png", x: "28.33%", y: "52.82%" },
      { src: "images/sub_style_03.png", x: "23.00%", y: "66.50%" },
      { src: "images/sub_style_04.png", x: "85.26%", y: "63.83%" },
      { src: "images/sub_style_05.png", x: "87.79%", y: "36.30%" },
      { src: "images/sub_style_06.png", x: "71.35%", y: "72.00%" },
    ],

    8: [
      { src: "images/sub_style_01.png", x: "29.01%", y: "54.08%" },
      { src: "images/sub_style_02.png", x: "11.53%", y: "67.00%" },
      { src: "images/sub_style_03.png", x: "22.14%", y: "29.02%" },
      { src: "images/sub_style_04.png", x: "68.05%", y: "69.60%" },
      { src: "images/sub_style_05.png", x: "89.87%", y: "65.20%" },
      { src: "images/sub_style_06.png", x: "75.05%", y: "28.87%" },
    ],

    [PROFILE_IDX]: [
      { src: "images/sub_style_03.png", x: "10.47%", y: "23.01%" },
      { src: "images/sub_style_02.png", x: "31.56%", y: "30.18%" },
      { src: "images/sub_style_01.png", x: "28.56%", y: "74.12%" },
      { src: "images/sub_style_05.png", x: "54.95%", y: "61.92%" },
      { src: "images/sub_style_06.png", x: "83.83%", y: "30.65%" },
      { src: "images/sub_style_04.png", x: "84.58%", y: "73.64%" },
    ],

    [MYSELF01_IDX]: [
      { src: "images/sub_style_01.png", x: "33.59%", y: "32.58%" },
      { src: "images/sub_style_03.png", x: "9.35%", y: "79.56%" },
    ],

    [MYSELF02_IDX]: [
      { src: "images/sub_style_01.png", x: "29.38%", y: "32.58%" },
      { src: "images/sub_style_03.png", x: "43.39%", y: "37.60%" },
      { src: "images/sub_style_02.png", x: "43.39%", y: "67.73%" },
      { src: "images/sub_style_05.png", x: "89.84%", y: "62.60%" },
    ],

    [MYSELF03_IDX]: [
      { src: "images/sub_style_02.png", x: "27.76%", y: "47.40%" },
      { src: "images/sub_style_04.png", x: "72.08%", y: "46.86%" },
      { src: "images/sub_style_05.png", x: "92.79%", y: "80.44%" },
    ],

    [MYSELF04_IDX]: [
      { src: "images/sub_style_01.png", x: "41.03%", y: "27.09%" },
      { src: "images/sub_style_03.png", x: "31.64%", y: "37.02%" },
      { src: "images/sub_style_02.png", x: "44.19%", y: "53.66%" },
      { src: "images/sub_style_04.png", x: "85.94%", y: "22.36%" },
      { src: "images/sub_style_05.png", x: "89.84%", y: "62.86%" },
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

    if (!bubbleSets[idx]) {
      clearBubbles();
      hideBubbles();
      return;
    }

    renderBubbles(idx);
    requestAnimationFrame(() => bubbleLayer.classList.add("show"));
  }

  function go(idx, withAnim = true, push = true) {
    if (locked) return;
    if (idx < 0 || idx >= TOTAL) return;
    if (idx === current) return;

    locked = true;

    document.body.classList.add("is-sliding");
    hideBubbles();

    current = idx;

    track.style.transition = withAnim ? "transform 0.6s ease-in-out" : "none";
    track.style.transform = `translateX(${-100 * idx}vw)`;

    if (push) history.pushState({ idx }, "", `#p${idx}`);

    const after = () => {
      document.body.classList.remove("is-sliding");
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

    document.body.classList.remove("is-sliding");
    hideBubbles();
    showBubblesNow(current);
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
