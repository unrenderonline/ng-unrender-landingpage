
// Mocks for Node.js modules not available in the browser
export const fs = {};
export const path = {
    dirname: (p: string) => p,
    resolve: (...args: string[]) => args.join('/'),
    join: (...args: string[]) => args.join('/'),
    sep: '/'
};
