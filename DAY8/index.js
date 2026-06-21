import express from "express";

const app = express();

console.log("express:", typeof express); // function
console.log("app:", typeof app);         // function

app.get("/", (req, res) => {
    res.send("Hello Express");
});

app.listen(3000, () => {
    console.log("Server Running on Port 3000");
});

/*
express  → Factory Function
app      → Express Application (callable object)
app.get  → Route Registration Method
req      → Request Object
res      → Response Object
listen   → Starts HTTP Server
*/