<template>
  <div class="favoritesPage">
    <CatalogList :data="$store.state.items"/>
  </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'

export default {
  name: 'favoritesPage',
  data() {
    return {
      items: null
    }
  },
  methods: {
    ...mapActions([
      'fetchItems',
    ]),
    ...mapMutations([
      'setqueryParams',
    ]),
  },
  created() {
    this.setqueryParams({is_favourite: true, ids: null, q: null, type: null})
  },
  mounted() {
    this.$fetch()
  },
  async fetch() {
    await this.fetchItems()
  }
}
</script>
