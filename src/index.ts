import morphdom from "morphdom";
import type { Config } from "./types";

var config: Config = {
  filter: check,
};

export function check({ href, target, host }: HTMLAnchorElement) {
  return (
    host === window.location.host &&
    href.split("#")[0] !== window.location.href.split("#")[0] &&
    (target === "" || target === "_self")
  );
}

export function setup(userConfig: Config) {
  config = userConfig;
}

export function goto(href: string, push = true) {
  fetch(href, config.fetch)
    .then((response) => response.text())
    .then((html) => {
      const box = document.createElement("html");
      box.innerHTML = html;

      if (push)
        history.pushState(
          {},
          document.head.querySelector("title")?.innerText || "Document",
          href
        );

      const head = box.querySelector("head");
      const body = box.querySelector("body");

      const scrollOptions = config.scroll || {
        enable: true,
        top: 0,
        left: 0,
        behavior: "smooth",
      };

      scrollOptions?.enable && window.scrollTo(scrollOptions);

      head && morphdom(document.head, head);
      body && morphdom(document.body, body, config);

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

window.addEventListener("popstate", (event) => {
  //   console.log(event.state);
  goto(document.location.href, false);
});
