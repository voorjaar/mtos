import { ResolvedScrollOptions } from "./types";

/** load dynamic script */
export function copyScript(fromEl: HTMLScriptElement, toEl: HTMLScriptElement) {
  const script = document.createElement("script");
  [...(toEl.attributes as unknown as Node[])].forEach((attr) =>
    script.setAttribute(attr.nodeName, attr.nodeValue as string)
  );

  script.innerHTML = toEl.innerHTML;
  fromEl.replaceWith(script);
  return script;
}

/** get page scroll position */
export function getScrollPosition() {
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

export function resolveScrollOptions(
  options?: ScrollOptions,
  config?: ScrollOptions
): ResolvedScrollOptions {
  return {
    enable: true,
    top: 0,
    left: 0,
    behavior: "smooth",
    ...config,
    ...options,
  };
}
