/*
 * Copyright © 2017, Rezo Zero
 *
 * @file AbstractInViewBlock.js
 * @author Adrien Scholaert <adrien@rezo-zero.com>
 */

import AbstractBlock from './AbstractBlock'

export default class AbstractInViewBlock extends AbstractBlock {

    public observer: IntersectionObserver | null;
    public observerOptions: Record<string, any>

    constructor (container: object, blockName = 'AbstractInViewBlock') {
        super(container, blockName)

        // Values
        this.observer = null
        this.observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0
        }

        // Bind method
        this.onIntersectionCallback = this.onIntersectionCallback.bind(this)
    }

    init () {
        super.init()

        // Create an observer
        this.observer = new window.IntersectionObserver(this.onIntersectionCallback, this.observerOptions)

        // Add block rootElement in the observer
        this.observer.observe(this.rootElement!)
    }

    destroyEvents () {
        super.destroyEvents()
        this.unobserve()
    }

    onIntersectionCallback (entries: IntersectionObserverEntry[]) {
        for (const entry of entries) {
            if (entry.intersectionRatio > 0) {
                this.onScreen(entry)
            } else {
                this.offScreen(entry)
            }
        }
    }

    onScreen (_entry: IntersectionObserverEntry) {}

    offScreen (_entry: IntersectionObserverEntry) {}

    unobserve () {
        this.observer!.unobserve(this.rootElement!)
    }
}
