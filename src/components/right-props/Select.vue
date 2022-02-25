<script setup>
const store = useStore();
const updateCompStyle = (item) => {
  store.commit("updateCompStyle", item);
};
</script>
<template>
  <div>
    <a-select :value="chosed" style="width: 120px" @change="handleChange">
      <a-select-option value="normal"> normal </a-select-option>
      <a-select-option value="italic"> italic </a-select-option>
      <a-select-option value="oblique"> oblique </a-select-option>
    </a-select>
  </div>
</template>
<script>
import { useStore } from "vuex";
export default {
  props: {
    chosed: {
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
    handleChange(value) {
      const { label, name } = this;
      const params = { label, name, val: value };
      this.updateCompStyle(params);
    },
  },
};
</script>
