import AbstractBlock from './AbstractBlock';
export default class AbstractInViewBlock extends AbstractBlock {
    observer: IntersectionObserver | null;
    observerOptions: Record<string, any>;
    constructor(container: object, blockName?: string);
    init(): void;
    destroyEvents(): void;
    onIntersectionCallback(entries: IntersectionObserverEntry[]): void;
    onScreen(_entry: IntersectionObserverEntry): void;
    offScreen(_entry: IntersectionObserverEntry): void;
    unobserve(): void;
}
//# sourceMappingURL=AbstractInViewBlock.d.ts.map