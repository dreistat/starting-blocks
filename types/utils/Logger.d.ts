export declare function log(...args: any[]): void;
export declare function debug(message: string, color?: string): void;
export declare function info(...args: any[]): void;
export declare function warn(...args: any[]): void;
export declare function error(...args: any[]): void;
declare const logger: {
    log: typeof log;
    debug: typeof debug;
    info: typeof info;
    warn: typeof warn;
    error: typeof error;
};
export default logger;
//# sourceMappingURL=Logger.d.ts.map