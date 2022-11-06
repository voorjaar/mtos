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
  filter: check,
  scroll: defaultScrollOptions,
};

var config: ResolvedConfig = defaultConfig;

export function check({ href, target, host }: HTMLAnchorElement) {
  return (
    host === window.location.host &&
    href.split("#")[0] !== window.location.href.split("#")[0] &&
    (target === "" || target === "_self")
  );
}

export function setup(userConfig: Config) {
  config = { ...defaultConfig, ...userConfig };
}

export function goto(href: string, options: GotoOptions = {}) {
  fetch(href, config.fetch)
    .then((response) => response.text())
    .then((html) => {
      const box = document.createElement("html");
      box.innerHTML = html;

      if (options.pushState !== false) {
        scrollPositions.push({
          top: document.body.scrollTop,
          left: document.body.scrollLeft,
        });

        history.pushState(
          {},
          document.head.querySelector("title")?.innerText || "Document",
          href
        );
      }

      const head = box.querySelector("head");
      const body = box.querySelector("body");

      head && morphdom(document.head, head);
      body && morphdom(document.body, body, config);

      const scrollOptions = options.scroll || config.scroll;
      scrollOptions?.enable && window.scrollTo(scrollOptions);

      mtos();
    });

  return false;
}

export function mtos() {
  document.querySelectorAll("a").forEach((a) => {
    // a.addEventListener("mouseover", () => {
    // TODO: maybe cache html when hover link
    //   console.log("entered");
    // });
    if (config.filter!(a))
      a.onclick = () => {
        //   console.log(old);
        //   if (old) old();
        return goto(a.href);
      };
  });
}

window.addEventListener("load", mtos);

window.addEventListener("popstate", () => {
  goto(document.location.href, {
    pushState: false,
    scroll: {
      enable: true,
      behavior: "auto",
      ...(scrollPositions.pop() || { top: 0, left: 0 }),
    },
  });
});
