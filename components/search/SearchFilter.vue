<template>
  <div class="search">
    <div class="search__inner">
      <input 
        type="text" 
        class="search__input" 
        placeholder="Поиск" 
        v-model="searchText" 
        @keyup.enter="startSearch"
        name="search"
      >
      <button class="search__button" role="search" @click="startSearch">
        <img src="@/assets/icons/search.svg" alt="search">
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'

export default {
  data() {
    return {
      searchText: null,
      q: this.$store.state.queryParams.q
    }
  },
  methods: {
    ...mapActions([
      'fetchItems',
    ]),
    ...mapMutations([
      'setqueryParams',
    ]),
    startSearch() {
      const value = this.searchText.trim()
      if (value === '') {
        this.searchText = null
      }
      this.setqueryParams({q: value})
      this.$fetch()
    }
  },
  async fetch() {
    this.fetchItems()
  },
  watch: {
    q(query) {
      if (!query) {
        this.searchText = null
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.search {
  &__inner {
    display: flex;
    justify-content: space-between;
    padding: 3px;
    border: $border;
    border-radius: 10px;
  }
  &__input {
    width: 230px;
    padding-left: 20px;
    padding-right: 8px;
  }
  &__button {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 10px;
    background-color: $def-color;
    img {
      width: 20px;
      height: 20px;
      object-fit: contain;
    }
  }
  @media (max-width: 48em) {
    width: 100%;
    &__input {
      width: 100%;
    }
  }
}
</style>