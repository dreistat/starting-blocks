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
export default function debounce(func: (...args: any) => void, wait: number, immediate: boolean): (this: any) => void;
//# sourceMappingURL=debounce.d.ts.map