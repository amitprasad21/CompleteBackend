import express from "express";
import publicRoutes from "./routes/public.routes.js";
import privateRoutes from "./routes/private.routes.js";
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import logMiddleware from "./middleware/log.middleware.js";



const app = express();
const PORT = 3000;  

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

if(!fs.existsSync(path.join(__dirname, 'logs'))){
    fs.mkdirSync(path.join(__dirname, 'logs'))
}   


// inbuilt middleware to parse json data
app.use(express.json());

// Global middleware to log all requests
app.use(logMiddleware);

// middleware to routes
app.use('/public', publicRoutes);
app.use('/private', privateRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});