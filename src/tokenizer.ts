export type Token = { type: TokenType, value: number | string };
export enum TokenType { Text, Constant, Operator, Dot, BracketOpen, BracketClose, SqBracketOpen, SqBracketClose, CuBracketOpen, CuBracketClose, Invalid }

export class Tokenizer {
    getTokenType(char: string): TokenType {
        if (char >= "a" && char <= "z" || char >= "A" && char <= "Z") return TokenType.Text;
        if (char >= "0" && char <= "9") return TokenType.Constant;
        if ("+-*/".includes(char)) return TokenType.Operator;
        if (char === '.') return TokenType.Dot;
        if (char === '(') return TokenType.BracketOpen;
        if (char === ')') return TokenType.BracketClose;
        if (char === '[') return TokenType.SqBracketOpen;
        if (char === ']') return TokenType.SqBracketClose;
        if (char === '{') return TokenType.CuBracketOpen;
        if (char === '}') return TokenType.CuBracketClose;
        return TokenType.Invalid
    }

    run(expression: string) {
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
                    arr.push({ type: TokenType.Constant, value: parseInt(accumulate(TokenType.Constant)) });
                    break;
                case TokenType.Text:
                    arr.push({ type: TokenType.Text, value: accumulate(TokenType.Text) });
                    break;
                default:
                    arr.push({ type: type, value: char });
            }
        }
        return arr;
    }
}