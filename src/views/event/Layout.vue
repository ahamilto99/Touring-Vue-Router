<template>
  <div v-if="GStore.event">
    <h1>{{ GStore.event.title }}</h1>
    <div id="nav">
      <router-link :to="{ name: 'EventDetails', params: { id } }"
        >Details</router-link
      >
      |
      <!-- b/c all these links require the id path variable, we can omit it -->
      <router-link :to="{ name: 'EventRegister' }">Register</router-link>
      |
      <router-link :to="{ name: 'EventEdit' }">Edit</router-link>
    </div>
    <!-- passes the event object from the API so we don't have to re-fetch it -->
    <router-view :event="GStore.event" />
  </div>
</template>

<script>
export default {
  inject: ['GStore']
}
</script>
