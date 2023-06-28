const API_URL = "https://95e1-102-45-56-215.ngrok-free.app/";


module.exports = {
    
    mainUrl:API_URL.slice(0, -1),
    register: API_URL+"register/",
    login: API_URL+"login/",
    edit_user: API_URL+"edit_user/",
    edit_kid:API_URL+"edit_kid/",
    addFoundKid: API_URL+"add_found_kid/",
    addMissingKid:API_URL+"add_missing_kid/",
    getMissingKIds:API_URL+"get_missing_kids/",
    getMatchingProfiles:API_URL+"get_matching_profiles/",
    getMyKids:API_URL+"get_my_kids/",
}