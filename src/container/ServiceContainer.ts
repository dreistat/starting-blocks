/**
 * @file ServiceContainer.ts
 *
 * Minimal, dependency-free dependency injection container.
 * Drop-in replacement for the subset of BottleJS used by Starting Blocks:
 * services are lazily created on first access, cached as singletons, and
 * exposed as own properties of `container` (so `hasOwnProperty` works before
 * a service has been instantiated).
 */

export type ServiceFactory<T = any> = (container: Container) => T

export interface InstanceFactory<T = any> {
    /** Returns a new instance on every call. */
    instance (...args: any[]): T
}

/** BottleJS-style provider: a constructor whose instances expose `$get`. */
export type ProviderConstructor<T = any> = new () => { $get (container: Container): T }

export type ServiceType = 'value' | 'factory' | 'instanceFactory' | 'provider' | 'service'

export interface ServiceDefinition {
    $name: string
    /** Defaults to `service`, like BottleJS. */
    $type?: ServiceType
    /** Registered value; when omitted the definition object itself is used. */
    $value?: any
    /** Names of the services passed to the constructor when `$type` is `service`. */
    $inject?: string[]
}

export interface Container {
    [name: string]: any
    $register (definition: ServiceDefinition): ServiceContainer
}

const RESERVED_NAMES = ['$register']

export default class ServiceContainer {
    public readonly container: Container

    /** Services whose factory has already run (their instance is cached). */
    private readonly resolved = new Set<string>()
    /** Services whose factory is currently running, to detect circular dependencies. */
    private readonly resolving = new Set<string>()

    constructor () {
        const container = {} as Container

        Object.defineProperty(container, '$register', {
            configurable: false,
            enumerable: false,
            writable: false,
            value: (definition: ServiceDefinition) => this.register(definition)
        })

        this.container = container
    }

    /**
     * Registers a plain value. Values can be overwritten at any time.
     */
    value<T> (name: string, value: T): this {
        this.assertName(name)
        this.resolved.add(name)
        this.defineValue(name, value)
        return this
    }

    /**
     * Registers a lazy singleton: `factory(container)` is called once,
     * the first time the service is accessed.
     */
    factory<T> (name: string, factory: ServiceFactory<T>): this {
        this.assertName(name)

        if (this.resolved.has(name)) {
            // Same behaviour as BottleJS: an instantiated service is never replaced.
            console.error(`${name} provider already instantiated.`)
            return this
        }

        const container = this.container

        Object.defineProperty(container, name, {
            configurable: true,
            enumerable: true,
            get: () => {
                if (this.resolving.has(name)) {
                    throw new Error(`Circular dependency detected while resolving "${name}" service.`)
                }

                this.resolving.add(name)

                try {
                    const instance = factory(container)
                    this.resolved.add(name)
                    this.defineValue(name, instance)
                    return instance
                } finally {
                    this.resolving.delete(name)
                }
            }
        })

        return this
    }

    /**
     * Registers a service whose `instance()` method returns a new object on every call.
     */
    instanceFactory<T> (name: string, factory: (container: Container, ...args: any[]) => T): this {
        return this.factory<InstanceFactory<T>>(name, (container) => ({
            instance: (...args: any[]) => factory(container, ...args)
        }))
    }

    /**
     * Registers a BottleJS-style provider (a constructor exposing `$get(container)`).
     */
    provider<T> (name: string, Provider: ProviderConstructor<T>): this {
        return this.factory<T>(name, (container) => new Provider().$get(container))
    }

    /**
     * Registers a class instantiated with the given dependencies (resolved by name).
     */
    service<T> (name: string, Constructor: new (...args: any[]) => T, ...dependencies: string[]): this {
        return this.factory<T>(name, (container) => new Constructor(
            ...dependencies.map((dependency) => container[dependency])
        ))
    }

    /**
     * Registers a service from a definition object (BottleJS `$register` compatible).
     */
    register (definition: ServiceDefinition): this {
        const value = definition.$value === undefined ? definition : definition.$value
        const type = definition.$type || 'service'

        switch (type) {
            case 'value':
                return this.value(definition.$name, value)
            case 'factory':
                return this.factory(definition.$name, value)
            case 'instanceFactory':
                return this.instanceFactory(definition.$name, value)
            case 'provider':
                return this.provider(definition.$name, value)
            case 'service':
                return this.service(definition.$name, value, ...(definition.$inject || []))
            default:
                throw new Error(`Unknown service type "${type}" for "${definition.$name}" service.`)
        }
    }

    has (name: string): boolean {
        return Object.prototype.hasOwnProperty.call(this.container, name)
    }

    private defineValue (name: string, value: unknown) {
        Object.defineProperty(this.container, name, {
            configurable: true,
            enumerable: true,
            writable: true,
            value
        })
    }

    private assertName (name: string) {
        if (typeof name !== 'string' || name === '') {
            throw new Error('A service name must be a non-empty string.')
        }

        if (RESERVED_NAMES.includes(name)) {
            throw new Error(`"${name}" is a reserved service name.`)
        }
    }
}
