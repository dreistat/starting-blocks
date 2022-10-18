/*
 * Copyright © 2017, Rezo Zero
 *
 * @file DependencyNotFulfilledException.js
 * @author Adrien Scholaert <adrien@rezo-zero.com>
 */

export default class DependencyNotFulfilledException extends Error {
    constructor (firstServiceName: string, secondeServiceName: string) {
        super(`Object of type "${firstServiceName}" needs "${secondeServiceName}" service`)
        this.name = `DependencyNotFulfilledException`
    }
}
