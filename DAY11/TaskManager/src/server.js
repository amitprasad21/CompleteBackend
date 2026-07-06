import express from "express";
import session from "express-session";  
import cookieParser from "cookie-parser";



import authRoutes from "./routes/auth.routes.js";
import taskRoutes from "./routes/task.routes.js";

const app = express();
const PORT = 3000;



app.use(cookieParser());
app.use(express.json());
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false,

  cookie: {
    httpOnly: true,
    secure: false, // Set to true if using HTTPS
    maxAge: 1000 * 60 * 60*24, // 1 hour
  },
}));  

app.get("/", (req, res) => {
  res.send("Welcome to the Task Manager API");
});

app.use("/auth", authRoutes);
app.use("/task", taskRoutes);



app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
