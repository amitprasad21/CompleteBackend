// ============================================================================
// DAY 4 - GLOBAL OBJECTS & MODULE WRAPPER FUNCTION IN NODE.JS
// ============================================================================
//
// In this file we will learn:
//
// 1. What are Global Objects?
// 2. Why console.log() works without importing anything?
// 3. How setTimeout() and setInterval() work?
// 4. What is the global object?
// 5. What is the process object?
// 6. Is require() a global object?
// 7. What is the Module Wrapper Function?
// 8. How __dirname and __filename work?
// 9. Difference between Global Objects and Module Variables
//
// ============================================================================



// ============================================================================
// SECTION 1 : GLOBAL OBJECTS
// ============================================================================
//
// Global Objects are objects that are available everywhere
// inside a Node.js application.
//
// You don't need:
//
// const console = require('console');
//
// or
//
// const setTimeout = require('setTimeout');
//
// They are automatically available.
//
// ============================================================================

console.log("Hello From Node.js Global Object");



// ============================================================================
// SECTION 2 : SETTIMEOUT
// ============================================================================
//
// setTimeout() is a global function.
//
// Purpose:
// Execute a piece of code ONCE after a specified delay.
//
// Syntax:
//
// setTimeout(callbackFunction, delayInMilliseconds)
//
// 1000 ms = 1 second
//
// ============================================================================

console.log("Program Started");

setTimeout(() => {

    console.log("This runs after 2 seconds");

}, 2000);

console.log("Program Finished");


// OUTPUT:
//
// Program Started
// Program Finished
// This runs after 2 seconds
//
// Why?
//
// Because setTimeout() is asynchronous.
//
// It does NOT block execution.


// ============================================================================
// SECTION 3 : SETINTERVAL
// ============================================================================
//
// setInterval() repeatedly executes a task
// after a fixed interval.
//
// Unlike setTimeout(),
// it keeps running forever
// until we stop it.
//
// Syntax:
//
// const id = setInterval(callback, interval)
//
// ============================================================================

let count = 0;

const intervalId = setInterval(() => {

    count++;

    console.log(`Current Count : ${count}`);

    // Stop after 5 executions

    if (count === 5) {

        clearInterval(intervalId);

        console.log("Interval Stopped");

    }

}, 1000);


// OUTPUT:
//
// Current Count : 1
// Current Count : 2
// Current Count : 3
// Current Count : 4
// Current Count : 5
// Interval Stopped



// ============================================================================
// SECTION 4 : GLOBAL OBJECT
// ============================================================================
//
// Node.js provides a special object called:
//
// global
//
// It is similar to:
//
// window (Browser)
//
// The global object contains many built-in utilities.
//
// ============================================================================

console.log(global);


// WARNING:
//
// The output is very large.
//
// So instead let's view only
// property names.

console.log(
    Object.getOwnPropertyNames(global)
);


// Some common properties:
//
// console
// process
// Buffer
// setTimeout
// setInterval
// clearTimeout
// clearInterval
// crypto
// performance
// queueMicrotask



// ============================================================================
// SECTION 5 : CHECKING GLOBAL OBJECTS
// ============================================================================

console.log(typeof console);
console.log(typeof setTimeout);
console.log(typeof setInterval);
console.log(typeof process);


// OUTPUT:
//
// object
// function
// function
// object



// ============================================================================
// SECTION 6 : PROCESS OBJECT
// ============================================================================
//
// process is one of the most important
// global objects in Node.js.
//
// It provides information about:
//
// - Current Node.js process
// - Environment Variables
// - Memory Usage
// - Platform Information
// - Process ID
//
// ============================================================================

console.log("Node Version:");
console.log(process.version);

console.log("Operating System:");
console.log(process.platform);

console.log("Current Process ID:");
console.log(process.pid);

console.log("Current Working Directory:");
console.log(process.cwd());



// ============================================================================
// SECTION 7 : ENVIRONMENT VARIABLES
// ============================================================================
//
// Environment variables are available
// through process.env
//
// ============================================================================

console.log(process.env);


// Example

console.log(process.env.PATH);



// ============================================================================
// SECTION 8 : REQUIRE FUNCTION
// ============================================================================
//
// Now let's import the File System module.
//
// Question:
//
// Is require() a Global Object?
//
// Many developers think YES.
//
// But the answer is:
//
// NO
//
// ============================================================================

const fs = require("fs");

fs.writeFileSync(
    "demo.txt",
    "Hello From Node.js"
);

console.log("demo.txt created successfully");



// ============================================================================
// SECTION 9 : MODULE WRAPPER FUNCTION
// ============================================================================
//
// This is one of the most important
// concepts in Node.js.
//
// Before Node.js executes your code,
// it wraps the entire file inside
// a hidden function.
//
// Your file:
//
// ----------------------------------
//
// console.log("Hello");
//
// ----------------------------------
//
// Internally becomes:
//
// ============================================================================

(function (
    exports,
    require,
    module,
    __filename,
    __dirname
) {

    console.log("Hello");

});


// ============================================================================
//
// Because Node.js wraps your code
// inside this function,
// it automatically provides:
//
// exports
// require
// module
// __filename
// __dirname
//
// These are NOT Global Objects.
//
// They are function parameters.
//
// ============================================================================



// ============================================================================
// SECTION 10 : __dirname
// ============================================================================
//
// __dirname gives the current folder path.
//
// Example:
//
// Project
//   |
//   |-- app.js
//
// ============================================================================

console.log(__dirname);


// Example Output:
//
// C:\Users\Amit\Projects\NodeJS



// ============================================================================
// SECTION 11 : __filename
// ============================================================================
//
// __filename gives the complete path
// of the current file.
//
// ============================================================================

console.log(__filename);


// Example Output:
//
// C:\Users\Amit\Projects\NodeJS\app.js



// ============================================================================
// SECTION 12 : USING __dirname
// ============================================================================
//
// Real-world use case:
//
// Building file paths safely.
//
// ============================================================================

const path = require("path");

const filePath = path.join(
    __dirname,
    "data",
    "users.json"
);

console.log(filePath);


// Output:
//
// C:\Project\data\users.json



// ============================================================================
// SECTION 13 : MODULE OBJECT
// ============================================================================
//
// module represents the current module.
//
// Every file in Node.js is treated
// as a module.
//
// ============================================================================

console.log(module);


// Some useful properties:
//
// module.id
// module.path
// module.filename
// module.loaded
// module.exports



// ============================================================================
// SECTION 14 : EXPORTS OBJECT
// ============================================================================
//
// exports is used to expose
// functions and variables
// from a module.
//
// ============================================================================

exports.add = (a, b) => {

    return a + b;

};

exports.subtract = (a, b) => {

    return a - b;

};

exports.multiply = (a, b) => {

    return a * b;

};


// Other files can use:
//
// const math = require('./math');
//
// console.log(math.add(2,3));



// ============================================================================
// SECTION 15 : PROVING REQUIRE IS NOT GLOBAL
// ============================================================================

console.log(
    global.require
);


// Output:
//
// undefined
//
// This proves:
//
// require is NOT inside global object.


console.log(global.console);


// ============================================================================
// SECTION 16 : PROVING __dirname IS NOT GLOBAL
// ============================================================================

console.log(
    global.__dirname
);


// Output:
//
// undefined
//
// Again proves:
//
// __dirname is NOT global.



// ============================================================================
// FINAL COMPARISON
// ============================================================================

/*

┌───────────────────────────────────────────────┐
│            GLOBAL OBJECTS                     │
├───────────────────────────────────────────────┤
│ console                                       │
│ process                                       │
│ global                                        │
│ setTimeout                                    │
│ setInterval                                   │
│ clearTimeout                                  │
│ clearInterval                                 │
│ Buffer                                        │
└───────────────────────────────────────────────┘


┌───────────────────────────────────────────────┐
│      MODULE WRAPPER VARIABLES                 │
├───────────────────────────────────────────────┤
│ require                                       │
│ exports                                       │
│ module                                        │
│ __dirname                                     │
│ __filename                                    │
└───────────────────────────────────────────────┘


GLOBAL OBJECTS
--------------
Provided by Node.js Runtime
Available Everywhere


MODULE VARIABLES
----------------
Provided by Module Wrapper Function
Available Inside Module Scope Only


*/


