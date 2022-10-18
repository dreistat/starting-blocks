/**
 * Copyright © 2016, Ambroise Maupate
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is furnished
 * to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 * IN THE SOFTWARE.
 *
 * @file AbstractPage.js
 * @author Ambroise Maupate
 * @author Adrien Scholaert
 */
import AbstractService from './AbstractService';
import AbstractBlock from "./AbstractBlock";
/**
 * Base class for creating page implementations.
 *
 * **Do not instanciate this class directly, create a sub-class**.
 *
 * @abstract
 */
export default class AbstractPage extends AbstractService {
    rootElement: HTMLElement | null;
    id: string | null;
    context: string | null;
    type: string | null;
    isHome: boolean | null;
    blocks: AbstractBlock[];
    name: string | null;
    metaTitle: string | null;
    onResizeDebounce: () => void;
    bindedUpdateBlocks: () => void;
    blockElements: HTMLElement[] | null;
    blockLength: number | null;
    domObserver: MutationObserver | null;
    /**
     * Base constructor for Pages.
     * @constructor
     */
    constructor(container: object);
    /**
     * Initialize page.
     *
     * You should always extend this method in your child implementations instead
     * of extending page constructor.
     */
    init(): Promise<void>;
    /**
     * Destroy current page and all its blocks.
     */
    destroy(): void;
    /**
     * Initialize basic events.
     */
    initEvents(): void;
    /**
     * Destroy events
     */
    destroyEvents(): void;
    /**
     * Initialize page blocks on page.
     */
    initBlocks(): Promise<void>;
    /**
     * Append new blocks which were not present at init.
     */
    updateBlocks(): Promise<void>;
    /**
     * @param {HTMLElement} blockElement
     * @return {AbstractBlock}
     */
    initSingleBlock(blockElement: HTMLElement): Promise<any>;
    /**
     * Get a page block instance from its `id`.
     *
     * @param  {String} id
     * @return {AbstractBlock|null}
     */
    getBlockById(id: string): AbstractBlock | null;
    /**
     * Get a page block index from its `id`.
     *
     * @param  {String} id
     * @return {*|null}
     */
    getBlockIndexById(id: string): number | null;
    /**
     * Get the first page block instance from its `type`.
     *
     * @param  {String} type
     * @return {AbstractBlock|null}
     */
    getFirstBlockByType(type: string): AbstractBlock | null;
    /**
     * Get the first page block index from its `type`.
     *
     * @param  {String} type
     * @return {*|null}
     */
    getFirstBlockIndexByType(type: string): number | null;
    /**
     * @abstract
     */
    onResize(): void;
}
//# sourceMappingURL=AbstractPage.d.ts.map