/*
 * Copyright © 2017, Rezo Zero
 *
 * @file StartingBlocks.js
 * @author Adrien Scholaert <adrien@rezo-zero.com>
 */
import Bottle from 'bottlejs'
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
const CONFIG = {
    defaults: {
        wrapperId: 'sb-wrapper',
        pageBlockClass: 'page-block',
        pageClass: 'page-content',
        objectTypeAttr: 'data-node-type',
        noAjaxLinkClass: 'no-ajax-link',
        noPrefetchClass: 'no-prefetch',
        manualDomAppend: false,
        debug: 0
    }
}

declare global {
    interface Window {
        startingBlocksDebugLevel: number
    }
}

export default class StartingBlocks {

    public bottle;
    public bootables: any[]

    constructor (config = {}) {
        this.bottle = new Bottle()
        this.bootables = []

        this.bottle.value('Config', {
            ...CONFIG.defaults,
            ...config
        })

        window.startingBlocksDebugLevel = this.bottle.container.Config.debug

        this.provider('Dom', Dom)
        this.provider('BlockBuilder', BlockBuilder)
        this.instanceFactory('DefaultPage', (c: any) => {
            return new DefaultPage(c)
        })
    }

    provider (id: string, ClassName: any, ...args: any) {
        if (!id || !ClassName) {
            throw new Error('A parameter is missing')
        }

        this.bottle.provider(id, function (this: any) {
            this.$get = (container: any) => {
                return new ClassName(container, ...args)
            }
        })
    }

    factory (id: string, f: any) {
        this.bottle.factory(id, f)
    }

    instanceFactory (id: string, f: any) {
        this.bottle.instanceFactory(id, f)
    }

    bootableProvider (id: string, ClassName: any, ...args: any) {
        this.provider(id, ClassName, ...args)
        this.bootables.push(id)
    }

    boot () {
        this.bootableProvider('PageBuilder', PageBuilder)

        for (const serviceName of this.bootables) {
            if (this.bottle.container.hasOwnProperty(serviceName)) {
                this.bottle.container[serviceName].boot()
            }
        }
    }
}
