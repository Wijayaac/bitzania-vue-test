<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Stopwatch</RouterLink>
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
header {
  text-align: center;
  padding: 20px 0;
}

header a {
  font-size: 20px;
  font-weight: 600;
  color: salmon;
  text-decoration: none;
}
header nav {
  display: flex;
  justify-content: center;
  gap: 40px;
}
</style>
