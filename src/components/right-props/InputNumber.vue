<script setup>
const store = useStore();
const updateCompStyle = (item) => {
  store.commit("updateCompStyle", item);
};
</script>
<template>
  <div>
    <a-input-number :value="num" :min="1" @change="onChange" id="inputNumber" />
  </div>
</template>
<script>
import { useStore } from "vuex";
export default {
  props: {
    num: {
      type: [String, Number],
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
  data() {
    return {};
  },
  methods: {
    onChange(val) {
      const { label, name } = this;
      const params = { label, name, val };
      this.updateCompStyle(params);
    },
  },
};
</script>
