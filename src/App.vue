<script setup></script>

<template>
  <router-view></router-view>
</template>

<style>
.comp {
  display: flex;
  padding: 5px 15px;
  align-items: center;
  border: 2px solid #f0eff2;
  border-radius: 8px;
  flex-shrink: 0;
  margin-bottom: 10px;
  cursor: grab;
}
.text-icon {
  display: block;
  width: 32px;
  height: 32px;
  margin-right: 10px;
}
p {
  margin: 0 !important;
  padding: 0 !important;
}
body {
  height: 100%;
}
#app {
  height: 100%;
}
html {
  height: 100%;
}
</style>
