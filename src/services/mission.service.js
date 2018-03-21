import axios from "axios";
import Vue from 'vue';
import https from 'https'

export default {
    getMissions: function() {
        return axios.get('/fitnet/FitnetManager/rest/contracts/1', {
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
        return axios.get(`/fitnet/FitnetManager/rest/contracts/read/${id}`, {
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