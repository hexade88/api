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

app.post("/get_webhook", (req, res) => {
    methods.webhook(req, res);
});

app.post("/dealfields", (req, res) => {
    methods.dealfields(req, res);
});

app.post("/setdealfields", (req, res) => {
    methods.setdealfields(req, res);
});

app.post("/dealID", (req, res) => {
    methods.dealID(req, res);
});

app.post("/getDealList", (req,res) => {  //Загрузка списка ID сделок
    methods.getDealList(req, res);
});

app.post("/getDealIdBatch", (req,res) => {  //Пакетная загрузка сделок по id
    methods.getDealIdBatch(req, res);
});

app.listen(5002, () => { console.log("Server api started on port 5002"); });