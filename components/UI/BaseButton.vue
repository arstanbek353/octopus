<template>
  <button class="button">
    <slot></slot>
  </button>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.button {
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-weight: 500;
  font-size: 15px;
  padding: 17.5px 25px;
  background-color: $second-color;
  border-radius: 10px;
  &--success {
    color: #fff;
    background: #69C57F;
  }
  &:disabled {
    color: #969DC3;
    background-color: transparent;
    border: $border;
  }
  @media (max-width: 48em) {
    font-size: 12px;
    flex-shrink: 1;
  }
}
</style>