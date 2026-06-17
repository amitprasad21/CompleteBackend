/**
 * ==========================================================
 * NODE.JS CUSTOM STREAMS (Readable, Writable, Duplex, Transform)
 * + PIPELINE EXAMPLE (Industry Standard)
 * ==========================================================
 */

const {
    Readable,
    Writable,
    Duplex,
    Transform
} = require("stream");


/**
 * ==========================================================
 * 1. READABLE STREAM
 * ==========================================================
 * Definition:
 * A Readable Stream is used to READ data from a source.
 *
 * Examples:
 * - File Reading
 * - Database Records
 * - API Responses
 * - Kafka Messages
 * ==========================================================
 */

class UserReadableStream extends Readable {

    constructor(users) {
        super({ objectMode: true });
        this.users = users;
    }

    _read() {

        if (this.users.length === 0) {
            this.push(null); // End Stream
        } else {
            this.push(this.users.shift());
        }
    }
}


/**
 * ==========================================================
 * 2. TRANSFORM STREAM
 * ==========================================================
 * Definition:
 * Reads data, modifies it, and passes it forward.
 *
 * Examples:
 * - JSON.stringify()
 * - Encryption
 * - Compression
 * - Data Formatting
 * ==========================================================
 */

class JsonTransformStream extends Transform {

    constructor() {
        super({ objectMode: true });
    }

    _transform(chunk, encoding, callback) {

        const transformedData = JSON.stringify({
            ...chunk,
            processedAt: new Date().toISOString()
        });

        callback(null, transformedData);
    }
}


/**
 * ==========================================================
 * 3. DUPLEX STREAM
 * ==========================================================
 * Definition:
 * Can READ and WRITE both.
 *
 * Examples:
 * - TCP Socket
 * - WebSocket
 * - Chat Application
 * ==========================================================
 */

class LoggerDuplexStream extends Duplex {

    constructor() {
        super();
    }

    _write(chunk, encoding, callback) {

        console.log(
            "\n[DUPLEX WRITE]",
            chunk.toString()
        );

        // Send same data back
        this.push(
            `[DUPLEX RESPONSE] ${chunk}`
        );

        callback();
    }

    _read() {}
}


/**
 * ==========================================================
 * 4. WRITABLE STREAM
 * ==========================================================
 * Definition:
 * Consumes data and writes it to destination.
 *
 * Examples:
 * - File Writing
 * - Database Insert
 * - Logging System
 * - API Storage Layer
 * ==========================================================
 */

class FinalWritableStream extends Writable {

    constructor() {
        super();
    }

    _write(chunk, encoding, callback) {

        console.log(
            "\n[WRITABLE OUTPUT]"
        );

        console.log(chunk.toString());

        callback();
    }
}


/**
 * ==========================================================
 * PIPELINE SCENARIO
 * ==========================================================
 *
 * Source Users
 *      │
 *      ▼
 * Readable Stream
 *      │
 *      ▼
 * Transform Stream
 * (JSON.stringify)
 *      │
 *      ▼
 * Writable Stream
 *
 * This is exactly how data flows in:
 * - ETL Pipelines
 * - Kafka Consumers
 * - Log Processing Systems
 * - Analytics Platforms
 * ==========================================================
 */

const users = [
    {
        id: 1,
        name: "Amit",
        role: "Backend Developer"
    },
    {
        id: 2,
        name: "Rahul",
        role: "Frontend Developer"
    }
];

const readableStream =
    new UserReadableStream(users);

const transformStream =
    new JsonTransformStream();

const writableStream =
    new FinalWritableStream();


// Industry Standard Pipe Usage
readableStream
    .pipe(transformStream)
    .pipe(writableStream);


/**
 * ==========================================================
 * DUPLEX STREAM DEMO
 * ==========================================================
 */

const duplex =
    new LoggerDuplexStream();

duplex.on("data", (chunk) => {

    console.log(
        "\n[DUPLEX READ]"
    );

    console.log(chunk.toString());
});

duplex.write("Hello Node.js Streams");


/**
 * ==========================================================
 * EXPECTED OUTPUT
 * ==========================================================
 *
 * [WRITABLE OUTPUT]
 * {"id":1,"name":"Amit","role":"Backend Developer","processedAt":"..."}
 *
 * [WRITABLE OUTPUT]
 * {"id":2,"name":"Rahul","role":"Frontend Developer","processedAt":"..."}
 *
 * [DUPLEX WRITE]
 * Hello Node.js Streams
 *
 * [DUPLEX READ]
 * [DUPLEX RESPONSE] Hello Node.js Streams
 *
 * ==========================================================
 */


/**
 * ==========================================================
 * NODE.JS PIPELINE
 * ==========================================================
 *
 * Definition:
 * Pipeline is a utility provided by Node.js that connects
 * multiple streams together and manages the complete flow
 * of data automatically.
 *
 * It is considered the industry-standard way of handling
 * streams because it:
 *
 * ✅ Connects streams together
 * ✅ Handles errors automatically
 * ✅ Prevents memory issues (Backpressure)
 * ✅ Closes streams when processing is completed
 * ✅ Produces cleaner and maintainable code
 *
 * ----------------------------------------------------------
 * Data Flow
 * ----------------------------------------------------------
 *
 * Source Data
 *      │
 *      ▼
 * Readable Stream
 *      │
 *      ▼
 * Transform Stream
 *      │
 *      ▼
 * Writable Stream
 *
 * ----------------------------------------------------------
 * Real World Examples
 * ----------------------------------------------------------
 *
 * File Upload
 * Read Stream → Compression → Storage
 *
 * Video Streaming
 * Video File → Encoder → Client
 *
 * ETL Pipeline
 * Database → Validation → Data Warehouse
 *
 * Log Processing
 * Log File → Parser → Analytics System
 *
 * ==========================================================
 */

const { pipeline } = require("stream");

/**
 * ----------------------------------------------------------
 * Pipeline Syntax
 * ----------------------------------------------------------
 *
 * pipeline(
 *      sourceStream,
 *      transformStream,
 *      destinationStream,
 *      callback
 * );
 *
 * Output of one stream becomes the input
 * of the next stream automatically.
 *
 * Equivalent To:
 *
 * readable
 *    .pipe(transform)
 *    .pipe(writable);
 *
 * But pipeline() provides better error handling.
 * ----------------------------------------------------------
 */

pipeline(

    /**
     * READABLE STREAM
     * Source of data
     *
     * Example:
     * File
     * Database
     * API
     * Kafka Topic
     */
    readable,

    /**
     * TRANSFORM STREAM
     * Modifies data while passing through.
     *
     * Examples:
     * JSON.stringify()
     * Compression
     * Encryption
     * Validation
     */
    transform,

    /**
     * WRITABLE STREAM
     * Final destination of data.
     *
     * Examples:
     * File System
     * Database
     * Console
     * HTTP Response
     */
    writable,

    /**
     * CALLBACK
     *
     * Executed once the entire pipeline
     * is completed or failed.
     */
    (err) => {

        /**
         * If any stream throws an error:
         *
         * Readable Error
         * Transform Error
         * Writable Error
         *
         * Pipeline automatically destroys
         * all connected streams and passes
         * the error here.
         */

        if (err) {

            console.error(
                "❌ Pipeline Failed"
            );

            console.error(err);

        } else {

            /**
             * Executed when:
             * - All data processed
             * - All streams closed successfully
             * - No errors occurred
             */

            console.log(
                "✅ Pipeline Completed Successfully"
            );
        }
    }
);


/**
 * ==========================================================
 * THEORY: WHY PIPELINE IS BETTER THAN PIPE()
 * ==========================================================
 *
 * PIPE()
 *
 * readable
 *    .pipe(transform)
 *    .pipe(writable);
 *
 * Pros:
 * ✔ Easy to write
 * ✔ Good for small applications
 *
 * Cons:
 * ❌ Manual error handling
 * ❌ Must listen to multiple stream errors
 *
 *
 * PIPELINE()
 *
 * pipeline(
 *     readable,
 *     transform,
 *     writable,
 *     callback
 * );
 *
 * Pros:
 * ✔ Centralized Error Handling
 * ✔ Automatic Cleanup
 * ✔ Backpressure Management
 * ✔ Production Ready
 * ✔ Recommended by Node.js
 *
 * ==========================================================
 * INTERVIEW ANSWER
 * ==========================================================
 *
 * "Pipeline is a Node.js utility that connects multiple
 * streams together and automatically manages data flow,
 * backpressure, error handling, and stream cleanup.
 * It is preferred over pipe() in production applications
 * because it provides centralized error management and
 * safer stream processing."
 * ==========================================================
 */