# mtos

<p align="left">
  <a href="https://www.npmjs.com/package/mtos"><img src="https://img.shields.io/npm/v/mtos.svg?color=0EA5E9" alt="Npm Version"></a>
  <a href="https://www.npmjs.com/package/mtos"><img src="https://img.shields.io/bundlephobia/min/mtos" alt="Minified Size"></a>
  <a href="https://www.npmjs.com/package/mtos"><img src="https://img.shields.io/npm/dt/mtos.svg?color=1388bd" alt="Total Downloads"></a>
</p>

Gives MPA a SPA-like user experience with no refreshing and incremenal loading.

## Getting Started

### Install

```sh
npm install --save-dev mtos
```

### CDN

#### IIFE

```html
<script src="https://cdn.jsdelivr.net/npm/mtos@0.3.0/dist/mtos-iife.min.js"></script>
```

#### UMD

```html
<script src="https://cdn.jsdelivr.net/npm/mtos@0.3.0/dist/mtos-umd.min.js"></script>
```

#### ESM

```html
<script
  type="module"
  src="https://cdn.jsdelivr.net/npm/mtos@0.3.0/dist/mtos-esm.js"
></script>
```

### Static

You can copy the scripts in the [dist](https://github.com/voorjaar/mtos/blob/main/dist/) folder directly to your web server static folder.

Recommendations:

- [mtos-iife.min.js](https://github.com/voorjaar/mtos/blob/main/dist/mtos-iife.min.js)
- [mtos-umd.min.js](https://github.com/voorjaar/mtos/blob/main/dist/mtos-umd.min.js)

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

### `useFilter`

Replace default filter, check if link is internal link, if `true` enable [mtos](https://www.npmjs.com/package/mtos), if `false` ignore this link. By default, the function is `check`.

#### Type

```typescript
type Filter = (a: HTMLAnchorElement) => boolean;
function useFilter(f: Filter): void;
```

#### Example

```typescript
mtos.useFilter(({ href }) => href.endsWith("abc"));
```

### `useRequest`

Set the [fetch](https://developer.mozilla.org/en-US/docs/Web/API/fetch) request options.

#### Type

```typescript
function useRequest(init?: RequestInit | undefined): void;
```

#### Example

```typescript
mtos.useRequest({
  headers: {
    Cookie: "xxx=yyy",
  },
  credentials: "same-origin",
});
```

### `mtos`

Main function, add `onclick` property to all internal link elements.

```typescript
function mtos(): void;
```

## How It Works

Mtos works similar to SPA, but is based on native dom. The workflow like this:

1. Query all `<a>` elements which property `href` includes current host.
2. Add a `onclick` function, when clicked, fetch the html content from target link.
3. Diff current document with fetched content, update changed elements.
4. Goto 1.

## Use Cases

- Enhance traditional **Multi Page Application**, so that pages do not need to be refreshed for a **better user experience** and no changes to the project structure are required.

- Enhance **Static Site Generators** to give the original multi-page architecture a SPA-like experience.

- Creating simple websites using just html can be used to replace the **SPA + SSR architecture** in many simple cases.

## TODOs

- fix: restore scrolling position when go back
- feat: support animation between pages
- feat: support diff root elements that not head and body
- feat: support filer target link
- feat: support onMount, onUnmount, ...hooks
- feat: support fetch hook, enable request with cookie
- feat: support update part of elements, like htmx

## License

[MIT](https://github.com/voorjaar/mtos/blob/main/LICENSE)

Copyright (c) 2022, Raven Satir
