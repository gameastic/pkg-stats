export const patch = (f: CallableFunction, c: CallableFunction): ((...args: unknown[]) => void) => {
    return function (...args: unknown[]) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        c.apply(this, args);

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        f.apply(this, args);
    };
};
