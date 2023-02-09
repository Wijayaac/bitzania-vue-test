<template>
  <li>
    <h3>{{ props.movie.title }}</h3>
    <p>
      Ranking/Rating : {{ props.movie.rank }} / {{ props.movie.imDbRating }}
    </p>
    <p>Published : {{ props.movie.year }}</p>
  </li>
</template>
<script setup>
const props = defineProps({
  movie: {
    type: Object,
    title: {
      type: String,
    },
    rank: {
      type: String,
    },
    imDbRating: {
      type: String,
    },
    year: {
      type: String,
    },
  },
});
</script>
