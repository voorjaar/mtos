import morphdom from "morphdom";

export function goto(href: string, push = true) {
  fetch(href)
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

      head && morphdom(document.head, head);
      body && morphdom(document.body, body);

      m2s();
    });

  return false;
}

export function m2s() {
  document.querySelectorAll("a").forEach((a) => {
    // a.addEventListener("mouseover", () => {
    // TODO: maybe cache html when hover link
    //   console.log("entered");
    // });
    a.onclick = () => {
      //   console.log(old);
      //   if (old) old();
      return goto(a.href);
    };
  });
}

window.addEventListener("load", m2s);

window.addEventListener("popstate", (event) => {
  //   console.log(event.state);
  goto(document.location.href, false);
});
