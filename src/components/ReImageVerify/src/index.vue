<script setup lang="ts">
import { UseImageVerify } from "./hooks";
// defineOptions({
//   name: "ReImageVerify",
// })
interface Props {
  code?: string;
}
interface Emits {
  (e: "update:code", code: string): void;
}
const props = withDefaults(defineProps<Props>(), {
  code: ""
});
const emits = defineEmits<Emits>();
const { domRef, imgCode, setImgCode, getImgCode } = UseImageVerify();

watch(
  () => props.code,
  code => {
    if (code) {
      setImgCode(code);
    }
  }
);
watch(imgCode, newValue => {
  emits("update:code", newValue);
});
</script>
<template>
  <canvas class="cursor-pointer" ref="domRef" width="120" height="40" @click="getImgCode"></canvas>
</template>
<style scoped>
.canvas {
  padding: 0;
}
</style>
