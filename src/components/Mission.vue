<template>
<div>
      <div class="content-grid mdl-grid">
          <div class="mdl-cell mdl-card mdl-shadow--2dp" v-for="mission in missions" :key="mission.lotId">
            <div class="mdl-card__title">
                <h4>
                    <div class="mdl-card__title-text">{{mission.title}}</div>
                    <div class="mdl-card__subtitle-text">Du {{mission.beginDate}} au {{mission.endDate}}</div>
                </h4>
            </div>
            <div class="mdl-card__supporting-text">
                {{mission.description !== null ? mission.description.trim() : 'Aucune description disponible.'}}
            </div>
        </div>
  </div>
  </div>
</template>

<script>
import missionService from "@/services/mission.service";
import axios from "axios";
import _ from 'lodash';

export default {
  data() {
    return {
      missions: []
    };
  },
  mounted() {
    this.getMissions();
  },
  methods: {
    getMissions: function() {
    axios.get('api/FitnetManager/rest/contracts/1', {
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            "Authorization": "Basic ZmJhaWxsYXJnZWF1QHBhbG8taXQuY29tOnZoVDczOSFIRmU="
        }
    })
    .then(response => {
        console.log(response);
        this.missions = _.orderBy(response.data, ['lotId'], ['desc']);
    })
    .catch(e => {
        console.log(e);
        this.errors.push(e)
    })
    }
  }
};
</script>

<style>
    .mdl-card__title, .mdl-card__supporting-text{
        padding: 0px 16px;
    }

    .mdl-card__subtitle-text {
        text-align: left;
    }
</style>
