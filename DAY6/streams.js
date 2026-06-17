const {Readable, Writable} = require('stream');

// Create Readable Stream
const readableStream = new Readable({
    highWaterMark: 16, // 16 bytes
    read(){}
});

// Create Writable Stream
const writableStream = new Writable({
    write(streamData){
        console.log(`Writing Chunk: ${streamData.toString()}`); 

    }
});

readableStream.on('data', (chunk) => {
    console.log(`Received Chunk: ${chunk.toString()}`);
    writableStream.write(chunk);
});

// Push data to the Readable Stream
console.log(readableStream.push('Hello'));
console.log(readableStream.push(null)); // Signal end of data