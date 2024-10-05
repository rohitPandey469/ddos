const express = require("express");
const { exec } = require("child_process");
const app = express();
const port = 3000;

// API route to start DDoS simulation
app.get("/start-ddos-attack", (req, res) => {
    // Execute a DDoS attack using Apache Benchmark (or any other tool)
    exec("ab -n 10000 -c 500 http://yourwebsite.com/", (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing attack: ${error.message}`);
            return res.json({ success: false, error: error.message });
        }
        if (stderr) {
            console.error(`stderr: ${stderr}`);
            return res.json({ success: false, error: stderr });
        }
        console.log(`stdout: ${stdout}`);
        res.json({ success: true });
    });
});

app.listen(port, () => {
    console.log(`Backend listening at http://localhost:${port}`);
});
