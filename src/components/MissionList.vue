<template>
<div class="content">
   <md-card class="pointer md-layout-item md-card" @click.native="goToMission(mission.lotId)" v-for="mission in missions" :key="mission.lotId">
      <md-card-header>
         <div class="md-title black">{{mission.title}}</div>
         <div class="md-subhead">Du {{mission.beginDate}} au {{mission.endDate}}</div>
      </md-card-header>
      <md-card-content>
         {{mission.description !== null ? mission.description : 'Aucune description disponible.'}}
      </md-card-content>
   </md-card>
</div>
</template>

<script>
import _ from 'lodash';
import missionService from '@/services/mission.service';

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
        missionService.getMissions().then(response => this.missions = _.orderBy(response.data, ['lotId'], ['desc']))
    },

    goToMission: function(id){
        this.$router.replace({
            name: 'MissionItem',
            params: {
                id: id
            }
        });
    }

  }
};
</script>

<style>
    .md-card{
        margin: 16px;
    }

    .black{
        color: black;
    }

    .pointer{
        cursor: pointer;
    }
</style>
