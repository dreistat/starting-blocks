import { Container } from '../container/ServiceContainer';
export default class AbstractService {
    private _container;
    private _serviceName;
    constructor(container?: object, serviceName?: string, dependencies?: string[]);
    init(): void;
    hasService(serviceName: string): boolean;
    checkDependencies(dependencies?: string[]): void;
    getService(serviceName: string): any;
    get serviceName(): string;
    set serviceName(value: string);
    get container(): Container;
    set container(value: Container);
}
//# sourceMappingURL=AbstractService.d.ts.map