const express = require("express");
const bodyparser = require('body-parser');
const methods = require("./modules.js");

const app = express();

const cors = require('cors');
app.use(cors({ credentials: true }));

//app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

app.get("/get_servers", (req, res) => { 
    methods.getServers(req, res); 
});

app.get("/get_webhook", (req, res) => {
    methods.webhook(req, res);
});

app.listen(5002, () => { console.log("Server api started on port 5002"); });