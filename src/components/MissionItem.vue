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
   <div class="md-layout md-gutter md-alignment-right-center">
      <md-button v-on:click="sePositionner(mission.title)" class="md-primary">
         Se positionner
      </md-button>
   </div>
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
      facturation: ""
    };
  },
  mounted() {
    this.getMission();
    //this.storeMission();
    ///this.getClient();
    //this.getStatut();
    //this.getFacturation();
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
        var statut = _.find(response.data, { statusCode: missionStatus });
        this.statut = statut.nameFR;
      });
    },
    getFacturation: function(billingMode) {
      facturationService.getFacturations().then(response => {
        var facturation = _.find(response.data, {
          billingModeCode: billingMode
        });
        this.facturation = facturation.nameFR;
      });
    },
    sePositionner: function(mission) {
      spreadsheetService
        .savePositionnement(mission)
        .then(
          data => console.log("ehfiuzeguif"),
          err => console.log(err.status)
        );
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
