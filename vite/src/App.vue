<template>
  <div>
    <h1>嗨害嗨</h1>
    <h2>
      <span>我汤姆莱{{ count }}次啦</span>
      <button @click="count++">+1</button>
    </h2>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  setup() {
    const count = ref(6);
    function add() {
      count.value++;
    }
    return { count };
  },
};
</script>