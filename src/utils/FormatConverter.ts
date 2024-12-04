
export const toCamelCase = (obj: any): any => {
    if (Array.isArray(obj)) {
        return obj.map(toCamelCase);
    } else if (obj && typeof obj === "object") {
        return Object.entries(obj).reduce((acc, [key, value]) => {
            const camelKey = key.replace(/_([a-z])/g, (_, char) => char.toUpperCase());
            acc[camelKey] = toCamelCase(value);
            return acc;
        }, {} as any);
    }
    return obj;
};

export const toSnakeCase = (obj: any): any => {
    if (Array.isArray(obj)) {
        return obj.map(toSnakeCase);
    } else if (obj && typeof obj === "object") {
        return Object.entries(obj).reduce((acc, [key, value]) => {
            const snakeKey = key.replace(/[A-Z]/g, (char) => `_${char.toLowerCase()}`);
            acc[snakeKey] = toSnakeCase(value);
            return acc;
        }, {} as any);
    }
    return obj;
};