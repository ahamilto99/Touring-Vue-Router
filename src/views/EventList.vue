<template>
  <h1>Events for Good</h1>
  <div class="events">
    <EventCard v-for="event in events" :key="event.id" :event="event" />

    <div class="pagination">
      <router-link
        id="page-prev"
        :to="{ name: 'EventList', query: { page: page - 1 } }"
        rel="prev"
        v-if="page != 1"
        >&#60; Previous</router-link
      >

      <div>
        <router-link
          v-for="pageNum in totalEvents / 2"
          :events="events"
          :key="pageNum"
          :to="{ name: 'EventList', query: { page: pageNum } }"
          :style="
            pageNum == page
              ? 'pointer-events: none; text-decoration-line: underline;'
              : 'pointer-events: auto;'
          "
          >&#160;{{ pageNum }}&#160;</router-link
        >
      </div>

      <router-link
        id="page-next"
        :to="{ name: 'EventList', query: { page: page + 1 } }"
        rel="next"
        v-if="hasNextPage"
        >Next &#62;</router-link
      >
    </div>
  </div>
</template>

<script>
import EventCard from '@/components/EventCard.vue'
import EventService from '@/services/EventService.js'

export default {
  name: 'EventList',
  props: ['page'],
  components: {
    EventCard
  },
  data() {
    return {
      events: null,
      totalEvents: 0
    }
  },
  async beforeRouteEnter(routeTo, routeFrom, next) {
    try {
      const response = await EventService.getEvents(
        2,
        parseInt(routeTo.query.page) || 1
      )
      // next(...) tells Vue Router to wait until the API call returns b/4 routing
      next(component => {
        component.events = response.data
        component.totalEvents = response.headers['x-total-count']
      })
    } catch (e) {
      next({ name: 'NetworkError' })
    }
  },
  async beforeRouteUpdate(routeTo) {
    try {
      const response = await EventService.getEvents(
        2,
        parseInt(routeTo.query.page) || 1
      )
      this.events = response.data
      this.totalEvents = response.headers['x-total-count']
    } catch (e) {
      return { name: 'NetworkError' }
    }
  },
  computed: {
    hasNextPage() {
      const totalPages = Math.ceil(this.totalEvents / 2)

      return this.page < totalPages
    }
  }
}
</script>

<style scoped>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.pagination {
  display: flex;
  width: 290px;
}
.pagination a {
  flex: 1;
  text-decoration: none;
  color: #2c3e50;
}

#page-prev {
  text-align: left;
}

#page-next {
  text-align: right;
}
</style>
