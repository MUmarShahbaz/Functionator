import { TokenType, tokenize } from "./tokenizer.js";

let tokens = tokenize('5 + 67 + 69 + func(x)');

for (let i = 0; i < tokens.length; i++) {
    console.log(`Token: ${tokens[i].value}\t, Type: ${TokenType[tokens[i].type]}`)
}