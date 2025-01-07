const { servers } = require("./config.js");
const request = require('request').defaults({ rejectUnauthorized: false });

const getServers = (req, res) => {
    console.log("request get_servers");
    res.status(200).send(servers).end();
};

const webhook = (req, res) => {
    console.log("request webhook");
    request("http://192.168.1.149/rest/3173/v0r3yhxaxew41rj6/user.get.json",
        (err, resp, body) => {
            //console.log(body);
            if(err){ res.status(500).send({'message':err}) };
            res.status(200).send(body).end();
        }
    )
    //res.status(200).send({webhooks:"sdjkl sd65f 65s"}).end();
};

module.exports = {
    getServers,
    webhook
}