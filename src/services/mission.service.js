import axios from "axios";

export default {
    getMissions: function() {
        return axios.get('api/FitnetManager/rest/contracts/1', {
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                    "Authorization": "Basic ZmJhaWxsYXJnZWF1QHBhbG8taXQuY29tOnZoVDczOSFIRmU="
                }
            })
            .then(response => {
                return response;
            })
            .catch(e => {
                console.log(e);
                this.errors.push(e)
            })
    },
    getMission: function(id) {
        return axios.get(`api/FitnetManager/rest/contracts/read/${id}`, {
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                    "Authorization": "Basic ZmJhaWxsYXJnZWF1QHBhbG8taXQuY29tOnZoVDczOSFIRmU="
                }
            })
            .then(response => {
                return response;
            })
            .catch(e => {
                console.log(e);
                this.errors.push(e)
            })
    }
}