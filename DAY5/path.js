const path = require('path');

console.log("FILENAME: ", __filename);
console.log("DIRNAME: ", __dirname);    
// it is on commonjs module system, so we have to use __filename and __dirname to get the current file name and directory name respectively.

// if we want to get the current file name and directory name in ES6 module system, we can use import.meta.url to get the current file name and directory name respectively.    

// to get the current file name and directory name in ES6 module system, we can use import.meta.url to get the current file name and directory name respectively.

// to get the current file name and directory name in ES6 module system, we can use import.meta.url to get the current file name and directory name respectively.   

// shool management system

//join
const filePath = path.join(__dirname, 'data', 'students.json');
// why we use path.join? because it will join the path and return the absolute path of the file. it will also take care of the different operating system path separator. for example, in windows it will use backslash (\) as a path separator and in linux it will use forward slash (/) as a path separator. so, we can use path.join to get the absolute path of the file regardless of the operating system.

console.log("FILE PATH: ", filePath);

const parsePath = path.parse(filePath);
// why we use path.parse? because it will parse the path and return an object with the following properties: root, dir, base, ext, name. for example, if the file name is C:\Users\user\Desktop\students.json, it will return { root: 'C:\\', dir: 'C:\\Users\\user\\Desktop', base: 'students.json', ext: '.json', name: 'students' }. if the file name is /home/user/students.json, it will return { root: '/', dir: '/home/user', base: 'students.json', ext: '.json', name: 'students' }. so, we can use path.parse to get the different parts of the file path.
console.log("PARSED PATH: ", parsePath);

const resolvedPath = path.resolve(filePath);
// why we use path.resolve? because it will resolve the path and return the absolute path of the file. it will also take care of the different operating system path separator. for example, in windows it will use backslash (\) as a path separator and in linux it will use forward slash (/) as a path separator. so, we can use path.resolve to get the absolute path of the file regardless of the operating system.

const extname = path.extname(filePath);
// why we use path.extname? because it will return the extension of the file. for example, if the file name is students.json, it will return .json. if the file name is students.txt, it will return .txt. so, we can use path.extname to get the extension of the file.
console.log("FILE EXTENSION: ", extname);

const basename = path.basename(filePath);
// why we use path.basename? because it will return the base name of the file. for example, if the file name is students.json, it will return students.json. if the file name is students.txt, it will return students.txt. so, we can use path.basename to get the base name of the file.
console.log("FILE BASE NAME: ", basename);

const dirname = path.dirname(filePath);
// why we use path.dirname? because it will return the directory name of the file. for example, if the file name is C:\Users\user\Desktop\students.json, it will return C:\Users\user\Desktop. if the file name is /home/user/students.json, it will return /home/user. so, we can use path.dirname to get the directory name of the file.
console.log("FILE DIRECTORY NAME: ", dirname);
