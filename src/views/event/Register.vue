<template>
  <p>Registration for the Event Here</p>
  <button @click="register">Register Me!</button>
</template>

<script>
export default {
  props: ['event'],
  inject: ['GStore'], // injects the global store
  methods: {
    register() {
      // assuming the registration API call is successful
      this.GStore.flashMessage = `You are successfully registered for ${this.event.title}`
      setTimeout(() => {
        // remove after 3 seconds
        this.GStore.flashMessage = ''
      }, 3000)
      this.$router.push({
        name: 'EventDetails',
        params: { id: this.event.id }
      })
    }
  }
}
</script>
