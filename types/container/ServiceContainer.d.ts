/**
 * @file ServiceContainer.ts
 *
 * Minimal, dependency-free dependency injection container.
 * Drop-in replacement for the subset of BottleJS used by Starting Blocks:
 * services are lazily created on first access, cached as singletons, and
 * exposed as own properties of `container` (so `hasOwnProperty` works before
 * a service has been instantiated).
 */
export type ServiceFactory<T = any> = (container: Container) => T;
export interface InstanceFactory<T = any> {
    /** Returns a new instance on every call. */
    instance(...args: any[]): T;
}
/** BottleJS-style provider: a constructor whose instances expose `$get`. */
export type ProviderConstructor<T = any> = new () => {
    $get(container: Container): T;
};
export type ServiceType = 'value' | 'factory' | 'instanceFactory' | 'provider' | 'service';
export interface ServiceDefinition {
    $name: string;
    /** Defaults to `service`, like BottleJS. */
    $type?: ServiceType;
    /** Registered value; when omitted the definition object itself is used. */
    $value?: any;
    /** Names of the services passed to the constructor when `$type` is `service`. */
    $inject?: string[];
}
export interface Container {
    [name: string]: any;
    $register(definition: ServiceDefinition): ServiceContainer;
}
export default class ServiceContainer {
    readonly container: Container;
    /** Services whose factory has already run (their instance is cached). */
    private readonly resolved;
    /** Services whose factory is currently running, to detect circular dependencies. */
    private readonly resolving;
    constructor();
    /**
     * Registers a plain value. Values can be overwritten at any time.
     */
    value<T>(name: string, value: T): this;
    /**
     * Registers a lazy singleton: `factory(container)` is called once,
     * the first time the service is accessed.
     */
    factory<T>(name: string, factory: ServiceFactory<T>): this;
    /**
     * Registers a service whose `instance()` method returns a new object on every call.
     */
    instanceFactory<T>(name: string, factory: (container: Container, ...args: any[]) => T): this;
    /**
     * Registers a BottleJS-style provider (a constructor exposing `$get(container)`).
     */
    provider<T>(name: string, Provider: ProviderConstructor<T>): this;
    /**
     * Registers a class instantiated with the given dependencies (resolved by name).
     */
    service<T>(name: string, Constructor: new (...args: any[]) => T, ...dependencies: string[]): this;
    /**
     * Registers a service from a definition object (BottleJS `$register` compatible).
     */
    register(definition: ServiceDefinition): this;
    has(name: string): boolean;
    private defineValue;
    private assertName;
}
//# sourceMappingURL=ServiceContainer.d.ts.map