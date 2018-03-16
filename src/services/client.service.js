import axios from "axios";

export default {
    getClient: function(idClient) {
        return axios.get(process.env.FITNET_ENDPOINT + '/FitnetManager/rest/customers/read/' + idClient, {
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