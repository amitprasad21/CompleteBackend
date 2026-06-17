// ======================================================
// Streams in Node.js - Reading, Downloading & Copying Files
// ======================================================

const http = require("http");
const fs = require("fs");

// Create HTTP Server
const server = http.createServer((req, res) => {

    // ==================================================
    // 1. Download File (Bad Approach ❌)
    // ==================================================
    // Problem:
    // - Loads the entire file into memory.
    // - Not suitable for large files.
    // - Can cause high memory consumption.

    /*
    const file = fs.readFileSync("sample.txt");

    res.end(file);
    */


    // ==================================================
    // 2. Download File (Good Approach ✅)
    // ==================================================
    // Advantage:
    // - Reads file in chunks.
    // - Uses very little memory.
    // - Best for large files.

    /*
    const readStream = fs.createReadStream("sample.txt");

    readStream.pipe(res);
    */


    // ==================================================
    // 3. Copy File (Bad Approach ❌)
    // ==================================================
    // Problem:
    // - Entire file is loaded into RAM.
    // - Not scalable for large files.

    /*
    const file = fs.readFileSync("sample.txt");

    fs.writeFileSync("copy.txt", file);

    res.end("File Copied Successfully!");
    */


    // ==================================================
    // 4. Copy File Using Streams (Manual Method ✅)
    // ==================================================
    // Flow:
    // sample.txt
    //      ↓
    // Read Stream
    //      ↓
    // Chunk by Chunk
    //      ↓
    // Write Stream
    //      ↓
    // copy.txt

    const readStream = fs.createReadStream("sample.txt");

    const writeStream = fs.createWriteStream("copy.txt");

    readStream.on("data", (chunk) => {

        console.log(
            `Received Chunk (${chunk.length} bytes)`
        );

        // Write each chunk to copy.txt
        writeStream.write(chunk);
    });

    readStream.on("end", () => {

        console.log("File Copy Completed");

        res.end("File Copied Successfully!");
    });

    readStream.on("error", (err) => {

        console.error(err.message);

        res.statusCode = 500;
        res.end("Error While Reading File");
    });

});


// ======================================================
// Start Server
// ======================================================

server.listen(8080, () => {
    console.log(
        "Server Running at http://localhost:8080"
    );
});