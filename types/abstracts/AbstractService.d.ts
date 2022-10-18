export default class AbstractService {
    private _container;
    private _serviceName;
    constructor(container?: {}, serviceName?: string, dependencies?: string[]);
    init(): void;
    hasService(serviceName: string): boolean;
    checkDependencies(dependencies?: string[]): void;
    getService(serviceName: string): any;
    get serviceName(): string;
    set serviceName(value: string);
    get container(): Record<string, any>;
    set container(value: Record<string, any>);
}
//# sourceMappingURL=AbstractService.d.ts.map