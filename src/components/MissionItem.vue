<template>
    <div v-if="mission">
        <h2 class="mdl-typography--text-left">{{mission.title}}</h2>
        <div class="content-grid mdl-grid">
            <div class="mdl-textfield js-textfield mdl-typography--text-left mdl-cell--6-col">
                <label><b>Client</b></label>
                <span>{{client.name}}</span>
            </div>
            <div class="mdl-textfield js-textfield mdl-typography--text-left mdl-cell--6-col">
                <label><b>Description</b></label>
                <span>{{mission.description}}</span>
            </div>
            <div class="mdl-textfield js-textfield mdl-typography--text-left mdl-cell--6-col">
                <label><b>Date de début</b></label>
                <span>{{mission.beginDate}}</span>
            </div>
            <div class="mdl-textfield js-textfield mdl-typography--text-left mdl-cell--6-col">
                <label><b>Date de fin</b></label>
                <span>{{mission.endDate}}</span>
            </div>
            <div class="mdl-textfield js-textfield mdl-typography--text-left mdl-cell--6-col">
                <label><b>Statut</b></label>
                <span>{{statut}}</span>
            </div>
            <div class="mdl-textfield js-textfield mdl-typography--text-left mdl-cell--6-col">
                <label><b>Facturation</b></label>
                <span>{{facturation}}</span>
            </div>
            <div class="mdl-typography--text-right mdl-cell--12-col">
                <button v-on:click="sePositionner" class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored">
                    Se positionner
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import clientService from "@/services/client.service";
import facturationService from "@/services/facturation.service";
import statutService from "@/services/statut.service";
export default {
  props: ["mission"],
  data() {
    return {
      client: {},
      statut: "",
      facturation: ""
    };
  },
  mounted() {
    this.storeMission();
    this.getClient();
    this.getStatut();
    this.getFacturation();
  },
  methods: {
    getClient: function() {
      clientService
        .getClient(this.mission.customerId)
        .then(response => (this.client = response.data));
    },
    storeMission: function() {
      if (this.mission !== undefined && this.mission !== null) {
        localStorage.setItem("mission", JSON.stringify(this.mission));
      } else {
        this.mission = JSON.parse(localStorage.getItem("mission"));
      }
    },
    getStatut: function() {
      statutService.getStatuts().then(response => {
        var statut_mission = this.mission.status;
        var statut = _.find(response.data, { statusCode: statut_mission });
        this.statut = statut.nameFR;
      });
    },
    getFacturation: function() {
      facturationService.getFacturations().then(response => {
        var type_facturation = this.mission.billingMode;
        var facturation = _.find(response.data, { billingModeCode: type_facturation });
        this.facturation = facturation.nameFR;
      });
    },
    sePositionner: function(){
        console.log("OK");
    }
  }
};
</script>

<style>
label:after {
  content: "\A";
  white-space: pre;
}

h2{
    margin: 0px 10px;

}
</style>
