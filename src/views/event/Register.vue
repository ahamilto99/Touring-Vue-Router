<template>
  <p>Registration for the Event Here</p>
  <button @click="register">Register Me!</button>
</template>

<script>
export default {
  props: ['event'],
  methods: {
    register() {
      // If registration API call is successful
      this.$router.push({
        name: 'EventDetails',
        params: { id: this.event.id }
      })
    }
  }
}
</script>
