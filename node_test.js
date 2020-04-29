const smaz = require("./smaz");
var result = smaz.decompress(smaz.compress("hello world"));
console.log(result);
