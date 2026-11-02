/*
 * Copyright © 2017, Rezo Zero
 *
 * @file StartingBlocks.js
 * @author Adrien Scholaert <adrien@rezo-zero.com>
 */
import ServiceContainer, { Container, ServiceFactory } from './container/ServiceContainer'
import PageBuilder from './services/PageBuilder.js'
import BlockBuilder from './services/BlockBuilder.js'
import Dom from './services/Dom.js'
import DefaultPage from './pages/DefaultPage.js'

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
    pageBlockClass?: string,
    pageClass?: string,
    objectTypeAttr?: string,
    noAjaxLinkClass?: string,
    noPrefetchClass?: string,
    manualDomAppend?: boolean,
    debug?: number,
}

const CONFIG_DEFAULTS = {
    wrapperId: 'sb-wrapper',
    pageBlockClass: 'page-block',
    pageClass: 'page-content',
    objectTypeAttr: 'data-node-type',
    noAjaxLinkClass: 'no-ajax-link',
    noPrefetchClass: 'no-prefetch',
    manualDomAppend: false,
    debug: 0
}

declare global {
    interface Window {
        startingBlocksDebugLevel: number
    }
}

export default class StartingBlocks {

    public readonly services: ServiceContainer
    public bootables: string[]

    constructor (config: StartingBlocksOptions = {}) {
        this.services = new ServiceContainer()
        this.bootables = []

        this.services.value('Config', {
            ...CONFIG_DEFAULTS,
            ...config
        })

        window.startingBlocksDebugLevel = this.services.container.Config.debug

        this.provider('Dom', Dom)
        this.provider('BlockBuilder', BlockBuilder)
        this.instanceFactory('DefaultPage', (c: Container) => {
            return new DefaultPage(c)
        })
    }

    /**
     * @deprecated Use `services` instead. BottleJS has been replaced by the
     * built-in ServiceContainer; this alias will be removed in a future release.
     */
    get bottle (): ServiceContainer {
        return this.services
    }

    provider (id: string, ClassName: new (container: Container, ...args: any[]) => any, ...args: any[]) {
        if (!id || !ClassName) {
            throw new Error('A parameter is missing')
        }

        this.services.factory(id, (container) => new ClassName(container, ...args))
    }

    factory<T> (id: string, f: ServiceFactory<T>) {
        this.services.factory(id, f)
    }

    instanceFactory<T> (id: string, f: (container: Container, ...args: any[]) => T) {
        this.services.instanceFactory(id, f)
    }

    bootableProvider (id: string, ClassName: new (container: Container, ...args: any[]) => any, ...args: any[]) {
        this.provider(id, ClassName, ...args)
        this.bootables.push(id)
    }

    boot () {
        this.bootableProvider('PageBuilder', PageBuilder)

        for (const serviceName of this.bootables) {
            if (this.services.has(serviceName)) {
                this.services.container[serviceName].boot()
            }
        }
    }
}
