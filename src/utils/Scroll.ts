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
 * @file Scroll.js
 * @author Ambroise Maupate
 */

declare global {
    interface Window {
        onmousewheel: any
    }

    interface Document {
        onmousewheel: any
    }
}

/**
 * @static
 */
export default class Scroll {
    /**
     *
     * @param e
     * @private
     */
    static _preventDefault (e: WheelEvent | KeyboardEvent) {
        if (e.preventDefault) { e.preventDefault() }
        e.returnValue = false
    }

    /**
     *
     * @param e
     * @private
     */
    static _keydown (e: KeyboardEvent) {
        let keys = ['ArrowLeft', 'ArrowUp', 'ArrowRight', 'ArrowDown', 'PageUp', 'PageDown', 'End', 'Home', 'Space']
        for (let i = keys.length; i--;) {
            if (e.code === keys[i]) {
                Scroll._preventDefault(e)
                return
            }
        }
    }

    /**
     *
     * @param e
     * @private
     */
    static _wheel (e: WheelEvent) {
        Scroll._preventDefault(e)
    }

    /**
     * Disable scroll.
     *
     * @return {void}
     */
    static disable () {
        if (window.addEventListener) {
            window.addEventListener('wheel', Scroll._wheel, false)
        }
        window.onmousewheel = document.onmousewheel = Scroll._wheel
        document.onkeydown = Scroll._keydown
    }

    /**
     * Enable scroll again.
     *
     * @return {void}
     */
    static enable () {
        if (window.removeEventListener) {
            window.removeEventListener('wheel', Scroll._wheel, false)
        }
        window.onmousewheel = document.onmousewheel = document.onkeydown = null
    }
}
