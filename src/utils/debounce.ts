/**
 * Returns a function, that, as long as it continues to be invoked, will not
 * be triggered.
 *
 * The function will be called after it stops being called for
 * N milliseconds. If `immediate` is passed, trigger the function on the
 * leading edge, instead of the trailing.
 *
 * @see   http://davidwalsh.name/javascript-debounce-function
 * @param {Function} func     [function to debounce]
 * @param {Number} wait       [time to wait]
 * @param {Boolean} immediate []
 */
export default function debounce (func: (...args: any) => void, wait: number, immediate: boolean) {
    let timeout: number | null
    return function (this: any) {
        let context = this
        let args = arguments
        let later = function () {
            timeout = null
            if (!immediate) func.apply(context, Array.from(args))
        }
        const callNow = immediate && !timeout
        if(timeout) clearTimeout(timeout)
        timeout = window.setTimeout(later, wait)
        if (callNow) func.apply(context, Array.from(args))
    }
}
