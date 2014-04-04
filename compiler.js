var fs = require('fs');
var data = fs.readFileSync('README.precode.md').toString();

var injectClass = function(func, name) {
    if (name === null && name === undefined) {
        return func.toString();
    } else {
        return 'var ' + name + ' = ' + func.toString();
    }
}
var ind = -1;

while ((ind = data.indexOf('gce', ind + 1)) > -1) {
    var startBlock = data.substring(0, ind);
    var end = data.indexOf('\n', ind);
    var endBlock = data.substring(end);
    var code = eval(data.substring(ind + 5, data.indexOf('\n', ind)));
    code = '```javascript\n' + code + '\n```';
    fs.writeFileSync('README.md', startBlock + code + endBlock);
    data = fs.readFileSync('README.md').toString();
}
