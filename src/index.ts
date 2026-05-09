import { Token, TokenType, Tokenizer } from "./tokenizer.js";

let expression = '5 + 67 + 69 + func(x)';


let myTokenizer = new Tokenizer();
let tokens : Array<Token> = myTokenizer.run(expression);

for (let i = 0; i < tokens.length; i++) {
    console.log(`Token: ${tokens[i].value}\t, Type: ${TokenType[tokens[i].type]}`)
}