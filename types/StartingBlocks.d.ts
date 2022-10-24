import Bottle from 'bottlejs';
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
    bottle: Bottle<string>;
    bootables: any[];
    constructor(config?: StartingBlocksOptions);
    provider(id: string, ClassName: any, ...args: any): void;
    factory(id: string, f: any): void;
    instanceFactory(id: string, f: any): void;
    bootableProvider(id: string, ClassName: any, ...args: any): void;
    boot(): void;
}
export {};
//# sourceMappingURL=StartingBlocks.d.ts.map