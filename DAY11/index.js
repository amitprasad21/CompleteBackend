import express from "express";
import session from "express-session";
import cookieParser from "cookie-parser";   

const app = express();

app.use(session({
    secret: "my-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: { 
        maxAge: 1000 * 60 * 60* 24 // 1 day
     } // Set to true if using HTTPS
}));

app.use(cookieParser());

app.get("/", (req, res) => {
    console.log("Cookies:", req.cookies);
    console.log("Session Data:", req.session);
    console.log("Session ID:", req.sessionID);
    res.send("Hello World");
});

app.get("/login", (req, res) => {
    req.session.user = {
        username: "john_doe",
        email: "amit@gmail.com",
        age: 30
    };
    res.send(`${req.session.user.username} logged in`);
});


app.get("/logout", (req, res) => {
    req.session.destroy();
    res.send("Logged out");
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});




