/**
 * ==========================================================
 * NODE.JS CRYPTO MODULE
 * ==========================================================
 *
 * Definition:
 * The Crypto module is a built-in Node.js module used for
 * cryptographic operations such as:
 *
 * ✔ Hashing
 * ✔ Password Security
 * ✔ Encryption
 * ✔ Decryption
 * ✔ Random Token Generation
 * ✔ Digital Signatures
 *
 * No installation required.
 *
 * const crypto = require("crypto");
 * ==========================================================
 */

const crypto = require("crypto");


/**
 * ==========================================================
 * 1. HASHING
 * ==========================================================
 *
 * Definition:
 * Converts data into a fixed-length string.
 *
 * Properties:
 * ✔ One Way Process
 * ✔ Cannot be reversed
 * ✔ Same input → Same output
 *
 * Common Algorithms:
 * - SHA256
 * - SHA512
 *
 * Use Cases:
 * - File Verification
 * - Blockchain
 * - Data Integrity
 * ==========================================================
 */

console.log("\n===== HASHING =====");

const data = "Hello Backend";

const hash = crypto
    .createHash("sha256")
    .update(data)
    .digest("hex");

console.log("Original:", data);
console.log("SHA256 Hash:", hash);


/**
 * ==========================================================
 * 2. PASSWORD HASHING USING PBKDF2
 * ==========================================================
 *
 * Definition:
 * PBKDF2 makes password cracking difficult by
 * repeatedly hashing the password.
 *
 * Use Cases:
 * - User Authentication
 * - Password Storage
 *
 * Never store plain passwords.
 * ==========================================================
 */

console.log("\n===== PASSWORD HASHING =====");

const password = "Amit@123";

crypto.pbkdf2(
    password,
    "randomSalt",
    100000,
    64,
    "sha512",
    (err, derivedKey) => {

        if (err) throw err;

        console.log(
            "Secure Password Hash:",
            derivedKey.toString("hex")
        );
    }
);


/**
 * ==========================================================
 * 3. RANDOM TOKEN GENERATION
 * ==========================================================
 *
 * Definition:
 * Generates cryptographically secure random values.
 *
 * Use Cases:
 * - JWT Secrets
 * - OTP Systems
 * - Password Reset Links
 * - API Keys
 * ==========================================================
 */

console.log("\n===== RANDOM TOKEN =====");

const token =
    crypto.randomBytes(32).toString("hex");

console.log("Random Token:", token);


/**
 * ==========================================================
 * 4. ENCRYPTION
 * ==========================================================
 *
 * Definition:
 * Converts readable text into unreadable text.
 *
 * Algorithm:
 * AES-256-CBC
 *
 * Use Cases:
 * - Secure Data Storage
 * - Banking Systems
 * - Sensitive Information
 * ==========================================================
 */

console.log("\n===== ENCRYPTION =====");

const algorithm = "aes-256-cbc";

const key =
    crypto.randomBytes(32);

const iv =
    crypto.randomBytes(16);

const cipher =
    crypto.createCipheriv(
        algorithm,
        key,
        iv
    );

let encrypted =
    cipher.update(
        "Confidential Data",
        "utf8",
        "hex"
    );

encrypted += cipher.final("hex");

console.log("Encrypted:", encrypted);


/**
 * ==========================================================
 * 5. DECRYPTION
 * ==========================================================
 *
 * Definition:
 * Converts encrypted data back into
 * original readable form.
 * ==========================================================
 */

console.log("\n===== DECRYPTION =====");

const decipher =
    crypto.createDecipheriv(
        algorithm,
        key,
        iv
    );

let decrypted =
    decipher.update(
        encrypted,
        "hex",
        "utf8"
    );

decrypted += decipher.final("utf8");

console.log("Decrypted:", decrypted);


/**
 * ==========================================================
 * 6. HMAC
 * ==========================================================
 *
 * Definition:
 * Hash-based Message Authentication Code.
 *
 * Ensures:
 * ✔ Data Integrity
 * ✔ Data Authenticity
 *
 * Used In:
 * - Razorpay Signature Verification
 * - Webhooks
 * - Payment Gateways
 * ==========================================================
 */

console.log("\n===== HMAC =====");

const hmac = crypto
    .createHmac(
        "sha256",
        "secretKey"
    )
    .update("Order123")
    .digest("hex");

console.log("HMAC:", hmac);


/**
 * ==========================================================
 * 7. UUID GENERATION
 * ==========================================================
 *
 * Definition:
 * Generates a unique identifier.
 *
 * Use Cases:
 * - Order IDs
 * - User IDs
 * - Transaction IDs
 * ==========================================================
 */

console.log("\n===== UUID =====");

const uuid =
    crypto.randomUUID();

console.log("UUID:", uuid);


/**
 * ==========================================================
 * 8. REAL WORLD EXAMPLE
 * ==========================================================
 *
 * Password Reset Token System
 * ==========================================================
 */

console.log("\n===== PASSWORD RESET TOKEN =====");

const resetToken =
    crypto.randomBytes(20)
        .toString("hex");

console.log(
    "Password Reset Token:",
    resetToken
);


/**
 * ==========================================================
 * INTERVIEW QUESTION
 * ==========================================================
 *
 * What is Crypto Module in Node.js?
 *
 * Answer:
 *
 * The Crypto module is a built-in Node.js module
 * used for cryptographic operations such as hashing,
 * encryption, decryption, secure token generation,
 * password hashing, and digital signatures.
 *
 * It is widely used in authentication systems,
 * payment gateways, security applications,
 * and data protection mechanisms.
 *
 * ==========================================================
 *
 * DAY 10 COMPLETE BACKEND TOPICS:
 *
 * ✔ Hashing (SHA256)
 * ✔ Password Hashing (PBKDF2)
 * ✔ Random Tokens
 * ✔ Encryption
 * ✔ Decryption
 * ✔ HMAC
 * ✔ UUID
 * ✔ Real-World Security Examples
 *
 * ==========================================================
 */