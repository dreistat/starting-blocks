import ServiceContainer, { Container, ServiceFactory } from './container/ServiceContainer';
/**
 * @namespace
 * @type {Object} defaults                      - Default config
 * @property {String} defaults.wrapperId        - Id of the main wrapper
 * @property {String} defaults.pageBlockClass
 * @property {String} defaults.pageClass        - Class name used to identify the containers
 * @property {String} defaults.objectTypeAttr   - The data attribute name to find the node type
 * @property {String} defaults.noAjaxLinkClass
 * @property {String} defaults.noPrefetchClass  - Class name used to ignore prefetch on links.
 * @property {boolean} defaults.manualDomAppend
 * @const
 * @default
 */
interface StartingBlocksOptions {
    wrapperId?: string;
    pageBlockClass?: string;
    pageClass?: string;
    objectTypeAttr?: string;
    noAjaxLinkClass?: string;
    noPrefetchClass?: string;
    manualDomAppend?: boolean;
    debug?: number;
}
declare global {
    interface Window {
        startingBlocksDebugLevel: number;
    }
}
export default class StartingBlocks {
    readonly services: ServiceContainer;
    bootables: string[];
    constructor(config?: StartingBlocksOptions);
    /**
     * @deprecated Use `services` instead. BottleJS has been replaced by the
     * built-in ServiceContainer; this alias will be removed in a future release.
     */
    get bottle(): ServiceContainer;
    provider(id: string, ClassName: new (container: Container, ...args: any[]) => any, ...args: any[]): void;
    factory<T>(id: string, f: ServiceFactory<T>): void;
    instanceFactory<T>(id: string, f: (container: Container, ...args: any[]) => T): void;
    bootableProvider(id: string, ClassName: new (container: Container, ...args: any[]) => any, ...args: any[]): void;
    boot(): void;
}
export {};
//# sourceMappingURL=StartingBlocks.d.ts.map