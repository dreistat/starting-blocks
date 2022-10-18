import AbstractService from './AbstractService';
import AbstractPage from "./AbstractPage";
/**
 * Base class for creating transition.
 *
 * @abstract
 */
export default class AbstractTransition extends AbstractService {
    oldPage: AbstractPage | null;
    newPage: AbstractPage | null;
    newPageLoading: Promise<boolean> | null;
    originElement: HTMLElement | null;
    cursorPosition: object | null;
    _newPagePromise: Promise<AbstractPage> | null;
    private deferred;
    private newPageReady;
    /**
     * Constructor.
     * Do not override this method.
     *
     * @constructor
     */
    constructor(container: {}, serviceName?: string, dependencies?: never[]);
    /**
     * Initialize transition.
     * Do not override this method.
     *
     * @param {AbstractPage} oldPage
     * @param {Promise} newPagePromise
     * @param {(HTMLElement|null)} el The html element where the transition has been launched
     * @param {Object} cursorPosition The cursor position when the transition has been launched
     * @returns {Promise}
     */
    initTransition(oldPage: AbstractPage, newPagePromise: Promise<AbstractPage>, el: HTMLElement, cursorPosition: {}): Promise<unknown>;
    /**
     * Call this function when the Transition is finished.
     */
    done(): void;
    scrollTop(): void;
    destroyOldPage(): void;
    buildNewPage(): Promise<void>;
    /**
     * Entry point to create a custom Transition.
     * @abstract
     */
    start(): void;
}
//# sourceMappingURL=AbstractTransition.d.ts.map