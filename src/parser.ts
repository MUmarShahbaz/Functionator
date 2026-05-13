import { Context, DEFAULT_CONTEXT, Token, TokenType } from "./index.js";

export type Group = { func: string | null , brackets: '()' | '[]' | '{}', closed : boolean, depth : number, contents: Array<Token | Group> };

export class Parser {
    context: Context

    constructor(context: Context = DEFAULT_CONTEXT) {
        this.context = context;
    }

    bracketHandler(tokens: Array<Token>): Array<Token | Group> {
        let i = 0;
        let stack: Array<string> = [];

        const BracketMap = new Map([
            ['(', ')'],
            ['[', ']'],
            ['{', '}']
        ]);

        const closeBracket = (func : string | null = null, outer: boolean = false): Group => {
            let group: Group = {
                func: func,
                brackets: outer ? '()' : (tokens[i].value + (BracketMap.get(tokens[i].value as string) as string)) as Group["brackets"],
                closed: false,
                depth: stack.length,
                contents: []
            };

            for (i = outer ? i : i + 1; i < tokens.length; i++) {
                const token = tokens[i];
                switch (token.type) {
                    case TokenType.Function:
                        const FaultyFunctions = new Error(`Expected '(' after '${token.value}' at index ${i}`);
                        if (tokens[++i].type === TokenType.BracketOpen) {
                            stack.push(tokens[i].value as string);
                            group.contents.push(closeBracket(token.value as string));
                        }
                        else throw FaultyFunctions;
                        break;
                    case TokenType.BracketOpen:
                        stack.push(token.value as string);
                        group.contents.push(closeBracket());
                        break;
                    case TokenType.BracketClose:
                        const PrematureBracketClose = new Error(`Unexpected '${token.value}' at index ${i}`);
                        if (stack.length === 0) throw PrematureBracketClose;
                        if (BracketMap.get(stack.pop() as string) === token.value){
                            group.closed = true;
                            return group;
                        }
                        else throw PrematureBracketClose;
                    default:
                        group.contents.push(token);
                        break;
                }
            }

            return group
        };

        return closeBracket(null, true).contents;
    }
}