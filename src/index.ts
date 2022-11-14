import morphdom from "morphdom";
import type {
  Config,
  ResolvedConfig,
  ScrollOptions,
  GotoOptions,
} from "./types";

const defaultScrollOptions: ScrollOptions = {
  enable: true,
  top: 0,
  left: 0,
  behavior: "smooth",
};

const scrollPositions: {
  top: number;
  left: number;
}[] = [];

const defaultConfig = {
  onMatch: check,
  scroll: defaultScrollOptions,
};

var config: ResolvedConfig = defaultConfig;
var currentLocation = window.location.href;

export function check({ href, target, host }: HTMLAnchorElement) {
  return (
    host === window.location.host &&
    href.split("#")[0] !== currentLocation.split("#")[0] &&
    (target === "" || target === "_self")
  );
}

export function setup(userConfig: Config = {}) {
  config = { ...defaultConfig, ...userConfig };
}

function getScrollPosition() {
  if (window.pageYOffset != null)
    return { left: window.pageXOffset, top: window.pageYOffset };
  const d = document,
    r = d.documentElement,
    b = d.body;
  return {
    left: r.scrollLeft || b.scrollLeft || 0,
    top: r.scrollTop || b.scrollTop || 0,
  };
}

export function goto(href: string, options: GotoOptions = {}) {
  if (config.onFetchStart?.(href) === false) return;

  fetch(href, config.fetch)
    .then((response) => response.text())
    .then((html) => {
      const box = document.createElement("html");
      box.innerHTML = config.onFetchEnd?.(html, href) || html;

      currentLocation = href;

      if (options.pushState !== false) {
        scrollPositions.push(getScrollPosition());

        history.pushState(
          {},
          document.head.querySelector("title")?.innerText || "Document",
          href
        );
      }

      config.onBeforePageRendered?.(href);

      const head = box.querySelector("head");
      const body = box.querySelector("body");

      head && morphdom(document.head, head);
      body && morphdom(document.body, body, config);

      config.onPageRendered?.(href);

      const scrollOptions = options.scroll || config.scroll;
      scrollOptions?.enable && window.scrollTo(scrollOptions);

      mtos();
    })
    .catch((e: Error) => config.onFetchError?.(e, href));

  return false;
}

export function mtos() {
  document.querySelectorAll("a").forEach((a) => {
    // a.addEventListener("mouseover", () => {
    // TODO: maybe cache html when hover link
    //   console.log("entered");
    // });
    if (config.onMatch!(a))
      a.onclick = () => {
        //   console.log(old);
        //   if (old) old();
        return goto(a.href);
      };
  });
}

export * from "./types";

window.addEventListener("load", mtos);

window.addEventListener("popstate", () => {
  const a = document.createElement("a");
  a.href = window.location.href;
  if (config.onMatch!(a))
    goto(document.location.href, {
      pushState: false,
      scroll: {
        enable: true,
        behavior: "auto",
        ...(scrollPositions.pop() || { top: 0, left: 0 }),
      },
    });
});
