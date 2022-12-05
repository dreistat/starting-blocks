import throttle from './throttle';

interface DeltaScrollOptions {
    wait?: number;
    onUpdate?: (delta?: number) => void;
}

interface Options {
    wait: number;
    onUpdate: (delta?: number) => void;
}

export default class DeltaScroll {

    private options: Options;
    private lastScrollTop: number;
    private _handleScroll: (() => void);

    constructor(options?: DeltaScrollOptions) {

        this.options = {
            wait: 32,
            onUpdate: () => {},
            ...options,
        }
        this.lastScrollTop = 0;
        this._handleScroll = () => {};

        this.init();
    }

    private init() {
        this._handleScroll = throttle(this.handleScroll, this.options.wait);

        this.initEvents();
    }

    public destroy() {
        this.destroyEvents();
    }

    private initEvents() {
        window.addEventListener('scroll', this._handleScroll);
    }

    private destroyEvents() {
        window.addEventListener('scroll', this._handleScroll);
    }

    handleScroll = () => {

        let st = window.scrollY || document.documentElement.scrollTop;
        // normalize delta to the polling rate of the event listener throttle
        // or else delta will be different depending on the set 'wait' time.
        const delta = (st - this.lastScrollTop) * (1 / this.options.wait) * 100;
        this.lastScrollTop = st;

        if(typeof this.options.onUpdate === 'function') {
            this.options.onUpdate(delta);
        }

    }
}
