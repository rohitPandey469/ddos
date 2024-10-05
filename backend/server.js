const express = require("express");
const { exec } = require("child_process");
const app = express();
const port = 3000;

// Middleware to simulate workload
app.use((req, res, next) => {
  let startTime = Date.now();
  while (Date.now() - startTime < 100); // Simulate processing time for each request
  next();
});

// Endpoint for the DDoS attack simulation
app.get("/simulate-ddos", (req, res) => {
  exec("ab -n 1000 -c 100 http://localhost/", (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return res.status(500).send("Error during DDoS simulation");
    }
    res.send(stdout); // Send back the results of the DDoS simulation
  });
});

app.get("/", (req, res) => {
  res.send("This is the target service for DDoS demonstration.");
});

app.listen(port, () => {
  console.log(`Web service listening at http://localhost:${port}`);
});
