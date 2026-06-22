import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';


// Handle Es module __dirname and __filename
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// middle ware log all requests to the server

const logMiddleware = (req, res, next) => {
    const logMessage = `${new Date().toISOString()} - ${req.method} ${req.originalUrl}\n`;
    const logFilePath = path.join(__dirname, '../logs/requests.log');

    fs.appendFile(logFilePath, logMessage, (err) => {
        if (err) {
            console.error('Error writing to log file:', err);
        }    });
    next();
};

export default logMiddleware;