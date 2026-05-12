import { Context, DEFAULT_CONTEXT, Token, TokenType } from "./index.js";

export type Group = { brackets: '()' | '[]' | '{}', closed : boolean, depth : number, contents: Array<Token | Group> };

export class Parser {
    context: Context

    constructor(context: Context = DEFAULT_CONTEXT) {
        this.context = context;
    }

    bracketHandler(tokens: Array<Token>): Group {
        let i = 0;
        let stack: Array<string> = [];

        const BracketMap = new Map([
            ['(', ')'],
            ['[', ']'],
            ['{', '}']
        ]);

        const closeBracket = (outer: boolean = false): Group => {
            let group: Group = {
                brackets: outer ? '()' : (tokens[i].value + (BracketMap.get(tokens[i].value as string) as string)) as Group["brackets"],
                closed: outer ? true : false,
                depth: stack.length,
                contents: outer ? [tokens[i]] : []
            };

            for (i++; i < tokens.length; i++) {
                switch (tokens[i].type) {
                    case TokenType.BracketOpen:
                        stack.push(tokens[i].value as string);
                        group.contents.push(closeBracket());
                        break;
                    case TokenType.BracketClose:
                        const PrematureBracketClose = new Error(`A bracket closed prematurely. at index ${i}`);
                        if (stack.length === 0) throw PrematureBracketClose;
                        if (BracketMap.get(stack.pop() as string) === tokens[i].value){
                            group.closed = true;
                            return group;
                        }
                        else throw PrematureBracketClose;
                    default:
                        group.contents.push(tokens[i]);
                        break;
                }
            }

            return group
        };

        return closeBracket(true);
    }
}