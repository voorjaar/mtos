export interface Hooks {
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

export type Filter = (a: HTMLAnchorElement) => boolean;
