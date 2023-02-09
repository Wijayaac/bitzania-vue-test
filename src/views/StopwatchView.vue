<template>
  <div class="stopwatch">
    <h1>Stopwatch</h1>
    <div class="content">
      <div class="time">
        <p>H : M : S : MS</p>
        <span>
          {{ hoursData }}:{{ minutesData }}:{{ secondsData }}:{{
            milisecondsData
          }}
        </span>
      </div>
      <div class="log">
        <pre>{{ loggedData }}</pre>
      </div>
    </div>
    <div class="action">
      <button @click="toggleStopwatch">Start / Stop</button>
      <button @click="reset">Reset</button>
      <button @click="saveCurrentTime">Save Log</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const milisecondsData = ref(0);
const secondsData = ref(0);
const minutesData = ref(0);
const hoursData = ref(0);
const loggedData = ref([]);

const currentTime = computed(() => ({
  time: `${hoursData.value} ${minutesData.value} ${secondsData.value} ${milisecondsData.value}`,
}));
const isActive = ref(false);

let timeStopped = null;
let stoppedDuration = 0;
let timeBegan = null;
let started = null;

function start() {
  if (timeBegan === null) {
    if (!isActive.value) {
      reset();
    }
    timeBegan = new Date();
  }

  if (timeStopped !== null) {
    stoppedDuration += new Date() - timeStopped;
  }

  started = setInterval(clockRunning, 10);
}

function stop() {
  timeStopped = new Date();
  clearInterval(started);
}

function reset() {
  clearInterval(started);
  if (isActive.value) {
    isActive.value = !isActive.value;
  } else {
    isActive.value = false;
  }
  stoppedDuration = 0;
  timeBegan = null;
  timeStopped = null;

  hoursData.value = 0;
  minutesData.value = 0;
  secondsData.value = 0;
  milisecondsData.value = 0;
  loggedData.value = [];
}

function clockRunning() {
  let currentTime = new Date();
  let timeElapsed = new Date(currentTime - timeBegan - stoppedDuration);

  const hours = timeElapsed.getUTCHours();
  const minutes = timeElapsed.getUTCMinutes();
  const seconds = timeElapsed.getUTCSeconds();
  const miliseconds = timeElapsed.getUTCMilliseconds(1);

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

  if (isActive.value) {
    start();
  } else {
    stop();
  }
}
function saveCurrentTime() {
  loggedData.value.push(currentTime.value);
}
</script>
