import Bottle from 'bottlejs';
declare global {
    interface Window {
        startingBlocksDebugLevel: number;
    }
}
export default class StartingBlocks {
    bottle: Bottle;
    bootables: any[];
    constructor(config?: {});
    provider(id: string, ClassName: any, ...args: any): void;
    factory(id: string, f: any): void;
    instanceFactory(id: string, f: any): void;
    bootableProvider(id: string, ClassName: any, ...args: any): void;
    boot(): void;
}
//# sourceMappingURL=StartingBlocks.d.ts.map