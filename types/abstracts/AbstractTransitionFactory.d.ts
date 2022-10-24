import AbstractService from './AbstractService';
import { HistoryStatus } from "../services/History";
/**
 * Abstract Transition mapper class.
 *
 * This class maps your `data-transition` with your *ES6* classes.
 *
 * **You must define your own ClassFactory for each of your projects.**.
 * @abstract
 */
export default class AbstractTransitionFactory extends AbstractService {
    /**
     * Get Transition
     *
     * @param {Object} previousState
     * @param {Object} state
     * @returns {AbstractTransition}
     * @abstract
     */
    getTransition(_previousState: HistoryStatus, _state: HistoryStatus): any;
}
//# sourceMappingURL=AbstractTransitionFactory.d.ts.map