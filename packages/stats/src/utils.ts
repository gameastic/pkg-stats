export const patch = (f: CallableFunction, c: CallableFunction): ((...args: unknown[]) => void) => {
    return function (...args: unknown[]) {
        // @ts-expect-error
        c.apply(this, args);
        // @ts-expect-error
        f.apply(this, args);
    };
};
