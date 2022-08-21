<template>
  <main class="default-layout">
    <TheHeader/>
    <Nuxt/>
    <TheFooter/>
  </main>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
.default-layout {
  padding-top: 190px;
  @media (max-width: 48em) {
    padding-top: 140px;
  }
}
</style>