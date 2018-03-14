import firebase from "firebase";
import axios from 'axios';

export default {
    savePositionnement: function(mission) {
        var script_url = process.env.HTTP_GOOGLE_SCRIPT + "?callback=?";

        return $.getJSON(script_url, {
                nom: firebase.auth().currentUser.displayName,
                mission: mission
            },
            function(data, status, xhr) {
                return xhr.status;
            }).fail(function(jqXHR, textStatus, errorThrown) {
            return jqXHR.status;
        })
    }
}