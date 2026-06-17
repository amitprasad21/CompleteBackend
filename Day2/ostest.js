const os = require('os');

console.log('Operating System Info:');
console.log('Platform:', os.platform());
console.log('Architecture:', os.arch());    
console.log('CPU Cores:', os.cpus().length);
console.log('Total Memory:', os.totalmem());
console.log('Free Memory:', os.freemem());