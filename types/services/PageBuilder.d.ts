/**
 * @file PageBuilder.js
 * @author Ambroise Maupate
 * @author Adrien Scholaert
 */
import AbstractBootableService from '../abstracts/AbstractBootableService';
import AbstractPage from "../abstracts/AbstractPage";
/**
 * PageBuilder.
 */
export default class PageBuilder extends AbstractBootableService {
    private page;
    constructor(container: {}, serviceName?: string);
    boot(): void;
    /**
     * Build a new page instance.
     *
     * @param {HTMLElement} rootElement
     * @param {String} context
     * @returns {AbstractPage|null}
     */
    buildPage(rootElement: HTMLElement, context?: string): Promise<AbstractPage | null>;
}
//# sourceMappingURL=PageBuilder.d.ts.map