<template>
<div class="mdl-typography--text-center mdl-cell--12-col">
   <div class="md-layout md-gutter md-alignment-center">
      <md-button v-on:click="googleConnect" class="md-raised md-primary">
         Se connecter
      </md-button>
   </div>
</div>
</template>

<script>
import firebase from "firebase";

export default {
  name: "login",
  methods: {
    googleConnect: function() {
      var provider = new firebase.auth.GoogleAuthProvider();
      var self = this;
      provider.addScope('profile');
      provider.addScope('email');
      provider.setCustomParameters({
        'hd': 'palo-it.com'
      });
      firebase.auth().signInWithRedirect(provider).then(function(result) {

      }, function(err){
        alert(err.message);
      });
    }
  }
};
</script>

<style>

</style>
