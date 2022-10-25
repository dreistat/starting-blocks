/*
 * Copyright © 2017, Rezo Zero
 *
 * @file debug.js
 * @author Adrien Scholaert <adrien@rezo-zero.com>
 */

export function log (...args: any[]) {
    if (window.startingBlocksDebugLevel === 1) {
        console.log('[SB]', ...args)
    }
}

export function debug (message: string, color = '') {
    if (window.startingBlocksDebugLevel === 1) {
        console.debug(`%c[SB] %c${message}`, 'color:#749f73', 'color:debug', color)
    }
}

export function info (...args: any[]) {
    if (window.startingBlocksDebugLevel === 1) {
        console.info('[SB]', ...args)
    }
}

export function warn (...args: any[]) {
    if (window.startingBlocksDebugLevel === 1) {
        console.warn('[SB]', ...args)
    }
}

export function error (...args: any[]) {
    if (window.startingBlocksDebugLevel === 1) {
        console.error('[SB]', ...args)
    }
}

const logger = {
    log,
    debug,
    info,
    warn,
    error,
}

export default logger

