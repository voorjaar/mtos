interface Hooks {
    getNodeKey?: (node: Node) => any;
    onBeforeNodeAdded?: (node: Node) => Node;
    onNodeAdded?: (node: Node) => Node;
    onBeforeElUpdated?: (fromEl: HTMLElement, toEl: HTMLElement) => boolean;
    onElUpdated?: (el: HTMLElement) => void;
    onBeforeNodeDiscarded?: (node: Node) => boolean;
    onNodeDiscarded?: (node: Node) => void;
    onBeforeElChildrenUpdated?: (fromEl: HTMLElement, toEl: HTMLElement) => boolean;
}
declare type Filter = (a: HTMLAnchorElement) => boolean;

declare function check({ href, target, host }: HTMLAnchorElement): boolean;
declare function useFilter(f: Filter): void;
declare function useRequest(init?: RequestInit | undefined): void;
declare function useHooks(hooks: Hooks): void;
declare function goto(href: string, push?: boolean): boolean;
declare function mtos(): void;

export { check, goto, mtos, useFilter, useHooks, useRequest };
