export declare type Filter = (a: HTMLAnchorElement) => boolean;
export declare function check({ href, target, host }: HTMLAnchorElement): boolean;
export declare function useFilter(f: Filter): void;
export declare function useRequest(init?: RequestInit | undefined): void;
export declare function goto(href: string, push?: boolean): boolean;
export declare function mtos(): void;
