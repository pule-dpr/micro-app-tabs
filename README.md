# 注意

目前还在开发！！！还在开发！！！文档说明都还没有完善，每天开发一点，再等等！！！

# 简介

micro-app-tabs举例了 `vue3` 如何作为主应用和子应用接入微前端，并在尽可能改动少量的代码的情况下做出尽可能完善的功能。

micro-app-tabs中所有项目都是使用官方脚手架创建的，它们足够精简，你完全可以将其中的demo作为基础进一步开发自己的项目。


# 目录结构
```
.
├── child_apps
│   ├── angular11        // 子应用 angular11 (history路由)
│   ├── nextjs11         // 子应用 nextjs11 (history路由)
│   ├── nuxtjs2          // 子应用 nuxtjs2 (history路由) 
│   ├── react16          // 子应用 react16 (history路由)
│   ├── react17          // 子应用 react17 (hash路由)
│   ├── sidebar          // 子应用 sidebar，公共侧边栏
│   ├── vite-vue3        // 子应用 vite (hash路由)
│   ├── vue2             // 子应用 vue2 (history路由)
│   └── vue3             // 子应用 vue3 (history路由)
├── main_apps
│   ├── angular11        // 主应用 angular11 (history路由)
│   ├── nextjs11         // 主应用 nextjs11 (history路由)
│   ├── nuxtjs2          // 主应用 nuxtjs2 (history路由)
│   ├── react16          // 主应用 react16 (history路由)
│   ├── react17          // 主应用 react17 (history路由)
│   ├── vite-vue3        // 主应用 vite (history路由)
│   ├── vue2             // 主应用 vue2 (history路由)
│   └── vue3             // 主应用 vue3 (history路由)
├── package.json
└── yarn.lock

19 directories, 5 files
```

# 开始

## 1、安装依赖

```bash
pnpm i
```


## 2、运行项目
主应用监听了6070端口,而子应用端口各不相同，可以同时启动。

**1、启动 vue3 主应用**

```bash
pnpm run serve
```

访问：`http://localhost:6070/micro-base`


## 效果如下：
![](./example.png)


# 补充
- 1、如果你在安装依赖或启动项目时发生错误，可以尝试单独进入每个项目执行操作。
