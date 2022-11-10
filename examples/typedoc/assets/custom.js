function updateProgress(/** @type {number} */ n) {
  const bar = document.querySelector(".progress-bar");
  if (!bar) return;
  bar.style.width = n + "%";
}

function loadProgress(n = 0) {
  const header = document.querySelector("header");
  if (!header) return;
  const bar = document.createElement("div");
  bar.classList.add("progress");

  const p = document.createElement("div");
  p.classList.add("progress-bar");
  p.style.width = n + "%";

  bar.appendChild(p);
  header.appendChild(bar);

  setTimeout(() => {
    updateProgress(100);
  }, 150);
}

window.addEventListener("load", loadProgress);

mtos.setup({
  onBeforeElUpdated(fromEl, /** @type {HTMLDivElement} */ toEl) {
    if (toEl.tagName === "DIV" && toEl.classList.contains("col-content")) {
      toEl.classList.add("animated", "fadeIn");
    }
  },
  onElUpdated(/** @type {HTMLDivElement} */ el) {
    if (el.tagName === "DIV" && el.classList.contains("col-content")) {
      setTimeout(() => {
        el.classList.remove("animated", "fadeIn");
      }, 250);
    }
  },
  onFetchStart() {
    updateProgress(0);
  },
  onFetchEnd() {
    updateProgress(30);
  },
  onPageRendered() {
    loadProgress(30);
  },
});
