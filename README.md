vite+vue+ts的模板项目，并且配置了一些常用的三方库







#### element-plus
[自动导入](https://element-plus.gitee.io/zh-CN/guide/quickstart.html)
添加对volar的支持
``` json
// tsconfig.json
{
  // ...
  "compilerOptions": {
    // ...
    "types": ["element-plus/global"]
  }
}
```
自动导入element-plus的组件，首先安装两个插件，unplugin-vue-components用于自动导入组件，unplugin-auto-import用于自动导入组件的样式
``` ruby
   pnpm install -D unplugin-vue-components unplugin-auto-import
```

然后再vite.config.ts中配置
``` typescript
// vite.config.ts
import { defineConfig } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig({
  // ...
  plugins: [
    // ...
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
})
```