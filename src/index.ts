import { Token, TokenType, Tokenizer } from "./tokenizer.js";

let expression = '5 + . .7 + 69 + wtfminimummaximumrandomahhsinpilover(pi , tau, e)';

let myTokenizer = new Tokenizer();
let tokens : Array<Token> = myTokenizer.run(expression);
console.log(tokens);
for (let i = 0; i < tokens.length; i++) {
    console.log(`Token: ${tokens[i].value}\t, Type: ${TokenType[tokens[i].type]}`)
}