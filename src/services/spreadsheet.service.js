import firebase from "firebase";

export default {
    savePositionnement: function(mission) {
        let script_url = "https://script.google.com/a/palo-it.com/macros/s/AKfycbz8_ZfTsW_mq7vdpGrWuwSyEWuVjOuM3hWYwXx6iQO8cS6cRZoq/exec";

        var url = script_url + "?nom=" + firebase.auth().currentUser.displayName + "&mission=" + mission;
        var callback = {};

        return jQuery.ajax({
            crossDomain: true,
            crossOrigin: true,
            url: url,
            method: "GET",
            dataType: "jsonp",
            data: {
                'nom': firebase.auth().currentUser.displayName,
                'mission': mission
            }
        });
    }
}