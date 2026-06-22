// middleware-demo.js

const express = require("express");

const app = express();
const PORT = 3000;

/*
==================================================
1. GLOBAL LOGGING MIDDLEWARE
Runs for every request
==================================================
*/
function logger(req, res, next) {
    console.log(
        `[${new Date().toLocaleTimeString()}] ${req.method} ${req.url}`
    );

    next();
}

/*
==================================================
2. REQUEST MODIFIER MIDDLEWARE
Adds custom data to req object
==================================================
*/
function addUser(req, res, next) {
    req.user = {
        id: 101,
        name: "Amit",
        role: "Developer"
    };

    next();
}

/*
==================================================
3. AUTHENTICATION MIDDLEWARE
Checks token before allowing access
==================================================
*/
function authenticate(req, res, next) {
    const token = req.headers.authorization;

    if (token === "secret-token") {
        console.log("✅ User Authenticated");
        next();
    } else {
        res.status(401).json({
            success: false,
            message: "Unauthorized"
        });
    }
}

/*
==================================================
4. MAINTENANCE MODE MIDDLEWARE
Blocks all requests if enabled
==================================================
*/
function maintenanceMode(req, res, next) {

    const maintenance = false;

    if (maintenance) {
        return res.status(503).send(
            "🚧 Website Under Maintenance"
        );
    }

    next();
}

/*
==================================================
APPLY GLOBAL MIDDLEWARE
Execution Order:
maintenance -> logger -> addUser
==================================================
*/

app.use(maintenanceMode);
app.use(logger);
app.use(addUser);

/*
==================================================
PUBLIC ROUTE
==================================================
*/

app.get("/", (req, res) => {
    res.send("🏠 Home Page");
});

/*
==================================================
ROUTE USING req.user
==================================================
*/

app.get("/profile", (req, res) => {

    res.json({
        message: "User Profile",
        user: req.user
    });

});

/*
==================================================
PROTECTED ROUTE
Authentication Middleware Only
==================================================
*/

app.get(
    "/dashboard",
    authenticate,
    (req, res) => {

        res.json({
            success: true,
            message: `Welcome ${req.user.name}`
        });

    }
);

/*
==================================================
MULTIPLE MIDDLEWARE CHAIN
==================================================
*/

function first(req, res, next) {
    console.log("1️⃣ First Middleware");
    next();
}

function second(req, res, next) {
    console.log("2️⃣ Second Middleware");
    next();
}

function third(req, res, next) {
    console.log("3️⃣ Third Middleware");
    next();
}

app.get(
    "/chain",
    first,
    second,
    third,
    (req, res) => {

        res.send(
            "All Middleware Executed Successfully"
        );

    }
);

/*
==================================================
ERROR GENERATING ROUTE
==================================================
*/

app.get("/error", (req, res, next) => {

    try {
        throw new Error("Something went wrong!");
    } catch (err) {
        next(err);
    }

});

/*
==================================================
ERROR HANDLING MIDDLEWARE
Must have 4 parameters
==================================================
*/

app.use((err, req, res, next) => {

    console.error("❌ Error:", err.message);

    res.status(500).json({
        success: false,
        message: err.message
    });

});

/*
==================================================
SERVER START
==================================================
*/

app.listen(PORT, () => {

    console.log(`
===================================
🚀 Server Running
🌐 http://localhost:${PORT}

Try:

GET  /
GET  /profile
GET  /chain
GET  /error

Protected Route:
GET /dashboard

Header:
Authorization: secret-token
===================================
`);

});