<template>
  <div>
    <fire />
    <alarm />
    <alarms />
    <trouble />
    <troubles />
    <danger />
    <dangers />
    <fault />
  </div>
</template>

<script>
import fire from "./fire.vue";
import alarm from "./alarm.vue";
import alarms from "./alarms.vue";
import trouble from "./trouble.vue";
import troubles from "./troubles.vue";
import danger from "./danger.vue";
import dangers from "./dangers.vue";
import fault from "./fault.vue";
export default {
  components: {
    fire,
    alarm,
    alarms,
    trouble,
    troubles,
    danger,
    dangers,
    fault
  },
  props: {
  },
  methods: {}
};
</script>
