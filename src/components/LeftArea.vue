<script setup>
import { ref } from "vue";
import buildInComp from "../config/component";
import { deepClone } from "../utils/index.js";
const store = useStore();
const setActiveComp = (item) => {
  store.commit("setActiveComp", item);
};
const updateCompStyle = (item) => {
  store.commit("updateCompStyle", item);
};
const zIndex = ref(0);
const addComp = (item) => {
  let anotherItem = deepClone(item);
  store.commit("addComp", anotherItem);
  setActiveComp(anotherItem);
  zIndex.value++;
  console.log("ZIndex", zIndex.value);
  updateCompStyle({ label: "位置", name: "zIndex", val: zIndex.value });
};
</script>
<template>
  <div id="comps">
    <a-collapse v-model="activeKey">
      <a-collapse-panel
        :header="item.theme"
        v-for="(item, index) in buildInComp"
        :key="index"
        :forceRender="true"
      >
        <div class="comp-wrap" id="compWrap">
          <div
            class="comp"
            @click="addComp(i)"
            :ref="i.name"
            v-for="(i, j) in item.comps"
            :key="j"
            :id="`comp_${j}`"
            @mousedown.stop="selectComp($event, i, `comp_${j}`)"
          >
            <img :src="i.icon" alt="" class="text-icon" />
            <p class="desc">{{ i.desc }}</p>
          </div>
        </div>
      </a-collapse-panel>
    </a-collapse>
  </div>
</template>

<script>
import { useStore } from "vuex";

export default {
  data() {
    return {
      text: `A dog is a type of domesticated animal.Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.`,
      activeKey: ["1"],
    };
  },
  methods: {
    selectComp(e, item, id) {
      const _this = this;
      const startX = e.pageX;
      const startY = e.pageY;
      const domElement = document.getElementById(id);
      const copyNode = domElement.cloneNode(true);
      const rectObj = copyNode.getBoundingClientRect();
      const domW = domElement.offsetWidth;
      const dowH = domElement.offsetHeight;
      const copyId = `copy_${id}`;
      copyNode.id = copyId;
      document.addEventListener("mousemove", moveHandler, false);
      document.addEventListener("mouseup", mouseUpHandler, false);
      function moveHandler(event) {
        event.preventDefault();
        const moveX = event.pageX;
        const moveY = event.pageY;
        if (Math.abs(moveX - startX) >= 5 || Math.abs(moveY - startY) >= 5) {
          copyNode.style.cssText += `position:fixed;top:${
            event.pageY - dowH / 2
          }px;left:${event.pageX - domW / 2}px`;
          const tempNode = document.getElementById(copyId);
          if (!tempNode) {
            document.body.appendChild(copyNode);
          }
        }
      }
      function mouseUpHandler() {
        document.removeEventListener("mousemove", moveHandler, false);
        document.removeEventListener("mouseup", mouseUpHandler, false);
        const isInclude = _this.isIncludeEdit(copyId, "edit");
        if (isInclude) {
          _this.addComp(item);
        }
        if (copyNode && copyNode.parentNode) {
          let node = copyNode.parentNode.removeChild(copyNode);
          node = null;
        }
      }
    },
    /**
     * targetDom:目标元素
     * sourceDom:包含容器
     */
    isIncludeEdit(targetId, sourceId) {
      const targetDom = document.getElementById(targetId);
      const sourceDom = document.getElementById(sourceId);
      let horizon, vertical;
      if (targetDom && sourceDom) {
        const targetRect = targetDom.getClientRects()[0];
        const sourceRect = sourceDom.getClientRects()[0];
        const targetLeft = targetRect.left;
        const sourceLeft = sourceRect.left;
        const targetRight = targetRect.right;
        const sourceRight = sourceRect.right;
        const targetTop = targetRect.top;
        const sourceTop = sourceRect.top;
        const targetBottom = targetRect.bottom;
        const sourceBottom = sourceRect.bottom;
        //判断水平方向是否包含在内
        horizon = targetLeft >= sourceLeft && targetRight <= sourceRight;
        //判断垂直方向是否包含在内
        vertical = targetTop >= sourceTop && targetBottom <= sourceBottom;
      }
      return horizon && vertical;
    },
  },
  watch: {
    activeKey(key) {
      console.log(key);
    },
  },
  mounted() {},
};
</script>
<style lang="less" scoped>
/deep/.ant-collapse-item {
  border: none;
}
/deep/.ant-collapse-header {
  font-weight: bold;
  font-size: 15px;
}

.comp-wrap {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  .comp {
    display: flex;
    padding: 5px 15px;
    align-items: center;
    border: 2px solid #f0eff2;
    border-radius: 8px;
    flex-shrink: 0;
    margin-bottom: 10px;
    cursor: grab;
    .text-icon {
      display: block;
      width: 32px;
      height: 32px;
      margin-right: 10px;
    }
  }
}
</style>
