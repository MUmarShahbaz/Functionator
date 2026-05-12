import { Context, DEFAULT_CONTEXT } from "./context.js";
import { Token, TokenType, Tokenizer } from "./tokenizer.js";
import { Group, Parser } from "./parser.js";

class Functionator {
    context : Context;
    tokenizer : Tokenizer;
    parser : Parser;

    constructor(context : Context = DEFAULT_CONTEXT) {
        this.context = context
        this.tokenizer  = new Tokenizer(context);
        this.parser = new Parser(context);
    }

    tokenize(expression : string) {
        return this.tokenizer.run(expression);
    }

    parse(expression : string | Array<Token>) {
        if (Array.isArray(expression)) return this.parser.bracketHandler(expression);
        else return this.parser.bracketHandler(this.tokenizer.run(expression));
    }
}

export {
    Context,
    DEFAULT_CONTEXT,
    Token,
    TokenType,
    Tokenizer,
    Group,
    Parser,
    Functionator
}