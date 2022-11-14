export interface Hooks {
  /** Called when matching `<a>` element, if return false, the link will be ignore. By default, the value is `check` */
  onMatch?(a: HTMLAnchorElement): boolean;
  /** Called before fetch the href, if return false, the link won't be rendered. */
  onFetchStart?(href: string): boolean | undefined | void;
  /** Called after fetch the html content, you can return a string to preprocess it before rendering */
  onFetchEnd?: (html: string, href: string) => string | undefined | void;
  /** Called when fetch api throw an error */
  onFetchError?: (error: Error, href: string) => void;
  /** Called before render the fetched page. */
  onBeforePageRendered?: (href: string) => void;
  /** Called after page has been rendered. */
  onPageRendered?: (href: string) => void;
  /** Called to get the Node's unique identifier. This is used by morphdom to rearrange elements rather than creating and destroying an element that already exists. This defaults to using the Node's id property. (Note that form fields must not have a name corresponding to forms' DOM properties, e.g. id.) */
  getNodeKey?: (node: Node) => any;
  /** Called before a Node in the to tree is added to the from tree. If this function returns false then the node will not be added. Should return the node to be added. */
  onBeforeNodeAdded?: (node: Node) => Node;
  /** Called after a Node in the to tree has been added to the from tree. */
  onNodeAdded?: (node: Node) => Node;
  /** Called before a HTMLElement in the from tree is updated. If this function returns false then the element will not be updated. */
  onBeforeElUpdated?: (fromEl: HTMLElement, toEl: HTMLElement) => boolean;
  /** Called after a HTMLElement in the from tree has been updated. */
  onElUpdated?: (el: HTMLElement) => void;
  /** Called before a Node in the from tree is discarded. If this function returns false then the node will not be discarded. */
  onBeforeNodeDiscarded?: (node: Node) => boolean;
  /** Called after a Node in the from tree has been discarded. */
  onNodeDiscarded?: (node: Node) => void;
  /** Called before the children of a HTMLElement in the from tree are updated. If this function returns false then the child nodes will not be updated. */
  onBeforeElChildrenUpdated?: (
    fromEl: HTMLElement,
    toEl: HTMLElement
  ) => boolean;
}

export type ScrollOptions = { enable?: boolean } & ScrollToOptions;

export type ResolvedScrollOptions = Required<ScrollOptions>;

export type GotoOptions = {
  pushState?: boolean;
  scroll?: ScrollOptions;
};

export type ResolvedConfig = Hooks & {
  fetch?: RequestInit;
  scroll: ResolvedScrollOptions;
};

export type Config = Partial<ResolvedConfig>;
