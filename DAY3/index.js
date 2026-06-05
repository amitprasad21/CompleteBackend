const http = require('http');
const fs = require('fs');

const PORT = 3000;

const server = http.createServer((req, res) => {
    const log = `${new Date().toISOString()} - ${req.method} from ${req.url}\n`;
    fs.appendFile('server.log', log, (err) => {
        if (err) {
            console.error('Error writing to log file:', err);
            res.statusCode = 500;
            res.end('Internal Server Error');
            return;
        }
        res.statusCode = 200;
        res.end('Request logged successfully');
    });
});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});