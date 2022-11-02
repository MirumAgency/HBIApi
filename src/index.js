require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { dbHbi } = require("./Database/dbHbi");


const server = express();
const hbi = require("./Routes/Users.routes");


const port = process.env.PORT || 3001;

// Cors politics
var corsOptions = {
    origin: function (origin, callback) {
      callback(null, true);
    },
    methods: "GET, HEAD, PUT, DELETE, POST",
    preflightContinue: false,
    credentials: true,
    optionSuccessStatus: 200,
    exposedHeaders: ["Content-Disposition"]
};
server.use(cors(corsOptions));
server.use(express.urlencoded({ extended: true }));
server.use(express.json());

server.use('/hbi', hbi);
server.use('/', (req, res) => {
  res.status(400).json('EndPoint not exist: Production.');
});

server.listen(port, () => {
    dbHbi.sync().then(() => {
      console.log('HBI database connected');
    }).catch(err => {
      throw new Error(err);
    });
   console.log(`Server is listening on port ${port}`);
});