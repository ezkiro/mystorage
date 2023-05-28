<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      count: 0,
    };
  },
  methods: {
    increment() {
      this.count++;
    },
  },
  mounted() {
    this.increment();
    console.log("Counter component is mounted");
  },
});
</script>

<template>
  <div>
    <p>Count: {{ count }}</p>
    <button @click="increment">Increment</button>
  </div>
</template>
