export function debounce<T extends (...args: any[]) => void>(func: T, delay: number): (...args: Parameters<T>) => void {
    let timeoutId: ReturnType<typeof setTimeout>;
    return (...args: Parameters<T>) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func(...args), delay);
    };
}

export function throttle<T extends (...args: any[]) => void>(func: T, limit: number): (...args: Parameters<T>) => void {
    let lastFunc: ReturnType<typeof setTimeout>;
    let lastRan: number;
    return (...args: Parameters<T>) => {
        const context = this;
        if (!lastRan) {
            func.apply(context, args);
            lastRan = Date.now();
        }
        clearTimeout(lastFunc);
        lastFunc = setTimeout(() => {
            if ((Date.now() - lastRan) >= limit) {
                func.apply(context, args);
                lastRan = Date.now();
            }
        }, limit - (Date.now() - lastRan));
    };
}

export function uniqueArray<T>(array: T[]): T[] {
    return Array.from(new Set(array));
}

export function deepClone<T>(obj: T): T {
    return JSON.parse(JSON.stringify(obj));
}

export function flattenArray<T>(array: T[][]): T[] {
    return array.reduce((acc, val) => acc.concat(val), []);
}
