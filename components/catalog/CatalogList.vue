<template>
  <section class="catalog-list">
    <div class="container">
      <header class="catalog-list__header">
        <FilterType/>
        <SearchFilter class="catalog-list__search"/>
      </header>
      <div class="catalog-list__content">
        <template v-if="data != null && data.length">
          <CatalogCard 
            v-for="item in data" 
            :key="item.id"
            :data="item"
            :is_deals="is_deals"
            class="catalog-list__item"
          />
        </template>
        <div v-else class="catalog-list__empty">
          Не найдено
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    data: {
      type: Array | null,
    },
    is_deals: {
      type: Boolean,
      default: false
    },
  }
}
</script>

<style lang="scss" scoped>
.catalog-list {
  &__header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 36px;
  }
  &__item {
    margin-bottom: 40px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  &__empty {
    font-size: 20px;
    padding: 20px;
    text-align: center;
  }
  @media (max-width: 48em) {
    &__header {
      flex-direction: column-reverse;
      align-items: flex-end;
    }
    &__search {
      margin-bottom: 20px;
    }
  }
}
</style>