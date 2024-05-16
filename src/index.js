
require("dotenv").config();
 
const https = require("https");
const fs = require("fs");
const express = require("express");
const cors = require("cors");
const { dbHbi } = require("./Database/dbHbi");
const port = process.env.PORT || 3001;
const hbi = require("./Routes/Users.routes");
 
// SSL options
const options = {
  key: fs.readFileSync(__dirname + "/Certificates/HBI_cert_out.pem"),
  cert: fs.readFileSync(__dirname + "/Certificates/HBI.ORG.crt"),
  passphrase: 'HBI@2024'
};
 
// Express app
const app = express();
 
// Enable CORS
app.use(cors());
 
// Parse URL-encoded and JSON request bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
 
// Routes
app.use("/hbi", hbi);
 
// Handle undefined endpoints
app.use((req, res) => {
  res.status(404).json({ message: "Endpoint not found" });
});
 
// Create HTTPS server
const server = https.createServer(options, app);
 
// Start listening
server.listen(port, () => {
  dbHbi.sync()
    .then(() => {
      console.log("HBI database connected");
    })
    .catch((err) => {
      console.error("Database connection error:", err);
    });
  console.log(`Server is listening on port ${port}`);
});