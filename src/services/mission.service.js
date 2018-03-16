import axios from "axios";

export default {
    getMissions: function() {
        return axios.get(process.env.FITNET_ENDPOINT + '/FitnetManager/rest/contracts/1', {
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                    "Authorization": "Basic " + process.env.FITNET_AUTHORIZATION
                }
            })
            .then(response => {
                return response;
            })
            .catch(e => {
                console.log(e);
            })
    },
    getMission: function(id) {
        return axios.get(process.env.FITNET_ENDPOINT + `/FitnetManager/rest/contracts/read/${id}`, {
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                    "Authorization": "Basic " + process.env.FITNET_AUTHORIZATION
                }
            })
            .then(response => {
                return response;
            })
            .catch(e => {
                console.log(e);
            })
    }
}