const API_URL = "https://b713-41-237-133-176.ngrok-free.app/";


module.exports = {
    
    mainUrl:API_URL.slice(0, -1),
    register: API_URL+"register/",
    login: API_URL+"login/",
    addFoundKid: API_URL+"add_found_kid/",
    addMissingKid:API_URL+"add_missing_kid/",
    getMissingKIds:API_URL+"get_missing_kids/",
}