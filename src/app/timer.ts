export function timer(target: any, key: string, descriptor: PropertyDescriptor) {
    // Get the original method so we can call it from within our wrapper
    const originalMethod = descriptor.value;

    descriptor.value = function () {
        // Time it
        const start = window.performance.now();
        const resp = originalMethod.apply(this, arguments);
        const end = window.performance.now() - start;

        // Log it
        (<any>window)['timer'] = end;
        console.log(`${end} microseconds`);

        // Return it
        return resp;
    };
}
