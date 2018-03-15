<template>
<div class="mdl-typography--text-center mdl-cell--12-col">
   <div class="md-layout md-gutter md-alignment-center">
      <md-button v-on:click="googleConnect" class="md-primary">
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
        document.getElementsByClassName('mdl-layout__drawer')[0].classList.add('is-visible')
      }, function(err){
        alert(err.message);
      });
    },
    goTo: function(){
      this.$router.push('mission_list');
    }
  }
};
</script>

<style>

</style>
