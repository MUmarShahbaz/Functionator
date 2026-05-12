import { Token, TokenType, Tokenizer } from "./tokenizer.js";

function testTokenizer(tokenizer: Tokenizer) {
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

let expression = '5 + . .7 + 69 + wtfminimummaximumrandomahhsinpilover(pi , tau, e)';

let NormalTokenizer = new Tokenizer();
let BlankTokenizer = new Tokenizer({
    operators: new Map(),
    identifiers: {
        variables: new Map(),
        functions: new Map()
    }
})

testTokenizer(NormalTokenizer);
testTokenizer(BlankTokenizer);