const API_URL = "https://3c8d-156-214-113-128.eu.ngrok.io/";


module.exports = {
    
    mainUrl:API_URL.slice(0, -1),
    register: API_URL+"register/",
    login: API_URL+"login/",
    edit_user: API_URL+"edit_user/",
    addFoundKid: API_URL+"add_found_kid/",
    addMissingKid:API_URL+"add_missing_kid/",
    getMissingKIds:API_URL+"get_missing_kids/",
    getMatchingProfiles:API_URL+"get_matching_profiles/",
}