/**
 * Copyright (c) 2017. Ambroise Maupate and Julien Blanchet
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is furnished
 * to do so, subject to the following conditions:
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
 * Except as contained in this notice, the name of the ROADIZ shall not
 * be used in advertising or otherwise to promote the sale, use or other dealings
 * in this Software without prior written authorization from Ambroise Maupate and Julien Blanchet.
 *
 * @file Dom.js
 * @author Adrien Scholaert <adrien@rezo-zero.com>
 */
import AbstractService from '../abstracts/AbstractService';
import AbstractPage from "../abstracts/AbstractPage";
/**
 * Class that is going to deal with DOM parsing/manipulation.
 */
export default class Dom extends AbstractService {
    currentHTML: string;
    /**
     * Constructor.
     *
     * @param {Object} container
     * @param {String} serviceName
     */
    constructor(container: {}, serviceName?: string);
    /**
     * Parse the responseText obtained from the ajax call.
     *
     * @param  {String} responseText
     * @return {HTMLElement}
     */
    parseResponse(responseText: string): Element;
    /**
     * Get the main wrapper by the ID `wrapperId`.
     *
     * @return {HTMLElement} element
     */
    getWrapper(): HTMLElement;
    /**
     * Return node type.
     *
     * @param container
     * @returns {string}
     */
    getNodeType(container: HTMLElement): string | null;
    /**
     * Get the container on the current DOM,
     * or from an HTMLElement passed via argument.
     *
     * @param  {HTMLElement|null} element
     * @return {HTMLElement}
     */
    getContainer(element?: HTMLElement | null): Element;
    /**
     * Put the container on the page.
     *
     * @param  {HTMLElement} element
     */
    putContainer(element: HTMLElement): void;
    /**
     * Get container selector.
     *
     * @param  {HTMLElement} element
     * @return {HTMLElement} element
     */
    parseContainer(element: HTMLElement): Element | null;
    /**
     * Update body attributes.
     *
     * @param {AbstractPage} page
     */
    updateBodyAttributes(page: AbstractPage): void;
    /**
     * Update page title.
     *
     * @param {AbstractPage} page
     */
    updatePageTitle(page: AbstractPage): void;
}
//# sourceMappingURL=Dom.d.ts.map