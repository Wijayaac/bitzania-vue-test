<template>
  <div>
    <h1>Top Movies Group by Name</h1>
    <p v-if="!groupData.length">There is no movies yet</p>
    <ul v-else>
      <li v-for="childs in groupData" :key="childs[0]">
        <div class="label">
          <h2 class="category">{{ childs[0] }}</h2>
          |
          <span class="count">{{ childs[1].length }}</span>
        </div>
        <ul class="grid">
          <MovieItem
            v-for="movie in childs[1]"
            :movie="movie"
            :key="movie.id"
          />
        </ul>
      </li>
    </ul>
  </div>
</template>
<style scoped>
h1 {
  text-align: center;
  margin-bottom: 40px;
}
ul {
  list-style: none;
  padding-left: 0;
}
.label {
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
}
.label::after {
  position: absolute;
  content: "";
  width: 100%;
  height: 2px;
  background-color: grey;
  bottom: 0;
}

.count {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  background-color: black;
  color: white;
  border-radius: 100%;
  text-align: center;
}

.grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 10px;
  padding-left: 40px;
}
</style>

<script setup>
// import movies from "../constants/movies.json";
import { computed, onMounted, ref } from "vue";
import axios from "axios";
const movieItems = ref([]);

onMounted(async () => {
  try {
    let { data } = await axios.get(
      `https://imdb-api.com/en/API/Top250Movies/${
        import.meta.env.VITE_APP_IMDB_API
      }`
    );
    movieItems.value = data.items;
  } catch (error) {
    console.error(error);
  }
});

const groupData = computed(() => {
  for (let i = 0; i < movieItems.value.length; i++) {
    let elems = movieItems.value[i];
    let firstLetter = elems.title.charAt(0);
    elems.categoryName = firstLetter;
  }

  let groups = Object.entries(
    movieItems.value.reduce(
      (prevMovie, currentMovie) => (
        (prevMovie[currentMovie.categoryName] = [
          ...(prevMovie[currentMovie.categoryName] || []),
          currentMovie,
        ]),
        prevMovie
      ),
      {}
    )
  );
  groups.sort();
  return groups;
});
</script>
