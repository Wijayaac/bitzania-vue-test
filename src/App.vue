<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/stopwatch">Stopwatch</RouterLink>
        <RouterLink to="/movies">Movies</RouterLink>
      </nav>
    </div>
  </header>
  <div class="page-wrap">
    <RouterView />
  </div>
</template>

<style scoped>
.page-wrap {
  max-width: 1320px;
  margin: 0 auto;
}
</style>
