<script setup>
import { ref } from "vue";
import { exposeCompData } from "../setup/vuex/index";
const { activeComp } = exposeCompData();
</script>
<template>
  <div>
    <a-tabs default-active-key="1" @change="callback">
      <a-tab-pane key="1" tab="样式">
        <div
          class="single-style"
          v-for="(item, index) in activeComp.styles"
          :key="index"
        >
          <p class="title">{{ item.label }}</p>
          <div class="style-wrap">
            <div class="styles" v-for="(i, j) in item.data" :key="j">
              <p class="desc">{{ i.desc }}：</p>
              <input-color
                v-if="i.type === 'InputColor'"
                :colors="i.value"
                :label="item.label"
                :name="i.name"
              />
              <input-number
                v-else-if="i.type === 'InputNumber'"
                :num="i.value"
                :label="item.label"
                :name="i.name"
              />
              <select-item
                v-else-if="i.type === 'SelectItem'"
                :chosed="i.value"
                :label="item.label"
                :name="i.name"
              />
              <upload-image v-else :img="i.value" />
            </div>
          </div>
        </div>
      </a-tab-pane>
      <a-tab-pane key="2" tab="属性"> </a-tab-pane>
    </a-tabs>
  </div>
</template>
<script>
import InputColor from "../components/right-props/InputColor.vue";
import InputNumber from "../components/right-props/InputNumber.vue";
import SelectItem from "../components/right-props/Select.vue";
import UploadImage from "../components/right-props/UploadImage.vue";

export default {
  data() {
    return {};
  },
  components: {
    InputColor,
    InputNumber,
    SelectItem,
    UploadImage,
  },
  methods: {
    callback(key) {
      console.log(key);
    },
  },
};
</script>
<style lang="less" scoped>
.single-style {
  .title {
    height: 30px;
    line-height: 30px;
    background: #f2f4f5;
    font-size: 14px;
    font-weight: bold;
    padding: 0 10px;
  }
  .style-wrap {
    padding: 10px 0 0 10px;
    .desc {
      white-space: nowrap;
      margin-right: 10px !important;
    }
    .styles {
      width: 100%;
      display: flex;
      align-items: center;
      margin-bottom: 20px;
    }
  }
}
</style>
