<template>
  <div class="IndexPage">
    <CatalogList :data="$store.state.items"/>
  </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'

export default {
  name: 'IndexPage',
  // data() {
  //   return {
  //     items: null
  //   }
  // },
  methods: {
    ...mapActions([
      'fetchItems',
    ]),
    ...mapMutations([
      'resetQueryParams',
    ]),
  },
  created() {
    this.resetQueryParams()
  },
  mounted() {
    this.$fetch()
  },
  async fetch() {
    this.fetchItems()
  }
}
</script>
