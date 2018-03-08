import axios from "axios";

export default {
    getStatuts: function() {
        return axios.get('api/FitnetManager/rest/status', {
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