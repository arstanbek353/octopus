<template>
  <div class="filter">
    <ul class="filter__list">
      <li class="filter__item">
        <label class="filter__label" tabindex="0" @keyup.enter="changeSelected('all')">
          <input type="radio" name="filter_type" @change="changeSelected" value="all" :checked="selected === 'all'" hidden>
          <span>Все типы</span>
        </label>
      </li>
      <li class="filter__item">
        <label class="filter__label" tabindex="0" @keyup.enter="changeSelected('direct_sales')">
          <input type="radio" name="filter_type" @change="changeSelected" value="direct_sales" :checked="selected === 'direct_sales'" hidden>
          <span>Прямые продажи</span>
        </label>
      </li>
      <li class="filter__item">
        <label class="filter__label" tabindex="0" @keyup.enter="changeSelected('auction')">
          <input type="radio" name="filter_type" @change="changeSelected" value="auction" :checked="selected === 'auction'" hidden>
          <span>Аукцион</span>
        </label>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'

export default {
  data() {
    return {
      selected: 'all',
      storeSelected: this.$store.state.queryParams.type
    }
  },
  methods: {
    ...mapActions([
      'fetchItems',
    ]),
    ...mapMutations([
      'setqueryParams',
    ]),
    changeSelected(e) {
      this.selected = typeof e === 'string' ? e : e.target.value
    }
  },
  watch: {
    selected(newValue) {
      this.setqueryParams({type: newValue === 'all' ? null : newValue})
      this.$fetch()
    },
    storeSelected(query) {
      debugger
      if (query === null) {
        this.selected = 'all'
      }
    }
  },
  async fetch() {
    this.fetchItems()
  }
}
</script>

<style lang="scss" scoped>
.filter {
  &__list {
    display: flex;
    padding: 10px 12px;
    background-color: $second-color;
    border: $border;
    border-radius: 10px;
  }
  &__item {
    margin-right: 12px;
    letter-spacing: -0.04em;
    &:last-child {
      margin-right: 0;
    }
  }
  &__label {
    cursor: pointer;
    span {
      opacity: 0.6;
    }
    input:checked + span {
      opacity: 1;
    }
  }
  @media (max-width: 48em) {
    width: 100%;
  }
}
</style>