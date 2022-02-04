<template>
  <p>Edit the Event Here</p>
</template>

<script>
export default {
  props: ['event'],
  data: () => {
    return { unsavedChanges: false }
  },
  beforeRouteLeave() {
    if (this.unsavedChanges) {
      const answer = window.confirm(
        'Do you want to leave? You have unsaved changes.'
      )
      if (!answer) {
        return false
      }
    }
  }
}
</script>
