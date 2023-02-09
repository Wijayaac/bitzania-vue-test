<template>
  <div class="stopwatch">
    <h1>Stopwatch</h1>
    <div class="content">
      <div class="time">
        <p>Hrs : Mins : Seconds : MiliSeconds</p>
        <span>
          {{ hoursData }} : {{ minutesData }} : {{ secondsData }} :
          {{ milisecondsData }}
        </span>
      </div>
    </div>
    <div class="action">
      <button @click="toggleStopwatch">
        {{ isActive ? "Stop" : "Start" }}
      </button>
      <button @click="reset">Reset</button>
      <button @click="saveCurrentTime">Save Log</button>
    </div>
    <div class="log" v-if="loggedData.length">
      <p>H : M : S : MS</p>
      <ul>
        <li v-for="(log, index) in loggedData" :key="index">
          {{ log.time }}
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
h1 {
  text-align: center;
}
.content {
  display: flex;
  justify-content: center;
}
.time {
  text-align: center;
}
.time p {
  font-size: 22px;
  font-weight: 700;
}
.time span {
  font-size: 48px;
}

.action {
  max-width: 480px;
  margin: 30px auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.action button {
  padding: 12px 24px;
  font-size: 20px;
  font-weight: 600;
}
.log {
  background-color: #eee;
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.log p {
  margin-left: 10px;
  font-size: 22px;
  text-align: center;
  font-weight: 700;
}
ul {
  padding-left: 20px;
}
li {
  font-size: 24px;
  font-weight: 600;
}
</style>

<script setup>
import { ref, computed } from "vue";

const milisecondsData = ref(0);
const secondsData = ref(0);
const minutesData = ref(0);
const hoursData = ref(0);
const loggedData = ref([]);

const currentTime = computed(() => ({
  time: `${hoursData.value} : ${minutesData.value} : ${secondsData.value} : ${milisecondsData.value}`,
}));

const isActive = ref(false);
const timeStopped = ref(null);
const stoppedDuration = ref(0);
const timeOnBegining = ref(null);
const clock = ref(null);

function start() {
  if (timeOnBegining.value === null) {
    timeOnBegining.value = new Date();
  }

  if (timeStopped.value !== null) {
    stoppedDuration.value += new Date() - timeStopped.value;
  }

  clock.value = setInterval(stopWatchTimer, 10);
}

function stop() {
  timeStopped.value = new Date();
  clearInterval(clock.value);
}

function reset() {
  clearInterval(clock.value);
  if (isActive.value) {
    isActive.value = !isActive.value;
  } else {
    isActive.value = false;
  }
  stoppedDuration.value = 0;
  timeOnBegining.value = null;
  timeStopped.value = null;

  hoursData.value = 0;
  minutesData.value = 0;
  secondsData.value = 0;
  milisecondsData.value = 0;
  loggedData.value = [];
}

function stopWatchTimer() {
  let currentTime = new Date();
  let timeElapsed = new Date(
    currentTime - timeOnBegining.value - stoppedDuration.value
  );

  const hours = timeElapsed.getUTCHours();
  const minutes = timeElapsed.getUTCMinutes();
  const seconds = timeElapsed.getUTCSeconds();
  const miliseconds = (timeElapsed.getUTCMilliseconds() / 10) | 0;

  hoursData.value = formatNum(hours);
  minutesData.value = formatNum(minutes);
  secondsData.value = formatNum(seconds);
  milisecondsData.value = formatNum(miliseconds);
}

function formatNum(num) {
  return num < 10 ? "0" + num : num;
}

function toggleStopwatch() {
  isActive.value = !isActive.value;
  return isActive.value ? start() : stop();
}
function saveCurrentTime() {
  loggedData.value.push(currentTime.value);
}
</script>
