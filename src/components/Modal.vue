<script setup>
const { visible, data } = defineProps(["visible", "data"]);
console.log(data);
</script>
<template>
  <div :class="visible ? 'show' : 'hide'">
    <form>
      <input type="text" placeholder="Name" />
      <input type="text" placeholder="Age" />
      <button type="button">Update</button>
    </form>
    <button @click="visible = false">exit</button>
  </div>
</template>
<style scoped>
.show {
  display: block;
}
.hide {
  display: none;
}
</style>
