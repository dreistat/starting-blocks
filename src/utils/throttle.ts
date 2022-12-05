// Returns a function, that, when invoked, will only be triggered at most once
// during a given window of time. Normally, the throttled function will run
// as much as it can, without ever going more than once per `wait` duration;
// but if you'd like to disable the execution on the leading edge, pass
// `{leading: false}`. To disable execution on the trailing edge, ditto.

interface ThrottleOptions {
    leading?: boolean;
    trailing?: boolean;
}

export default function throttle(func: any, wait: number, options: ThrottleOptions) {
    let context: any, args: any, result: any;
    let timeout: number | null = null;
    let previous = 0;
    if (!options) options = {};
    let later = function() {
        previous = !options.leading ? 0 : Date.now();
        timeout = null;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
    };
    return function(this: any) {
        let now = Date.now();
        if (!previous && !options.leading) previous = now;
        let remaining = wait - (now - previous);
        context = this;
        args = arguments;
        if (remaining <= 0 || remaining > wait) {
            if (timeout) {
                clearTimeout(timeout);
                timeout = null;
            }
            previous = now;
            result = func.apply(context, args);
            if (!timeout) context = args = null;
        } else if (!timeout && options.trailing !== false) {
            timeout = setTimeout(later, remaining);
        }
        return result;
    };
}
