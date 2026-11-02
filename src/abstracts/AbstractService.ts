/*
 * Copyright © 2017, Rezo Zero
 *
 * @file AbstractService.js
 * @author Adrien Scholaert <adrien@rezo-zero.com>
 */

import UnknownServiceException from '../errors/UnknownServiceException'
import DependencyNotFulfilledException from '../errors/DependencyNotFulfilledException'
import { Container } from '../container/ServiceContainer'

export default class AbstractService {

    private _container: Container;
    private _serviceName;

    // Accepts any object so subclasses typing their container loosely keep compiling.
    constructor (container: object = {}, serviceName = 'AbstractService', dependencies = ['Config']) {
        this._container = container as Container
        this._serviceName = serviceName

        this.checkDependencies(dependencies)
    }

    init () {}

    hasService (serviceName: string) {
        return Object.prototype.hasOwnProperty.call(this._container, serviceName)
    }

    checkDependencies (dependencies: string[] = []) {
        for (const serviceName of dependencies) {
            if (!this.hasService(serviceName)) {
                throw new DependencyNotFulfilledException(this._serviceName, serviceName)
            }
        }
    }

    getService (serviceName: string) {
        if (!this.hasService(serviceName)) {
            throw new UnknownServiceException(serviceName)
        }

        return this._container[serviceName]
    }

    get serviceName () {
        return this._serviceName
    }

    set serviceName (value) {
        this._serviceName = value
    }

    get container () {
        return this._container
    }

    set container (value) {
        this._container = value
    }
}
