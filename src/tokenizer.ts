import { Context, DEFAULT_CONTEXT } from "./context.js";

export type Token = { type: TokenType, value: number | string };
export enum TokenType {
    Invalid, Constant,
    Text, Operator,
    Variable, Function,
    BracketOpen, BracketClose, Comma
};

export class Tokenizer {
    context : Context = DEFAULT_CONTEXT;
    identifiers : Array<string> = [];

    refreshIdentifiers() {
        this.identifiers = [];
        this.identifiers.push(...this.context.identifiers.variables.keys());
        this.identifiers.push(...this.context.identifiers.functions.keys());
        this.identifiers.sort((a : string, b : string) => b.length - a.length);
    }

    getTokenType(char: string): TokenType {
        if (char >= "a" && char <= "z" || char >= "A" && char <= "Z" || char === '_') return TokenType.Text;
        if (char >= "0" && char <= "9" || char === '.') return TokenType.Constant;
        if (this.context.operators.has(char)) return TokenType.Operator;
        if ('([{'.includes(char)) return TokenType.BracketOpen;
        if ('}])'.includes(char)) return TokenType.BracketClose;
        if (char === ',') return TokenType.Comma;
        return TokenType.Invalid
    }

    checkIdentifiers(text : string) : Array<Token> {
        if (text === '') return [];
        if (this.context.identifiers.variables.has(text)) return [{type: TokenType.Variable, value: text}];
        if (this.context.identifiers.functions.has(text)) return [{type: TokenType.Function, value: text}];

        let res : Array<Token> = [];

        for (let i = 0; i < this.identifiers.length; i++) {
            let identifier = this.identifiers[i];
            if (identifier.length >= text.length) continue;
            if (text.includes(identifier)) {
                let index : number = text.indexOf(identifier);
                let subs : Array<string> = [text.slice(0, index), text.slice(index + identifier.length)];
                let token : Token = {type: this.context.identifiers.variables.has(identifier) ? TokenType.Variable : TokenType.Function, value: identifier};
                res.push(...this.checkIdentifiers(subs[0]), token, ...this.checkIdentifiers(subs[1]));
                break;
            }
        }
        if (res.length === 0) res.push({type: TokenType.Text, value: text});
        return res;
    }

    run(expression: string) {
        this.refreshIdentifiers();
        const accumulate = (type: TokenType): string => {
            let accumulator: string = expression[i];
            for (0; i < expression.length; i++) {
                if (this.getTokenType(expression[i + 1]) === type) accumulator += expression[i + 1];
                else break;
            }
            return accumulator;
        }

        let i = 0;
        let arr: Array<Token> = [];

        for (0; i < expression.length; i++) {
            let char = expression[i];
            if (char === ' ') continue;
            let type: TokenType = this.getTokenType(char);
            switch (type) {
                case TokenType.Constant:
                    arr.push({ type: TokenType.Constant, value: parseFloat(accumulate(TokenType.Constant)) });
                    break;
                case TokenType.Text:
                    arr.push(...this.checkIdentifiers(accumulate(TokenType.Text)));
                    break;
                default:
                    arr.push({ type: type, value: char });
            }
        }
        return arr;
    }
}