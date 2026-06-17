/**
 * ==========================================================
 * NODE.JS OS MODULE
 * ==========================================================
 *
 * Definition:
 * The OS (Operating System) module is a built-in Node.js
 * module used to interact with the operating system.
 *
 * Use Cases:
 * ✔ System Monitoring
 * ✔ Server Health Checks
 * ✔ DevOps Tools
 * ✔ Logging & Diagnostics
 * ✔ Performance Analysis
 *
 * No installation required.
 *
 * const os = require("os");
 * ==========================================================
 */

const os = require("os");


/**
 * ==========================================================
 * 1. PLATFORM INFORMATION
 * ==========================================================
 *
 * os.platform()
 *
 * Returns the operating system platform.
 *
 * Examples:
 * win32  -> Windows
 * linux  -> Linux
 * darwin -> macOS
 * ==========================================================
 */

console.log("\n===== PLATFORM INFO =====");

console.log("OS Platform:", os.platform());
console.log("OS Type:", os.type());
console.log("OS Release:", os.release());
console.log("OS Version:", os.version());


/**
 * ==========================================================
 * 2. USER INFORMATION
 * ==========================================================
 *
 * os.userInfo()
 *
 * Returns details about the current user.
 * ==========================================================
 */

console.log("\n===== USER INFO =====");

console.log(os.userInfo());


/**
 * ==========================================================
 * 3. CPU INFORMATION
 * ==========================================================
 *
 * os.cpus()
 *
 * Returns information about each CPU core.
 *
 * Useful for:
 * - Load Balancing
 * - Clustering
 * - Performance Optimization
 * ==========================================================
 */

console.log("\n===== CPU INFO =====");

console.log("CPU Architecture:", os.arch());

console.log("Total CPU Cores:", os.cpus().length);

console.log("First CPU Core Details:");

console.log(os.cpus()[0]);


/**
 * ==========================================================
 * 4. MEMORY INFORMATION
 * ==========================================================
 *
 * Memory values are returned in bytes.
 *
 * 1024 Bytes = 1 KB
 * 1024 KB    = 1 MB
 * 1024 MB    = 1 GB
 * ==========================================================
 */

console.log("\n===== MEMORY INFO =====");

const freeMemory =
    (os.freemem() / 1024 / 1024 / 1024).toFixed(2);

const totalMemory =
    (os.totalmem() / 1024 / 1024 / 1024).toFixed(2);

console.log(`Free Memory: ${freeMemory} GB`);

console.log(`Total Memory: ${totalMemory} GB`);


/**
 * ==========================================================
 * 5. SYSTEM UPTIME
 * ==========================================================
 *
 * os.uptime()
 *
 * Returns how long the system has been running.
 * Value is returned in seconds.
 * ==========================================================
 */

console.log("\n===== SYSTEM UPTIME =====");

const uptimeHours =
    (os.uptime() / 60 / 60).toFixed(2);

console.log(`System Uptime: ${uptimeHours} Hours`);


/**
 * ==========================================================
 * 6. HOSTNAME
 * ==========================================================
 *
 * os.hostname()
 *
 * Returns machine/server hostname.
 *
 * Useful in:
 * - Cloud Servers
 * - Logging Systems
 * - Monitoring Tools
 * ==========================================================
 */

console.log("\n===== HOSTNAME =====");

console.log("Hostname:", os.hostname());


/**
 * ==========================================================
 * 7. NETWORK INTERFACES
 * ==========================================================
 *
 * os.networkInterfaces()
 *
 * Returns network adapter details.
 *
 * Useful for:
 * - Finding Local IP
 * - Server Diagnostics
 * ==========================================================
 */

console.log("\n===== NETWORK INFO =====");

console.log(os.networkInterfaces());


/**
 * ==========================================================
 * 8. HOME DIRECTORY
 * ==========================================================
 *
 * Returns the current user's home directory.
 *
 * Examples:
 * Windows:
 * C:\\Users\\Amit
 *
 * Linux:
 * /home/amit
 * ==========================================================
 */

console.log("\n===== HOME DIRECTORY =====");

console.log("Home Directory:", os.homedir());


/**
 * ==========================================================
 * 9. TEMP DIRECTORY
 * ==========================================================
 *
 * os.tmpdir()
 *
 * Returns temporary file directory.
 *
 * Useful for:
 * - File Uploads
 * - Caching
 * - Temporary Processing
 * ==========================================================
 */

console.log("\n===== TEMP DIRECTORY =====");

console.log("Temp Directory:", os.tmpdir());


/**
 * ==========================================================
 * 10. LOAD AVERAGE
 * ==========================================================
 *
 * os.loadavg()
 *
 * Returns system load averages.
 *
 * Linux/macOS only.
 * Windows returns [0,0,0].
 * ==========================================================
 */

console.log("\n===== LOAD AVERAGE =====");

console.log(os.loadavg());


/**
 * ==========================================================
 * 11. END OF LINE CHARACTER
 * ==========================================================
 *
 * os.EOL
 *
 * Windows -> \r\n
 * Linux/macOS -> \n
 *
 * Useful while generating files.
 * ==========================================================
 */

console.log("\n===== EOL CHARACTER =====");

console.log(JSON.stringify(os.EOL));


/**
 * ==========================================================
 * 12. REAL WORLD SERVER HEALTH CHECK
 * ==========================================================
 *
 * Example:
 * Create a health monitoring object.
 *
 * This pattern is commonly used in:
 * - Express APIs
 * - Kubernetes Health Checks
 * - Monitoring Dashboards
 * ==========================================================
 */

const serverHealth = {

    hostname: os.hostname(),

    platform: os.platform(),

    architecture: os.arch(),

    cpuCores: os.cpus().length,

    totalMemoryGB:
        (os.totalmem() / 1024 / 1024 / 1024).toFixed(2),

    freeMemoryGB:
        (os.freemem() / 1024 / 1024 / 1024).toFixed(2),

    uptimeHours:
        (os.uptime() / 60 / 60).toFixed(2)
};

console.log("\n===== SERVER HEALTH =====");

console.log(serverHealth);


/**
 * ==========================================================
 * INTERVIEW QUESTION
 * ==========================================================
 *
 * What is the OS Module in Node.js?
 *
 * Answer:
 *
 * The OS module is a built-in Node.js module that provides
 * information about the operating system such as CPU cores,
 * memory usage, uptime, network interfaces, hostname, and
 * platform details. It is commonly used for system
 * monitoring, diagnostics, logging, and server health checks.
 *
 * ==========================================================
 */