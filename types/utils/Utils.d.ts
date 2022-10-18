interface Credits {
    name: string;
    website: string;
}
declare global {
    interface Window {
        ga: any;
    }
}
declare type CreditsList = Credits[];
/**
 * Utils class
 */
export default class Utils {
    /**
     * @param  {String} str
     * @return {String}
     */
    static stripTrailingSlash(str: string): string;
    /**
     * Get port
     *
     * @param p
     * @returns {*}
     */
    static getPort(p?: string | undefined): number | null;
    static cleanLink(url: string): string;
    /**
     * Get current url
     *
     * @returns {string}
     */
    static getCurrentUrl(): string;
    /**
     * Request timeout (in ms)
     *
     * @returns {number}
     */
    static requestTimeout(): number;
    /**
     * Start a fetch request
     *
     * @param {String} url
     * @return {Promise}
     */
    static request(url: string): Promise<any>;
    /**
     * Log credits to console for code lovers.
     *
     * @param  {String} siteName
     * @param  {String} bgColor
     * @param  {Array}  creditsList
     * @param  {Array}  thanksList
     * @param  {String} textColor (optional)
     */
    static logCredits(siteName: string, bgColor: string, creditsList: CreditsList | null, thanksList: CreditsList | null, textColor: string | undefined): void;
    /**
     * Get random number.
     *
     * @param  {Number} min [min value]
     * @param  {Number} max [max value]
     * @param  {Number} decimal
     * @return {Number}
     */
    static getRandomNumber(min: number, max: number, decimal: number | undefined): number;
    /**
     * Get random integer.
     *
     * @param  {Number} min [min value]
     * @param  {Number} max [max value]
     * @return {Number}
     */
    static getRandomInt(min: number, max: number): number;
    /**
     * Send a GA page view event when context is AJAX.
     */
    static trackGoogleAnalytics(): void;
    /**
     * Match CSS media queries and JavaScript window width.
     *
     * @see http://stackoverflow.com/a/11310353
     * @return {Object}
     */
    static getViewportSize(): {
        width: number;
        height: number;
    };
    /**
     * Get a css property with the vendor prefix.
     *
     * @param  {String} property the css property
     * @return {String}          the prefixed property
     */
    static prefixProperty(property: string): string | null;
    /**
     * Gets normalized ratio of value inside range.
     *
     * from https://github.com/mout/mout/blob/master/src/math/norm.js
     *
     * @param  {Number} val
     * @param  {Number} min
     * @param  {Number} max
     * @return {Number}
     */
    static getNormRatio(val: number, min: number, max: number): number;
    /**
     * Return a new "Deferred" object
     * https://developer.mozilla.org/en-US/docs/Mozilla/JavaScript_code_modules/Promise.jsm/Deferred
     *
     * @return {Deferred}
     */
    static deferred<T>(): Deferred<T>;
}
export interface Deferred<T> {
    resolve: null | ((value?: T) => void);
    reject: null | ((reason?: any) => void);
    promise: Promise<T>;
}
export {};
//# sourceMappingURL=Utils.d.ts.map