const { servers, webhook_servers, methods } = require("./config.js");
const request = require('request').defaults({ rejectUnauthorized: false });
const rp = require('request-promise').defaults({rejectUnauthorized: false});

const { B24Hook, EnumCrmEntityTypeId } = require('@bitrix24/b24jssdk');

const $b24 = new B24Hook({
	b24Url: "https://192.168.2.148",
	userId: 3173,
	secret: 'v0r3yhxaxew41rj6',
    rejectUnauthorized: false,
    secure: false
});

const getServers = (req, res) => {
    console.log("request get_servers");
    res.status(200).send(servers).end();
};

const webhook = (req, res) => {   //Список юзеров
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
    /* request.post(
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
        }); */
    
    rp.post(
        {
            url: urll, 
            form: {
                "SORT":"ID",
                "ORDER":"ASC",
                "start":count,
                "FILTER":{
                    'USER_TYPE':'employee',
                    //'ACTIVE':'true',
                },
            }
        },
    ).then((body) => {
        res.status(200).send(body).end();
    }).error((err) => {
        console.log(err);
        res.status(500).send({'message':err})
    });
};

const dealfields = (req, res) => {  //Пользовательские поля сделки
    const {source} = req.body;
    var urll = '';
    if(source == 0 ){ urll = `${webhook_servers.SOURCE_HOOK}${methods.get_user_deal_fields}` }
    else { urll = `${webhook_servers.RECEIVE_HOOK}${methods.get_user_deal_fields}` };
    rp.post(
        {
            url: urll,
        },
    ).then((body) => {
        res.status(200).send(body).end();
    }).error((err) => {
        console.log(err);
        res.status(500).send({'message':err})
    });
};

const dealID = (req, res) => {   //пользовательские поля
    const {id} = req.body;
    rp(`${webhook_servers.SOURCE_HOOK}${methods.get_deal_id}?ID=${id}`)
    .then((body) => {
        res.status(200).send(body).end();
    }).error((err) => {
        console.log(err);
        res.status(500).send({'message':err})
    });
};

const setdealfields = (req, res) => {  //Добавление пользовательского поля сделки
    const {fields} = req.body;
    request.post(
        {
            url: `${webhook_servers.RECEIVE_HOOK}${methods.set_deal_field}`, 
            form: {
                "fields":fields,
            }
        },
        (err, resp, body) => {
            if(err){ res.status(500).send({'message':err}) };
            res.status(200).send(body).end();
        });

    /* rp.post(
        {
            url: `${webhook_servers.RECEIVE_HOOK}${methods.set_deal_field}`,
            form: {
                "fields":fields,
            }
        },
    ).then((body) => {
        res.status(200).send(body).end();
    }).error((err) => {
        console.log(err);
        res.status(500).send({'message':err})
    }); */
};

const getDealList = (req, res) => {  //Загрузка списка ID сделок
    const {next} = req.body;
    console.log("Загрузка сделок с ", next);
    rp.post(
        {
            url: `${webhook_servers.SOURCE_HOOK}${methods.get_crm_deal_list}`,
            form: {
                "SELECT":["ID", "TITLE", "DATE_CREATE"],
                "FILTER":{">=DATE_CREATE":"2024-01-01T00:00:00"},
                "start":next,
            }
        },
    ).then((body) => {
        res.status(200).send(body).end();
    }).error((err) => {
        console.log(err);
        res.status(500).send({'message':err});
    });
}

const getDealIdLoad = (req, res) => {
    const { deal } = req.body;
    rp.post(
        {
            url: `${webhook_servers.SOURCE_HOOK}${methods.get_crm_deal_get}`,
            form: {
                "ID":deal,
            }
        },
    ).then((body) => {
        res.status(200).send(body).end();
    }).error((err) => {
        console.log(err);
        res.status(500).send({'message':err});
    });


    /* $b24.callBatch(
        deals,
        false,
    )
    .then((rez) => {
        res.status(200).send(rez).end();
    })
    .catch((err) => {
        console.log(err);
        res.status(500).send({'message':err});
    }) */
}

const setDealIdLoad = (req, res) => {
    const { rezult } = req.body;
    rp.post(
        {
            url: `${webhook_servers.RECEIVE_HOOK}${methods.set_deal_add}`,
            form: 
            {
                'fields':rezult,
                'params':{
                    'REGISTER_SONET_EVENT':'N',
                },
            }
        },
    ).then((body) => {
        res.status(200).send(body).end();
    }).error((err) => {
        console.log(err);
        res.status(500).send({'message':err});
    });
    //res.status(200).send({}).end();
}

module.exports = {
    getServers,
    webhook,
    dealfields,
    setdealfields,
    dealID,
    getDealList,
    getDealIdLoad,
    setDealIdLoad,
}