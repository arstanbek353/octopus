<template>
  <div class="dealsPage">
    <CatalogList :data="loaded ? $store.getters.getBusket : null" :is_deals="true"/>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapGetters } from 'vuex'

export default {
  name: 'dealsPage',
  data() {
    return {
      items: null,
      loaded: false
    }
  },
  methods: {
    ...mapActions([
      'fetchItems',
      'fetchBusket',
    ]),
    ...mapMutations([
      'setqueryParams',
      'resetQueryParams',
    ]),
  },
  computed: {
    ...mapGetters([
      'getBusketIds'
    ])
  },
  created() {
    this.resetQueryParams()
  },
  mounted() {
    this.$fetch()
  },
  async fetch() {
    this.loaded = false
    await this.fetchBusket()
    await this.setqueryParams({is_favourite: null, ids: this.getBusketIds})
    await this.fetchItems()
    this.loaded = true
  }
}
</script>
