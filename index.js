const express = require("express");
const bodyparser = require('body-parser');
const methods = require("./modules.js");

const app = express();

const cors = require('cors');
app.use(cors({ credentials: true }));

app.use((req, res, next) => {
    console.log(req);
    next();
});

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

app.post("/getDealIdLoad", (req,res) => {  //Загрузка сделок по id
    methods.getDealIdLoad(req, res);
});

app.post("/setDealIdLoad", (req,res) => {
    methods.setDealIdLoad(req, res);
});

app.post("/getCompanyList", (req, res) => {
    methods.getCompanyList(req, res);
});

app.post("/getContactList", (req, res) => {
    methods.getContactList(req, res);
})

app.post("/bitobi", (req, res) => {
    methods.bitobi(req, res);
})
    
app.post("/setCompany", (req, res) => {
    methods.setCompany(req, res);
})

app.post("/getCompanyID", (req, res) => {
    methods.getCompanyID(req, res);
})

app.post("/getContactID", (req, res) => {
    methods.getContactID(req, res);
})

app.post("/setContact", (req, res) => {
    methods.setContact(req, res);
})

app.post("/updDealIdLoad", (req, res) => {
    methods.updDealIdLoad(req, res);
})

app.post("/getAllDealNewBX", (req, res) => {
    methods.getAllDealNewBX(req, res);
})

app.listen(5002, () => { console.log("Server api started on port 5002"); });