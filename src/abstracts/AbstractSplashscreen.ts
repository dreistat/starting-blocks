/*
 * Copyright © 2017, Rezo Zero
 *
 * @file AbstractSplashscreen.js
 * @author Adrien Scholaert <adrien@rezo-zero.com>
 */

import AbstractBootableService from './AbstractBootableService'

export default class AbstractSplashscreen extends AbstractBootableService {

    private _splashscreenHidden: boolean

    constructor (container: object, serviceName = 'AbstractSplashscreen') {
        super(container, serviceName)

        this._splashscreenHidden = false
    }

    set splashscreenHidden (value) {
        this._splashscreenHidden = value
    }

    get splashscreenHidden () {
        return this._splashscreenHidden
    }

    hide () {
        return Promise.resolve()
    }
}
