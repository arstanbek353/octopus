<template>
  <header class="header">
    <div class="container">
      <div class="header__inner">
        <div class="header__top"></div>
        <nav class="header__content">
          <ul class="header__list">
            <li>
              <nuxt-link to="/favorites" class="header__item">
                  <picture class="header__icon">
                    <img src="@/assets/icons/favourite.svg" alt="">
                  </picture>
                  <span class="header__text">Избранное</span>
              </nuxt-link>
            </li>
            <li>
              <nuxt-link to="/" class="header__item">
                  <picture class="header__icon">
                    <img src="@/assets/icons/cube.svg" alt="">
                  </picture>
                  <span class="header__text">Склад</span>
              </nuxt-link>
            </li>
            <li>
              <nuxt-link to="/deals" class="header__item">
                  <picture class="header__icon">
                    <img src="@/assets/icons/bag.svg" alt="">
                  </picture>
                  <span class="header__text">Сделки</span>
              </nuxt-link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </header>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: $base-color;
  z-index: 100;
  &__top {
    height: 40px;
    background-color: #E0E3EE;
    border-radius: 0px 0px 10px 10px;
    margin-bottom: 20px;
  }
  &__content {
    display: flex;
    justify-content: flex-end;
  }
  &__list {
    display: flex;
  }
  &__item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-width: 86px;
    min-height: 50px;
    border-radius: 10px;
    &.nuxt-link-exact-active,
    &:hover {
      background-color: $second-color;
    }
  }
  &__icon {
    width: 20px;
    height: 20px;
    margin-bottom: 4px;
  }
  &__text {
    font-weight: 500;
    font-size: 13px;
  }
}
</style>