export type Context = {
    operators: Map<string, {arity: 1 | 2, fn: (...a: number[]) => number}>;
    identifiers: {
        variables: Map<string, number>;
        functions: Map<string, (...a: number[]) => number>;
    };
};

export const DEFAULT_CONTEXT: Context = {
    operators: new Map([
        ['+',{ arity: 2, fn: (a: number, b: number) => { return a + b }}],
        ['-',{ arity: 2, fn: (a: number, b: number) => { return a - b }}],
        ['*',{ arity: 2, fn: (a: number, b: number) => { return a * b }}],
        ['/',{ arity: 2, fn: (a: number, b: number) => { return a / b }}],
        ['^',{ arity: 2, fn: (a: number, b: number) => { return a ** b }}],
        ['%',{ arity: 2, fn: (a: number, b: number) => { return a % b }}],
        ['!',{ arity: 1, fn: (a: number) => {
            let res = 1;
            for (let i = 2; i <= a; i++) res *= i;
            return res;
        }}]
    ]),
    identifiers: {
        variables: new Map([
            ['π', Math.PI],
            ['pi', Math.PI],
            ['tau', Math.PI * 2],
            ['e', Math.E]
        ]),
        functions: new Map([
            ['abs', (a: number) => { return Math.abs(a) }],
            ['round', (a: number) => { return Math.round(a) }],
            ['floor', (a: number) => { return Math.floor(a) }],
            ['ceil', (a: number) => { return Math.ceil(a) }],
            ['trunc', (a: number) => { return Math.trunc(a) }],
            ['sign', (a: number) => { return Math.sign(a) }],
            ['sin', (a: number) => { return Math.sin(a) }],
            ['cos', (a: number) => { return Math.cos(a) }],
            ['tan', (a: number) => { return Math.tan(a) }],
            ['asin', (a: number) => { return Math.asin(a) }],
            ['acos', (a: number) => { return Math.acos(a) }],
            ['atan', (a: number) => { return Math.atan(a) }],
            ['atan2', (b: number, a: number) => { return Math.atan2(a, b) }],
            ['sinh', (a: number) => { return Math.sinh(a) }],
            ['cosh', (a: number) => { return Math.cosh(a) }],
            ['tanh', (a: number) => { return Math.tanh(a) }],
            ['asinh', (a: number) => { return Math.asinh(a) }],
            ['acosh', (a: number) => { return Math.acosh(a) }],
            ['atanh', (a: number) => { return Math.atanh(a) }],
            ['pow', (a: number, b: number) => { return Math.pow(a, b) }],
            ['sqrt', (a: number) => { return Math.sqrt(a) }],
            ['cbrt', (a: number) => { return Math.cbrt(a) }],
            ['exp', (a: number) => { return Math.exp(a) }],
            ['expm1', (a: number) => { return Math.expm1(a) }],
            ['log', (a: number) => { return Math.log(a) }],
            ['log2', (a: number) => { return Math.log2(a) }],
            ['log10', (a: number) => { return Math.log10(a) }],
            ['log1p', (a: number) => { return Math.log1p(a) }],
            ['min', (...a: number[]) => { return Math.min(...a) }],
            ['max', (...a: number[]) => { return Math.max(...a) }],
            ['random', () => { return Math.random() }],
        ]),
    }
}