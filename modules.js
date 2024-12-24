const { servers } = require("./config.js");

const getServers = (req, res) => {
    console.log("request get_servers");
    res.status(200).send(servers).end();
};

module.exports = {
    getServers
}