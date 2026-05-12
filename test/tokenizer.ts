import { Tokenizer, DEBUGGER } from "../src/index.js";

let test_expression = '5 + . .7 + 69 + wtfminimummaximumrandomahhsinpilover(pi , tau, e)';

let NormalTokenizer = new Tokenizer();
let BlankTokenizer = new Tokenizer({
    operators: new Map(),
    identifiers: {
        variables: new Map(),
        functions: new Map()
    }
});

DEBUGGER.testTokenizer(NormalTokenizer, test_expression);
DEBUGGER.testTokenizer(BlankTokenizer, test_expression);