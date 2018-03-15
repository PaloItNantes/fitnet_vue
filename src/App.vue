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
          this.$router.replace("login");
          document
            .getElementsByClassName("mdl-layout__obfuscator")[0]
            .classList.remove("is-visible");
        });
    },
    goToMissions: function(){
      this.$router.push({name : 'mission_list'});
    },
    getCurrentUser: function() {
      return firebase.auth().currentUser;
    }
  }
};
</script>

<style>
.md-app {
  height: 100vh;
}

a {
  cursor: pointer;
}

.md-drawer {
  width: 230px;
  max-width: calc(100vw - 125px);
  background-color: white;
  position: fixed;
}

.md-primary {
  background-color: #2196f3;
  color: white;
}

.md-success {
  background-color: #28a745;
  color: white;
}

.md-warning {
  background-color: #ffc107;
  color: white;
}

.user{
  display: inherit;
  height: 150px;
  padding-top: 100px;
}

.md-icon-button,
.md-title {
  color: white;
}

.md-list-item-text {
  cursor: pointer;
}

.white{
  color:white;
}
</style>
