const fs = require('fs');

/*
====================================================
1. writeFileSync()
====================================================
Definition:
Creates a new file and writes data to it.
If the file already exists, its content is overwritten.
Synchronous (Blocking).
*/

fs.writeFileSync('./sync.txt', 'Hello from writeFileSync');
console.log('sync.txt created');


/*
====================================================
2. writeFile()
====================================================
Definition:
Creates a file and writes data asynchronously.
Non-blocking.
*/

fs.writeFile('./async.txt', 'Hello from writeFile', (err) => {
    if (err) console.log(err);
    else console.log('async.txt created');
});


/*
====================================================
3. readFileSync()
====================================================
Definition:
Reads a file synchronously and returns its content.
Blocking operation.
*/

const syncData = fs.readFileSync('./sync.txt', 'utf-8');
console.log('\nreadFileSync Output:');
console.log(syncData);


/*
====================================================
4. readFile()
====================================================
Definition:
Reads a file asynchronously.
Returns data inside callback.
*/

fs.readFile('./async.txt', 'utf-8', (err, data) => {
    if (err) console.log(err);
    else {
        console.log('\nreadFile Output:');
        console.log(data);
    }
});


/*
====================================================
5. appendFileSync()
====================================================
Definition:
Adds new content at the end of a file.
Creates file if it does not exist.
Blocking operation.
*/

fs.appendFileSync(
    './sync.txt',
    '\nAppended using appendFileSync'
);

console.log('Data appended to sync.txt');


/*
====================================================
6. appendFile()
====================================================
Definition:
Adds data to a file asynchronously.
*/

fs.appendFile(
    './async.txt',
    '\nAppended using appendFile',
    (err) => {
        if (err) console.log(err);
        else console.log('Data appended to async.txt');
    }
);


/*
====================================================
7. existsSync()
====================================================
Definition:
Checks whether a file or folder exists.
Returns true or false.
*/

const fileExists = fs.existsSync('./sync.txt');
console.log('\nFile Exists:', fileExists);


/*
====================================================
8. mkdirSync()
====================================================
Definition:
Creates a directory (folder).
*/

if (!fs.existsSync('./demo-folder')) {
    fs.mkdirSync('./demo-folder');
    console.log('Folder created');
}


/*
====================================================
9. readdirSync()
====================================================
Definition:
Reads all files/folders inside a directory.
Returns an array.
*/

const files = fs.readdirSync('./');
console.log('\nFiles in Current Directory:');
console.log(files);


/*
====================================================
10. statSync()
====================================================
Definition:
Returns information about a file/folder.
*/

const stats = fs.statSync('./sync.txt');

console.log('\nFile Information:');
console.log('Size:', stats.size);
console.log('Is File:', stats.isFile());
console.log('Is Directory:', stats.isDirectory());
console.log('Created:', stats.birthtime);


/*
====================================================
11. renameSync()
====================================================
Definition:
Renames a file or folder.
*/

fs.renameSync('./sync.txt', './renamed-sync.txt');
console.log('\nFile renamed');


/*
====================================================
12. copyFileSync()
====================================================
Definition:
Copies a file from source to destination.
*/

fs.copyFileSync(
    './renamed-sync.txt',
    './copy-sync.txt'
);

console.log('File copied');


/*
====================================================
13. cpSync()
====================================================
Definition:
Copies an entire folder recursively.
*/

fs.cpSync(
    './demo-folder',
    './demo-folder-copy',
    { recursive: true }
);

console.log('Folder copied');


/*
====================================================
14. unlinkSync()
====================================================
Definition:
Deletes a file.
*/

fs.unlinkSync('./copy-sync.txt');
console.log('Copied file deleted');


/*
====================================================
15. rmSync()
====================================================
Definition:
Deletes files/folders recursively.
Modern replacement for rmdirSync().
*/

fs.rmSync('./demo-folder-copy', {
    recursive: true,
    force: true
});

console.log('Folder removed');


/*
====================================================
16. rmdirSync()
====================================================
Definition:
Removes an EMPTY directory.
(Deprecated in modern Node.js)
*/

if (
    fs.existsSync('./demo-folder') &&
    fs.readdirSync('./demo-folder').length === 0
) {
    fs.rmdirSync('./demo-folder');
    console.log('Empty folder deleted');
}


/*
====================================================
17. watch()
====================================================
Definition:
Monitors file changes in real time.
*/

fs.watch('./renamed-sync.txt', (eventType) => {
    console.log(`File changed: ${eventType}`);
});


/*
====================================================
18. createReadStream()
====================================================
Definition:
Reads large files in chunks instead of loading
the entire file into memory.
*/

const readStream = fs.createReadStream(
    './renamed-sync.txt',
    'utf-8'
);

readStream.on('data', (chunk) => {
    console.log('\nStream Data:');
    console.log(chunk);
});


/*
====================================================
19. createWriteStream()
====================================================
Definition:
Writes data to a file in chunks.
Useful for large files.
*/

const writeStream = fs.createWriteStream('./stream.txt');

writeStream.write('Line 1\n');
writeStream.write('Line 2\n');
writeStream.end();

console.log('Stream file created');


