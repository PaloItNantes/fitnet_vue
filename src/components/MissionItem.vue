<template>
<div v-if="mission">
   <h2 class="mdl-typography--text-left">{{mission.title}}</h2>
   <div class="md-layout md-gutter">
      <div class="md-layout-item md-size-50 md-xsmall-size-100">
         <label><b>Client</b></label>
         <span>{{client.name}}</span>
      </div>
      <div class="md-layout-item md-size-50 md-xsmall-size-100">
         <label><b>Description</b></label>
         <span>{{mission.description}}</span>
      </div>
   </div>
   <div class="md-layout md-gutter">
      <div class="md-layout-item md-size-50 md-xsmall-size-100">
         <label><b>Date de début</b></label>
         <span>{{mission.beginDate}}</span>
      </div>
      <div class="md-layout-item md-size-50 md-xsmall-size-100">
         <label><b>Date de fin</b></label>
         <span>{{mission.endDate}}</span>
      </div>
   </div>
   <div class="md-layout md-gutter">
      <div class="md-layout-item md-size-50 md-xsmall-size-100">
         <label><b>Statut</b></label>
         <span>{{statut}}</span>
      </div>
      <div class="md-layout-item md-size-50 md-xsmall-size-100">
         <label><b>Facturation</b></label>
         <span>{{facturation}}</span>
      </div>
   </div>
   <div class="md-layout">
      <md-button v-on:click="sePositionner(mission.title)" class="md-primary">
         Se positionner
      </md-button>
   </div>
    <md-snackbar md-position="center" v-bind:class="[position_statut === 'CREATED' ? 'md-success' : 'md-warning']" :md-duration=2000 :md-active.sync="showSnackbar" md-persistent>
      <span>{{message}}</span>
    </md-snackbar>
</div>
</template>

<script>
import clientService from "@/services/client.service";
import missionService from "@/services/mission.service";
import facturationService from "@/services/facturation.service";
import statutService from "@/services/statut.service";
import spreadsheetService from "@/services/spreadsheet.service";

export default {
  props: ["id"],
  data() {
    return {
      client: {},
      mission: {},
      statut: "",
      facturation: "",
      message: '',
      position_statut: '',
      showSnackbar: false
    };
  },
  mounted() {
    this.getMission();
  },
  methods: {
    getClient: function(clientId) {
      clientService
        .getClient(clientId)
        .then(response => (this.client = response.data));
    },
    getMission: function() {
      missionService.getMission(this.id).then(response => {
        this.mission = response.data;
        this.getClient(this.mission.customerId);
        this.getStatut(this.mission.status);
        this.getFacturation(this.mission.billingMode);
      });
    },
    getStatut: function(missionStatus) {
      statutService.getStatuts(missionStatus).then(response => {
        let statut = _.find(response.data, { statusCode: missionStatus });
        this.statut = statut.nameFR;
      });
    },
    getFacturation: function(billingMode) {
      facturationService.getFacturations().then(response => {
        let facturation = _.find(response.data, {
          billingModeCode: billingMode
        });
        this.facturation = facturation.nameFR;
      });
    },
    sePositionner: function(mission) {
      spreadsheetService
        .savePositionnement(mission).then((data) => {
          //SUCCESS
          this.showSnackbar = true;
          this.message = data.message;
          this.position_statut = data.statut;
          console.log(this.position_statut);

          if(this.position_statut === "CREATED"){
            setTimeout(() => {
              this.$router.replace({name:'MissionList'})
            }, 1000);
          }
        }, () => {
          //ERROR
          this.showSnackbar = true;
          this.message = 'Erreur lors du positionnement du collaborateur';
        });
    }
  }
};
</script>

<style>
label:after {
  content: "\A";
  white-space: pre;
}

h2 {
  margin-left: 10px;
}

.md-layout-item {
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
