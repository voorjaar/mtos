export interface Hooks {
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

export type Filter = (a: HTMLAnchorElement) => boolean;

export type ScrollOptions = { enable?: boolean } & ScrollToOptions;

export type Config = Hooks & {
  filter?: Filter;
  fetch?: RequestInit;
  scroll?: ScrollOptions;
};
