<script setup>
const store = useStore();
const updateCompStyle = (item) => {
  store.commit("updateCompStyle", item);
};
</script>
<template>
  <input type="color" :value="colors" @change="updateComp" />
</template>

<script>
import { useStore } from "vuex";
export default {
  props: {
    colors: {
      type: String,
      default() {
        return "";
      },
    },
    label: {
      type: String,
      default() {
        return "";
      },
    },
    name: {
      type: String,
      default() {
        return "";
      },
    },
  },
  methods: {
    updateComp(e) {
      const { label, name } = this;
      const params = { label, name, val: e.target.value };
      this.updateCompStyle(params);
    },
  },
};
</script>

<style></style>
