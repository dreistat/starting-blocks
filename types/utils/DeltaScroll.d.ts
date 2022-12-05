interface DeltaScrollOptions {
    wait?: number;
    onUpdate?: (delta?: number) => void;
}
export default class DeltaScroll {
    private options;
    private lastScrollTop;
    private _handleScroll;
    constructor(options?: DeltaScrollOptions);
    private init;
    destroy(): void;
    private initEvents;
    private destroyEvents;
    handleScroll: () => void;
}
export {};
//# sourceMappingURL=DeltaScroll.d.ts.map