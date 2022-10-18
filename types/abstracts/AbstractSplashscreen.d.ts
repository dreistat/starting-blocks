import AbstractBootableService from './AbstractBootableService';
export default class AbstractSplashscreen extends AbstractBootableService {
    private _splashscreenHidden;
    constructor(container: object, serviceName?: string);
    set splashscreenHidden(value: boolean);
    get splashscreenHidden(): boolean;
    hide(): Promise<void>;
}
//# sourceMappingURL=AbstractSplashscreen.d.ts.map