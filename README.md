# mtos

<p align="left">
  <a href="https://www.npmjs.com/package/mtos"><img src="https://img.shields.io/npm/v/mtos.svg?color=0EA5E9" alt="Npm Version"></a>
  <a href="https://www.npmjs.com/package/mtos"><img src="https://img.shields.io/bundlephobia/min/mtos" alt="Minified Size"></a>
  <a href="https://www.npmjs.com/package/mtos"><img src="https://img.shields.io/npm/dt/mtos.svg?color=1388bd" alt="Total Downloads"></a>
</p>

Gives MPA a SPA-like user experience with no refreshing and incremenal loading.

![Demo](https://github.com/voorjaar/mtos/blob/main/demo/record.gif)

## Getting Started

### Install

```sh
npm install --save-dev mtos
```

### CDN

#### IIFE

```html
<script src="https://cdn.jsdelivr.net/npm/mtos@0.7.0/dist/mtos-iife.min.js"></script>
```

#### UMD

```html
<script src="https://cdn.jsdelivr.net/npm/mtos@0.7.0/dist/mtos-umd.min.js"></script>
```

#### ESM

```html
<script
  type="module"
  src="https://cdn.jsdelivr.net/npm/mtos@0.7.0/dist/mtos-esm.js"
></script>
```

### Static

#### Copy

You can copy the scripts in the [dist](https://github.com/voorjaar/mtos/blob/main/dist/) folder directly to your web server static folder.

Recommendations:

- [mtos-iife.min.js](https://github.com/voorjaar/mtos/blob/main/dist/mtos-iife.min.js)
- [mtos-umd.min.js](https://github.com/voorjaar/mtos/blob/main/dist/mtos-umd.min.js)

#### Download

You can also download the script using npm.

```sh
npm pack mtos
tar -xzf mtos-0.7.0.tgz
mv package/dist/mtos-iife.min.js .
rm -r mtos-0.7.0.tgz package
```

## API

### `goto`

Goto target href.

#### Type

```typescript
function goto(href: string, push?: boolean): boolean;
```

#### Example

```typescript
mtos.goto("/blog/1");
```

### `check`

Check if link is internal link.

#### Type

```typescript
function check(a: HTMLAnchorElement): boolean;
```

#### Example

```typescript
mtos.check("https://localhost:5050/blog/1"); // true
```

### `setup`

Setup [mtos](https://www.npmjs.com/package/mtos) with user configuration.

#### Type

```typescript
interface Config {
  /** Fetch Options */
  fetch?: RequestInit;

  /** Auto Scroll Behavior */
  scroll?: {
    enable?: boolean;
    left?: number;
    top?: number;
    behavior?: "auto" | "smooth";
  };

  /** Fetch Hooks */
  onMatch: (a: HTMLAnchorElement) => boolean;
  onFetchStart?(href: string): boolean | undefined | void;
  onFetchEnd?: (html: string, href: string) => string | undefined | void;
  onFetchError?: (error: Error, href: string) => void;

  /** Render Hooks */
  onBeforePageRendered?: (href: string) => void;
  onPageRendered?: (href: string) => void;

  /** Dom Patch Hooks */
  getNodeKey?: (node: Node) => any;
  onBeforeNodeAdded?: (node: Node) => Node;
  onNodeAdded?: (node: Node) => Node;
  onBeforeElUpdated?: (fromEl: HTMLElement, toEl: HTMLElement) => boolean;
  onElUpdated?: (el: HTMLElement) => void;
  onBeforeNodeDiscarded?: (node: Node) => boolean;
  onNodeDiscarded?: (node: Node) => void;
  onBeforeElChildrenUpdated?: (
    fromEl: HTMLElement,
    toEl: HTMLElement
  ) => boolean;
}

function setup(userConfig: Config): void;
```

#### Example

- Use New Match Function

  Replace default match function, check if link is internal link, if `true` enable [mtos](https://www.npmjs.com/package/mtos), if `false` ignore this link. By default, the function is `check`.

  ```typescript
  mtos.setup({
    onMatch({ host, href }) {
      return !href.endsWith("refresh") && host === window.location.host;
    },
  });
  ```

- Use Fetch Options

  Setup the [fetch](https://developer.mozilla.org/en-US/docs/Web/API/fetch) request options.

  ```typescript
  mtos.setup({
    fetch: {
      headers: {
        Cookie: "xxx=yyy",
      },
      credentials: "same-origin",
    },
  });
  ```

- Use Hooks

  Use patch hooks to enable transition animation.

  ```typescript
  mtos.setup({
    onBeforeElUpdated(fromEl, toEl) {
      if (toEl.tagName === "MAIN") {
        toEl.classList.add("animated", "fadeIn");
      }
    },
    onElUpdated(el) {
      if (el.tagName === "MAIN") {
        setTimeout(() => {
          el.classList.remove("animated", "fadeIn");
        }, 500);
      }
    },
  });
  ```

- Life Cycle

  Using life cycle hooks to update progress.

  ```typescript
  mtos.setup({
    onFetchStart() {
      updateProgress(0);
    },
    onFetchEnd() {
      updateProgress(60);
    },
    onBeforePageRendered() {
      updateProgress(80);
    },
    onPageRendered() {
      updateProgress(100);
    },
  });
  ```

### `mtos`

Main function, add `onclick` property to all matched link elements.

```typescript
function mtos(): void;
```

## How It Works

Mtos works similar to SPA, but is based on native dom. The workflow like this:

1. Query all `<a>` elements which property `href` includes current host.
2. Add a `onclick` function, when clicked, fetch the html content from target link.
3. Push link to [history](https://developer.mozilla.org/en-US/docs/Web/API/History_API) state.
4. Diff current document with fetched content, update changed elements.
5. Goto 1.

## Use Cases

- Enhance traditional **Multi Page Application**, so that pages do not need to be refreshed for a **better user experience** and no changes to the project structure are required.

- Enhance **Static Site Generators** to give the original multi-page architecture a SPA-like experience.

- Creating simple websites using just html can be used to replace the **SPA + SSR architecture** in many simple cases.

## TODOs

- fix: eval script block
- feat: support diff root elements that not head and body
- feat: cache page when hover link (optional)
- feat: support update part of elements, like htmx
- ~~fix: restore scrolling position when go back~~
- ~~feat: support animation between pages~~
- ~~feat: support filer target link~~
- ~~feat: support onMount, onUnmount, ...hooks~~
- ~~feat: support fetch hook, enable request with cookie~~

## License

[MIT](https://github.com/voorjaar/mtos/blob/main/LICENSE)

Copyright (c) 2022, Raven Satir
