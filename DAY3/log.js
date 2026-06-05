const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const logFile = path.join(__dirname, 'server.log');

const server = http.createServer((req, res) => {
    const requestInfo = {
        timestamp: new Date().toISOString(),
        method: req.method,
        url: req.url,
        userAgent: req.headers['user-agent']
    };

    const logEntry = `
=========================
Time: ${requestInfo.timestamp}
Method: ${requestInfo.method}
Route: ${requestInfo.url}
User-Agent: ${requestInfo.userAgent}
=========================
`;

    fs.appendFile(logFile, logEntry, (err) => {
        if (err) {
            res.writeHead(500, {
                'Content-Type': 'application/json'
            });

            return res.end(JSON.stringify({
                success: false,
                message: 'Failed to write log'
            }));
        }

        res.writeHead(200, {
            'Content-Type': 'application/json'
        });

        res.end(JSON.stringify({
            success: true,
            message: 'Request logged successfully',
            route: req.url,
            method: req.method
        }));
    });
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});