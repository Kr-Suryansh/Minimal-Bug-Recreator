const babelParser = require('@babel/parser');

function parseCode(code) {
    // Returns AST for given JS code
    return babelParser.parse(code, {
        sourceType: "module",
        plugins: ["jsx"]
    });
}

module.exports = { parseCode };
