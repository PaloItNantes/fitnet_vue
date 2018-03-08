<template>
<div>
      <div class="content-grid mdl-grid">
          <div class="mdl-cell mdl-card mdl-shadow--2dp" v-on:click="goToMission(mission)" v-for="mission in missions" :key="mission.lotId">
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

    goToMission: function(mission){
        this.$router.push({
            name: 'mission_item',
            params: {
                mission: mission
            }
        });
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

    .mdl-card {
        cursor: pointer;
    }
</style>
