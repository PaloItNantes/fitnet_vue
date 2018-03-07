<template>
  <div class="notification">
    <button class="mdl-button mdl-js-button mdl-button--raised mdl-button--accent" v-on:click="sendNotification">Send notification</button>
  </div>
</template>

<script>
export default {
  methods : {
    sendNotification : function(event){
      //alert(event);
    }
  }
}
</script>

<style>

</style>
