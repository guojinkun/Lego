<script setup>
import { useStore } from "vuex";
import { exposeCompData } from "../setup/vuex";
const pointList = ["lt", "t", "rt", "l", "r", "lb", "b", "rb"];
const pointStyle = { w: 8, h: 8 };
const { activeComp } = exposeCompData();
const store = useStore();
const updateCompStyle = (item) => {
  store.commit("updateCompStyle", item);
};
const setActiveComp = (item) => {
  store.commit("setActiveComp", item);
};
</script>
<template>
  <div class="shape" @mousedown.stop="compMove" ref="shape">
    <div class="shape-border" v-show="isActive && !noFocus"></div>
    <div
      class="point"
      v-for="(item, index) in pointList"
      :key="index"
      :style="getStyle(item)"
      @mousedown.stop="drag(item, $event)"
      v-show="isActive && !noFocus"
    ></div>
    <div ref="comp">
      <slot name="comp"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    compData: {},
    noFocus: {
      type: Boolean,
      default() {
        return false;
      },
    },
  },
  computed: {
    isActive() {
      const { activeComp, compData } = this;
      return activeComp === compData;
    },
  },
  methods: {
    compMove(e) {
      this.$emit("focused");
      this.chosedActive();
      let startX = e.pageX;
      let startY = e.pageY;
      const { comp, shape } = this.$refs;
      const up = ($e) => {
        document.removeEventListener("mousemove", move, false);
        document.removeEventListener("mouseup", up, false);
      };
      const move = (event) => {
        event.preventDefault();
        event.stopPropagation();
        const moveX = event.pageX;
        const moveY = event.pageY;
        const cX = moveX - startX;
        const cH = moveY - startY;
        const currentTop = Number(comp.parentNode.style.top.replace("px", ""));
        const currentLeft = Number(
          comp.parentNode.style.left.replace("px", "")
        );
        const fT = currentTop + cH;
        const fL = currentLeft + cX;
        this.updateCompStyle({ label: "位置", name: "top", val: fT });
        this.updateCompStyle({ label: "位置", name: "left", val: fL });
        startX = moveX;
        startY = moveY;
      };
      document.addEventListener("mousemove", move, false);
      document.addEventListener("mouseup", up, false);
    },
    chosedActive() {
      const { compData } = this;
      this.setActiveComp(compData);
    },
    getStyle(item) {
      let styles = "";
      const { w, h } = this.pointStyle;
      switch (item) {
        case "lt":
          styles = `top:${-h / 2}px;left:${-w / 2}px;cursor:se-resize`;
          break;
        case "t":
          styles = `top:${
            -h / 2
          }px;left:50%;transform: translateX(-50%);cursor:s-resize`;
          break;
        case "rt":
          styles = `top:${-h / 2}px;right:${-w / 2}px;cursor:ne-resize`;
          break;
        case "l":
          styles = `left:${
            -w / 2
          }px;top:50%;transform: translateY(-50%);cursor:w-resize`;
          break;
        case "r":
          styles = `right:${
            -w / 2
          }px;top:50%;transform: translateY(-50%);cursor:w-resize`;
          break;
        case "lb":
          styles = `left:${-w / 2}px;bottom:${-h / 2}px;cursor:ne-resize`;
          break;
        case "b":
          styles = `bottom:${
            -h / 2
          }px;left:50%;transform: translateX(-50%);cursor:s-resize`;
          break;
        case "rb":
          styles = `bottom:${-h / 2}px;right:${-w / 2}px;cursor:se-resize`;
          break;
      }
      return styles;
    },
    drag(dir, e) {
      let startX = e.pageX;
      let startY = e.pageY;
      const { comp } = this.$refs;
      const move = (event) => {
        event.preventDefault();
        event.stopPropagation();
        const moveX = event.pageX;
        const moveY = event.pageY;
        const cH = moveY - startY;
        const cW = moveX - startX;
        // 最终的元素高度、元素宽度、元素横轴间距、元素纵轴间距
        let fH, fW, fL, fT;
        switch (dir) {
          case "b":
            fH = comp.offsetHeight + cH;
            this.updateCompStyle({ label: "宽高", name: "height", val: fH });
            break;
          case "t":
            fH = comp.offsetHeight - cH;
            fT = Number(comp.parentNode.style.top.replace("px", "")) + cH;
            this.updateCompStyle({ label: "宽高", name: "height", val: fH });
            if (cH <= comp.offsetHeight) {
              this.updateCompStyle({ label: "位置", name: "top", val: fT });
            }
            break;
          case "l":
            fW = comp.offsetWidth - cW;
            fL = Number(comp.parentNode.style.left.replace("px", "")) + cW;
            this.updateCompStyle({ label: "宽高", name: "width", val: fW });
            if (cW <= comp.offsetWidth) {
              this.updateCompStyle({ label: "位置", name: "left", val: fL });
            }
            break;
          case "r":
            fW = comp.offsetWidth + cW;
            this.updateCompStyle({ label: "宽高", name: "width", val: fW });
            break;
          case "lt":
            fW = comp.offsetWidth - cW;
            fH = comp.offsetHeight - cH;
            fL = Number(comp.parentNode.style.left.replace("px", "")) + cW;
            fT = Number(comp.parentNode.style.top.replace("px", "")) + cH;
            this.updateCompStyle({ label: "宽高", name: "width", val: fW });
            this.updateCompStyle({ label: "宽高", name: "height", val: fH });
            if (cW <= comp.offsetWidth && cH <= comp.offsetHeight) {
              this.updateCompStyle({ label: "位置", name: "left", val: fL });
              this.updateCompStyle({ label: "位置", name: "top", val: fT });
            }
            break;
          case "rt":
            fW = comp.offsetWidth + cW;
            fH = comp.offsetHeight - cH;
            fT = Number(comp.parentNode.style.top.replace("px", "")) + cH;
            this.updateCompStyle({ label: "宽高", name: "width", val: fW });
            this.updateCompStyle({ label: "宽高", name: "height", val: fH });
            if (cH <= comp.offsetHeight) {
              this.updateCompStyle({ label: "位置", name: "top", val: fT });
            }
            break;
          case "lb":
            fW = comp.offsetWidth - cW;
            fH = comp.offsetHeight + cH;
            fL = Number(comp.parentNode.style.left.replace("px", "")) + cW;
            this.updateCompStyle({ label: "宽高", name: "width", val: fW });
            this.updateCompStyle({ label: "宽高", name: "height", val: fH });
            if (cW <= comp.offsetWidth) {
              this.updateCompStyle({ label: "位置", name: "left", val: fL });
            }
            break;
          case "rb":
            fW = comp.offsetWidth + cW;
            fH = comp.offsetHeight + cH;
            this.updateCompStyle({ label: "宽高", name: "width", val: fW });
            this.updateCompStyle({ label: "宽高", name: "height", val: fH });
            break;
        }
        startX = moveX;
        startY = moveY;
      };
      const up = ($e) => {
        document.removeEventListener("mousemove", move, false);
        document.removeEventListener("mouseup", up, false);
      };
      document.addEventListener("mousemove", move, false);
      document.addEventListener("mouseup", up, false);
    },
    getPosition() {
      const { compData } = this;
      const styles = compData.styles;
      let res;
      for (let i = 0; i < styles; i++) {
        if (styles[i].label === "位置") {
          const data = styles[i].data;
          for (let j = 0; j < data.length; j++) {
            res += `${data[j].name}:${data[j].value}px`;
          }
        }
      }
      return res;
    },
  },
};
</script>

<style lang="less" scoped>
.shape {
  position: absolute;
  width: fit-content;
  cursor: move;
  .shape-border {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    border: 2px solid #1261ff;
  }
  .point {
    position: absolute;
    background: #1261ff;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    z-index: 1;
    transform-origin: right top;
  }
}
</style>
