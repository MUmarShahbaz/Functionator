import { Token, TokenType, Tokenizer } from "./tokenizer.js";

export function testTokenizer(tokenizer: Tokenizer, expression : string) {
    let tokens: Array<Token> = tokenizer.run(expression);
    console.log('Testing Tokenizer:\n');
    console.log(tokenizer);
    console.log('\nRaw Output:\n');
    console.log(tokens);
    console.log('\nFormatted Output:\n');
    for (let i = 0; i < tokens.length; i++) {
        console.log(`Token: ${tokens[i].value}\t, Type: ${TokenType[tokens[i].type]}`)
    }
}