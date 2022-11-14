import morphdom from "morphdom";
import { copyScript, getScrollPosition, resolveScrollOptions } from "./utils";
import type { Config, ResolvedConfig, GotoOptions } from "./types";

const scrollPositions: {
  top: number;
  left: number;
}[] = [];

var config: ResolvedConfig = resolveConfig();
var currentLocation = window.location.href;

export function check({ href, target, host }: HTMLAnchorElement) {
  return (
    host === window.location.host &&
    href.split("#")[0] !== currentLocation.split("#")[0] &&
    (target === "" || target === "_self")
  );
}

export function resolveConfig(userConfig: Config = {}): ResolvedConfig {
  return {
    ...userConfig,
    onMatch: userConfig.onMatch || check,
    scroll: resolveScrollOptions(userConfig.scroll),
    onNodeAdded(node: Node) {
      if (node.nodeName === "SCRIPT")
        node = copyScript(node as HTMLScriptElement, node as HTMLScriptElement);
      return userConfig.onNodeAdded?.(node) || node;
    },
    onBeforeElUpdated(fromEl: HTMLElement, toEl: HTMLElement) {
      return fromEl.nodeName === "SCRIPT" && toEl.nodeName === "SCRIPT"
        ? copyScript(fromEl as HTMLScriptElement, toEl as HTMLScriptElement) &&
            false
        : userConfig.onBeforeElUpdated?.(fromEl, toEl) || true;
    },
  };
}

export function setup(userConfig?: Config) {
  config = resolveConfig(userConfig);
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

      head && morphdom(document.head, head, config);
      body && morphdom(document.body, body, config);

      config.onPageRendered?.(href);

      const scrollOptions = resolveScrollOptions(options.scroll, config.scroll);
      scrollOptions.enable && window.scrollTo(scrollOptions);

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
      scroll: resolveScrollOptions({
        behavior: "auto",
        ...scrollPositions.pop(),
      }),
    });
});
