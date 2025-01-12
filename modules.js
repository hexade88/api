const { servers, webhook_servers, methods } = require("./config.js");
const request = require('request').defaults({ rejectUnauthorized: false });

const getServers = (req, res) => {
    console.log("request get_servers");
    res.status(200).send(servers).end();
};

const webhook = (req, res) => {
    /* request(`${webhook_servers.SOURCE_HOOK}${methods.Get_users_list}`,
        (err, resp, body) => {
            if(err){ res.status(500).send({'message':err}) };
            res.status(200).send(body).end();
        }
    ) */
    //res.status(200).send({webhooks:"sdjkl sd65f 65s"}).end();
    const {source, count } = req.body;
    var urll = '';
    if(source == 0 ){ urll = `${webhook_servers.SOURCE_HOOK}${methods.Get_users_list}` }
    else { urll = `${webhook_servers.RECEIVE_HOOK}${methods.Get_users_list}` };
    request.post(
        {
            url: urll, 
            form: {
                "SORT":"ID",
                "ORDER":"ASC",
                "start":count,
                "FILTER":{
                    'USER_TYPE':'employee',
                    'ACTIVE':'true',
                },
            }
        },
        (err, resp, body) => {
            if(err){ res.status(500).send({'message':err}) };
            res.status(200).send(body).end();
        })
};

module.exports = {
    getServers,
    webhook
}