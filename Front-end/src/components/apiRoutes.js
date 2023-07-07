const API_URL = "https://a2f1-197-42-180-78.ngrok-free.app/";


module.exports = {
    
    mainUrl:API_URL.slice(0, -1),
    register: API_URL+"register/",
    login: API_URL+"login/",
    edit_user: API_URL+"edit_user/",
    edit_kid:API_URL+"edit_kid/",
    addFoundKid: API_URL+"add_found_kid/",
    addMissingKid:API_URL+"add_missing_kid/",
    getMissingKids:API_URL+"get_missing_kids/",
    getNotifications:API_URL+"get_user_notifications/",
    readNotifiation:API_URL+"read_notification/",
    getMatchingProfiles:API_URL+"get_matching_profiles/",
    getMyKids:API_URL+"get_my_kids/",
    logout:API_URL+"user_logout/",
    changeKidState:API_URL+"change_kid_state/",
}