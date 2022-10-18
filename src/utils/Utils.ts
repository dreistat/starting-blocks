import { debug } from './Logger'

interface Credits {
    name: string;
    website: string;
}

declare global {
    interface Window {
        ga: any;
    }
}

type CreditsList = Credits[]

/**
 * Utils class
 */

export default class Utils {
    /**
     * @param  {String} str
     * @return {String}
     */
    static stripTrailingSlash (str: string) {
        if (str.substring(-1) === '/') {
            return str.substring(0, str.length - 1)
        }
        return str
    }

    /**
     * Get port
     *
     * @param p
     * @returns {*}
     */
    static getPort (p: string | undefined = undefined) {
        const port = typeof p !== 'undefined' ? p : window.location.port
        const protocol = window.location.protocol

        if (port !== '') { return parseInt(port) }
        if (protocol === 'http:') { return 80 }
        if (protocol === 'https:') { return 443 }

        return null
    }

    static cleanLink (url: string) {
        return url.replace(/#.*/, '')
    }

    /**
     * Get current url
     *
     * @returns {string}
     */
    static getCurrentUrl () {
        return window.location.protocol + '//' +
            window.location.host +
            window.location.pathname +
            window.location.search
    }

    /**
     * Request timeout (in ms)
     *
     * @returns {number}
     */
    static requestTimeout () {
        return 10000
    }

    /**
     * Start a fetch request
     *
     * @param {String} url
     * @return {Promise}
     */
    static async request (url: string) {
        const dfd = Utils.deferred<any>()

        const timeout = window.setTimeout(() => {
            window.clearTimeout(timeout)
            dfd.reject!('timeout!')
        }, Utils.requestTimeout())

        const headers = new window.Headers()
        headers.append('X-Starting-Blocks', 'yes')
        headers.append('X-Allow-Partial', 'yes')
        headers.append('X-Requested-With', 'XMLHttpRequest')

        window.fetch(url, {
            method: 'GET',
            headers: headers,
            cache: 'default',
            credentials: 'same-origin'
        }).then(res => {
            window.clearTimeout(timeout)

            if (res.status >= 200 && res.status < 300) {
                return dfd.resolve!(res.text())
            }

            const err = new Error(res.statusText || res.status.toString())
            return dfd.reject!(err)
        }).catch(err => {
            window.clearTimeout(timeout)
            dfd.reject!(err)
        })

        return dfd.promise
    }

    /**
     * Log credits to console for code lovers.
     *
     * @param  {String} siteName
     * @param  {String} bgColor
     * @param  {Array}  creditsList
     * @param  {Array}  thanksList
     * @param  {String} textColor (optional)
     */
    static logCredits (siteName: string, bgColor: string, creditsList: CreditsList | null, thanksList: CreditsList | null, textColor: string | undefined) {
        let color = '#fff'
        if (typeof textColor !== 'undefined') color = textColor

        console.log('%c   ', 'font-size:3px;')
        console.log('%c' + siteName, 'background:' + bgColor + '; color: ' + color + '; font-size:14px; padding:5px 10px;')
        console.log('%c   ', 'font-size:3px;')

        if (creditsList !== null) {
            let creditsLength = creditsList.length
            if (creditsLength) {
                for (let indexCredit = 0; indexCredit < creditsLength; indexCredit++) {
                    console.log(creditsList[indexCredit].name + ' - ' + creditsList[indexCredit].website)
                }
            }
        }

        if (thanksList !== null) {
            let thanksLength = thanksList.length
            if (thanksLength) {
                console.log('-')
                console.log('Thanks to')
                for (let indexThanks = 0; indexThanks < thanksLength; indexThanks++) {
                    console.log(thanksList[indexThanks].name + ' (' + thanksList[indexThanks].website + ')')
                }
            }
        }

        console.log('-')
        console.log(' ')
    }

    /**
     * Get random number.
     *
     * @param  {Number} min [min value]
     * @param  {Number} max [max value]
     * @param  {Number} decimal
     * @return {Number}
     */
    static getRandomNumber (min: number, max: number, decimal: number | undefined) {
        const result = Math.random() * (max - min) + min

        if (typeof decimal !== 'undefined') {
            return Number(result.toFixed(decimal))
        }

        return result
    }

    /**
     * Get random integer.
     *
     * @param  {Number} min [min value]
     * @param  {Number} max [max value]
     * @return {Number}
     */
    static getRandomInt (min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1)) + min
    }

    /**
     * Send a GA page view event when context is AJAX.
     */
    static trackGoogleAnalytics () {
        if (typeof window.ga !== 'undefined') {
            debug('🚩 Push Analytics for: ' + window.location.pathname)
            window.ga('send', 'pageview', {
                'page': window.location.pathname,
                'title': document.title
            })
        }
    }

    /**
     * Match CSS media queries and JavaScript window width.
     *
     * @see http://stackoverflow.com/a/11310353
     * @return {Object}
     */
    static getViewportSize () {
        const e = document.documentElement || document.body

        if (!('innerWidth' in window)) {
            return {
                width: e.clientWidth,
                height: e.clientHeight,
            }
        } else {
            return {
                width: window.innerWidth,
                height: window.innerHeight,
            }
        }
    }

    /**
     * Get a css property with the vendor prefix.
     *
     * @param  {String} property the css property
     * @return {String}          the prefixed property
     */
    static prefixProperty (property: string) {
        const prefixes = ['', 'ms', 'Webkit', 'Moz', 'O']
        const numPrefixes = prefixes.length
        const tmp = document.createElement('div')

        for (let i = 0; i < numPrefixes; i++) {
            let prefix = prefixes[i]
            const new_property = prefix === '' ? property : property.charAt(0).toUpperCase() + property.substring(1).toLowerCase()
            const prop = prefix + new_property

            if (typeof tmp.style[prop as any] !== 'undefined') {
                return prop
            }
        }

        return null
    }

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
    static getNormRatio (val: number, min: number, max: number) {
        if (val < min) return 0
        if (val > max) return 1

        return val === max ? 1 : (val - min) / (max - min)
    }

    /**
     * Return a new "Deferred" object
     * https://developer.mozilla.org/en-US/docs/Mozilla/JavaScript_code_modules/Promise.jsm/Deferred
     *
     * @return {Deferred}
     */
    static deferred<T>(): Deferred<T> {
        return function () {
            let resolve = null
            let reject = null

            let promise = new Promise<T>((_resolve, _reject) => {
                resolve = _resolve
                reject = _reject
            })

            return {
                resolve,
                reject,
                promise,
            }
        }()
    }
}

export interface Deferred<T> {
    resolve: null | ((value?: T) => void)
    reject: null | ((reason?: any) => void)
    promise: Promise<T>
}
