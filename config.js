const servers = {
    SOURCE_IP:'192.168.1.149',
    RECEIVE_IP:'192.168.0.148'
};

const webhook_servers = {
    SOURCE_HOOK:"https://192.168.1.149/rest/3173/v0r3yhxaxew41rj6/",
    RECEIVE_HOOK:"https://192.168.0.148/rest/1/entkpy1xf5i625l5/",
    BETCH_SOURCE_HOOK: "https://192.168.1.149/rest/3173/v0r3yhxaxew41rj6/batch.json",
    WORK_RECEIVE:"https://bitrix24.avtomatika.kz/rest/3173/i6214lf2krgwfymr/",

    BITOBI: "http://192.168.0.148/crm/configs/import/BitrixToBitrix.php",
};

const methods = {
    Get_users_list:"user.get.json",                       //Список юзеров
    get_user_deal_fields:"crm.deal.userfield.list.json",  //Пользовательские поля сделки
    get_deal_id:"crm.deal.userfield.get.json",                 //Подробные параметры пользовательского поля сделки
    set_deal_field:"crm.deal.userfield.add.json",              //Добавление пользовательского поля сделки
    get_crm_deal_list: "crm.deal.list.json",                   //Список сделок
    get_crm_deal_get:"crm.deal.get.json",                      //Сделка по ID
    set_deal_add:"crm.deal.add",                               //сохраняем сделку
    crm_company_list:"crm.company.list",                        //Список компаний
    crm_contact_list:"crm.contact.list"                         //Список контактов
}

module.exports = {
    servers,
    webhook_servers,
    methods,
};