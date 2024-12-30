# 安居广厦微前端基座 

powered by [@micro-zoe/micro-app](https://zeroing.jd.com/micro-app/)


> 基座职责 
1. 业务应用处理(注册 挂载  卸载 预加载  静态资源) ``已完成``
2. 登录、鉴权、认证
3. 路由注册、下发、拦截 `拦截基座404` `捕获统一处理业务应用广播的登录失效`
4. 状态管理、数据通信 ``用户信息和鉴权信息`` `登陆登出广播`
5. 插件|资源管理 ``资源复用``
6. 异常熔断降级 `` ``
7. 监控、埋点 ``方案待讨论 重要不紧急``
8. 提供快捷开发调试验证 `重要紧急` `已完成`
9. 动态注册业务应用 提供两个独立路由 除非调试基座  其余由测试环境调试业务应用 测试|生产路由挂载由
> 基座要求 *简单* *稳定* *轻量*
1. 考虑现代浏览器 对部分兼容性要求高的应用 单独拆除 提供独立登录鉴权和兼容性处理
2. 

> 业务应用需注意
1. 按环境区分路由模式信息和整体布局 
2. 登录登出职责剥离
3. 数据同步(基座向业务 业务向基座 业务向业务)
4. 打包配置(jsonpFunction library libraryTarget globalObject cors hot-reload)

> 项目约定 
1. 数据广播格式固定 提供固定方法操作
   ```js
        export class MicroAppDataType {
            static LOGIN = new MicroAppDataType("LOGIN", "登入");
            static LOGOUT = new MicroAppDataType("LOGOUT", "登出");
            static TIPS = new MicroAppDataType("TIPS", "普通信息");
            static GLOBAL = new MicroAppDataType("GLOBAL", "全局广播");
        
            constructor(code, desc) {
                this.code = code;
                this.desc = desc;
            }
            toString() {
                return this.code;
            }
        }
   ```
2. 数据监听提供统一mixin  统一处理登入登出交互 区分基座还是业务 基座捕获业务 业务广播基座 


> TODO 
1. 公共模式复用（基座注册下发业务\单独抽离公共模式和自定义、二次封装UI）
2. 业务404 和基座404区分 
3. 业务应用登录失效处理消息广播 
4. 基座和业务应用的菜单和功能性导航设计
   1. 基座根据当前路由matched 展开收起菜单
   2. 业务应用根据运行环境判断是否展示菜单和功能导航
   3. 基座在业务应用容器上放置控件切换展示模式下发业务应用
   
> 业务应用需注意的点 

1. 基座下运行职能转移  ``window.__MICRO_APP_ENVIRONMENT__``
   1. 水印由基座提供
   2. 路由base ``window.__MICRO_APP_BASE_ROUTE__`` 由基座提供  
   3. 登录和登出和全局状态由基座提供  
   4. 静态资源处理 需提供public-path 
   ```javascript
       if (window.__MICRO_APP_ENVIRONMENT__) {
         __webpack_public_path__ = window.__MICRO_APP_PUBLIC_PATH__
       }
   ```
   5. 基座下需手动回收 销毁  
   6. 广播监听销毁
2. 交互差异  
   1. 菜单和顶部功能区导航
   2. 引导功能
   3. 用户信息有差异的(待讨论后续是否有类似erp业务嵌入基座)
   4. 基座下提供退出业务和业务件相互跳转的口子 
3. 打包策略
   1. 允许跨域
      1. 开发下 
          ```
                devServer: {
                    port: 6080,
                    injectClient: false,
                    open: true,
                    hot: true,
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
                        "Access-Control-Allow-Headers":
                            "DNT,X-Mx-ReqToken,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Authorization",
                        // "Cache-Control": "no-store",
                    },
                },
          ```  
      2. 测试|生产 nginx策略 允许跨域+缓存时间
   2. 输出产物  ***umd 配置 jsonpFunction + globalObject***
       ```
            output: {
                filename: `[name].[hash:6].file.js`,
                chunkFilename: `[name].[hash:8].chunk.js`,
                library: name,
                libraryTarget: "umd", // 把微应用打包成 umd 库格式
                jsonpFunction: `webpackJsonp_${name}`,
                globalObject: "window",
            },
       ```    
      
> 其他
1. 公共模式复用(工具、辅助函数, 公共模式, 内部二次封装UI、自定义UI 微前端相关api二次封装)  
   1. `npm` | `git tag` 抽离  左依赖
   2.  全局共用的由基座下发
2. 业务应用约定 
   1. 固定业务应用地址写配置文件   测试 sit.anjugs.com/+业务名+ sit.anjugs.com/bpa 正式micro.anjugs.com/ 
   2. 其他业务后续走前端注册中心注册查询已发布有权限的业务应用 在此基础上可考虑业务灰度发布和A/B测

   
   


