import { defineConfig } from "vite";
import Vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import Icons from "unplugin-icons/vite";
import IconsResolver from "unplugin-icons/resolver";
import Inspect from "vite-plugin-inspect";

/** 路径查找 */
const pathResovle = (dir: string): string => {
  return resolve(__dirname, ".", dir);
};
/** 设置别名 */
const alias: Record<string, string> = {
  "@": pathResovle("src"),
  components: pathResovle("src/components"),
  views: pathResovle("src/views"),
  assets: pathResovle("src/assets"),
  network: pathResovle("src/network"),
  store: pathResovle("src/store"),
  router: pathResovle("src/router"),
  utils: pathResovle("src/utils"),
  hooks: pathResovle("src/hooks"),
  styles: pathResovle("src/styles")
};

// https://vitejs.dev/config/
export default defineConfig({
  // root,
  resolve: {
    alias
  },
  plugins: [
    Vue(),
    AutoImport({
      imports: ["vue", "vue-router", "@vueuse/core"],
      resolvers: [
        ElementPlusResolver(),
        IconsResolver({
          prefix: "Icon"
        })
      ]
    }),
    Components({
      resolvers: [
        IconsResolver({
          enabledCollections: ["ep"]
        }),
        ElementPlusResolver()
      ]
    }),
    Icons({
      autoInstall: true
    }),
    Inspect()
  ]
});
