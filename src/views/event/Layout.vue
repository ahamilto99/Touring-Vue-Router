<template>
  <div v-if="event">
    <h1>{{ event.title }}</h1>
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
    <router-view :event="event" />
  </div>
</template>

<script>
import EventService from '@/services/EventService.js'

export default {
  props: ['id'],
  data() {
    return {
      event: null
    }
  },
  async created() {
    try {
      const response = await EventService.getEvent(this.id)
      this.event = response.data
    } catch (e) {
      console.log(e)
      if (e.response && e.response.status == 404) {
        this.$router.push({
          name: '404Resource',
          params: { resource: 'event' }
        })
      } else {
        this.$router.push({ name: 'NetworkError' })
      }
    }
  }
}
</script>
