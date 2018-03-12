<template>
<div class="mdl-typography--text-center mdl-cell--12-col">
   <h2>Fitnet Vue</h2>
   <br>
   <button v-on:click="googleConnect" class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored">
   Se connecter
   </button>
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
