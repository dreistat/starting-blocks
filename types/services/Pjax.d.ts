/**
 * Copyright © 2017, Ambroise Maupate
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
 * @file Pjax.js
 * @author Adrien Scholaert
 */
import AbstractBootableService from '../abstracts/AbstractBootableService';
import type { HistoryStatus } from "./History";
import AbstractPage from "../abstracts/AbstractPage";
/**
 * Pjax.
 */
export default class Pjax extends AbstractBootableService {
    private transitionProgress;
    private containerElement;
    private currentState;
    private linkHash;
    constructor(container: {}, serviceName?: string);
    /**
     * Init the events.
     *
     * @private
     */
    boot(): void;
    /**
     * Attach event listeners.
     *
     * @private
     */
    bindEvents(): void;
    /**
     * Return the currentURL cleaned.
     *
     * @return {String} currentUrl
     */
    getCurrentUrl(): string;
    /**
     * Change the URL with push state and trigger the state change.
     *
     * @param {String} url
     * @param {String} transitionName
     * @param {HTMLElement} element The <a> element
     * @param {Object} cursorPosition
     */
    goTo(url: string, transitionName: string, element: HTMLElement, cursorPosition: any): void;
    /**
     * Force the browser to go to a certain url.
     *
     * @param {String} url
     * @private
     */
    forceGoTo(url: string): void;
    /**
     * Load an url, will start an ajax request or load from the cache.
     *
     * @private
     * @param  {String} url
     * @return {Promise}
     */
    load(url: string): Promise<any>;
    /**
     * Get the .href parameter out of a link element
     *
     * @private
     * @param  {HTMLElement} el
     * @return {String|undefined} href
     */
    getHref(el: any): any;
    /**
     * Get transition name from HTMLElement attribute (data-transition).
     *
     * @param {HTMLElement} el
     * @returns {String|undefined} The transition name
     */
    getTransitionName(el: HTMLElement | null): string | null;
    /**
     * Callback called from click event.
     *
     * @private
     * @param {MouseEvent} evt
     */
    onLinkClick(evt: MouseEvent): void;
    /**
     * Determine if the link should be followed.
     *
     * @param  {MouseEvent} evt
     * @param  {HTMLElement} element
     * @return {Boolean}
     */
    preventCheck(evt: MouseEvent, element: HTMLAnchorElement): boolean;
    /**
     * Return a transition object.
     *
     * @param  {object} prev historyManager
     * @param  {object} current historyManager
     * @return {AbstractTransition} Transition object
     */
    getTransition(prev: HistoryStatus, current: HistoryStatus): any;
    /**
     * Method called after a 'popstate'.
     *
     * @private
     */
    onStateChange(_e: PopStateEvent): void;
    /**
     * Method called from 'popstate' or .goTo().
     *
     * @private
     */
    handleStateChange(transitionName?: string | null, isAjax?: boolean, el?: HTMLElement | null, cursorPosition?: null): void;
    /**
     * Function called as soon the new page is ready.
     *
     * @private
     * @param {AbstractPage} page
     */
    onNewPageLoaded(page: AbstractPage): void;
    /**
     * Function called as soon the transition is finished.
     *
     * @private
     */
    onTransitionEnd(): void;
}
//# sourceMappingURL=Pjax.d.ts.map