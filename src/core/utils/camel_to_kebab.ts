export const camel_to_kebab = <T>(str: T) => String(str).replace(/[A-Z]/g, '-$&').toLowerCase();
