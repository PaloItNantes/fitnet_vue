<template>
<div>
   <md-app md-waterfall md-mode="fixed">
      <md-app-toolbar class="md-primary">
         <md-button class="md-icon-button" @click="showNavigation = true" v-if="getCurrentUser()">
            <md-icon>menu</md-icon>
         </md-button>
         <span class="md-title white">Fitnet Vue</span>
      </md-app-toolbar>
      <md-app-drawer :md-active.sync="showNavigation" v-if="getCurrentUser()">
         <md-app-toolbar class="md-primary user" md-elevation="0">
            <md-avatar>
               <img v-bind:src="getCurrentUser().photoURL">
            </md-avatar>
            <span>{{getCurrentUser().displayName}}</span>
         </md-app-toolbar>
         <md-list>
            <md-list-item>
               <span class="md-list-item-text" v-on:click="goToMissions" @click="showNavigation = false">Accueil</span>
            </md-list-item>
            <md-list-item>
               <span class="md-list-item-text" v-on:click="logout" @click="showNavigation = false">Se déconnecter</span>
            </md-list-item>
         </md-list>
      </md-app-drawer>
      <md-app-content>
         <router-view></router-view>
      </md-app-content>
   </md-app>
</div>
</template>

<script>
import firebase from "firebase";
export default {
  name: "app",
  data() {
    return {
      currentUser: null,
      showNavigation: false,
      showSidepanel: false
    };
  },
  methods: {
    logout: function() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.push({name :"Login"});
        });
    },
    goToMissions: function(){
      this.$router.push({name : 'MissionList'});
    },
    getCurrentUser: function() {
      return firebase.auth().currentUser;
    }
  }
};
</script>

<style lang="scss">
// @import "~vue-material/dist/theme/engine"; // Import the theme engine

// @include md-register-theme("default", (
//   primary: #3fffbe, // The primary color of your brand
//   accent: #1a11e8 // The secondary color of your brand
// ));

// @import "~vue-material/dist/theme/all"; // Apply the theme
</style>
