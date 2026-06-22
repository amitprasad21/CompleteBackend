import express from "express";
import cookieParser from "cookie-parser";


const app = express();

app.use(cookieParser());



app.get("/", (req, res) => {
    res.cookie("name", "Amijhbt", { maxAge: 1000*60*60*24, httpOnly: true });
  res.send("Hello World!");
});



app.get("/products", (req, res) => {
    // console.log(req.cookies);
    // console.log(req.headers.cookie);
    console.log("Cookies:", req.cookies);

    if (req.cookies.name && req.cookies.name === "Amit") {      

    res.status(200).send({
        id: 1,
        name: "Product 1",
        price: 100,
        description: "This is product 1"    
    })
} else {
    res.status(401).send("Unauthorized");   
}
});

app.listen(3000, () => {
  console.log("Server is running on port http://localhost:3000");
}); 