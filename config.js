const servers = {
    SOURCE_IP:'192.168.1.149',
    RECEIVE_IP:'192.168.2.148'
};

const webhook_servers = {
    SOURCE_HOOK:"https://192.168.1.149/rest/3173/v0r3yhxaxew41rj6/",
    RECEIVE_HOOK:"https://192.168.2.148/rest/1/entkpy1xf5i625l5/",
};

const methods = {
    Get_users_list:"user.get.json",
}

module.exports = {
    servers,
    webhook_servers,
    methods,
};