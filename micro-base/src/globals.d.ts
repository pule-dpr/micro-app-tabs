import Vue from 'vue'

// 全局类型声明区域
declare global {
  /** 子应用菜单配置 */
  interface MicroAppMenu {
    /** 子应用名 */
    appName: string
    /** 子应用标题 */
    title: string
    /** 子应用图标 */
    icon: string
    /** 子应用页面、目录配置 */
    children: {
      /** 
       * 子应用配置 (请点击链接查看配置文档)
       * {@link https://micro-zoe.github.io/micro-app/docs.html#/zh-cn/configure} 
       */
      microAppOption: Object
      /** 菜单标题 */
      title: string
      /** 菜单图标 */
      icon?: string
      /** 
       * 重定向子应用名
       * @description 需要跨应用访问页面时设置，如果没有配置，则默认为当前子应用名
       */
      reAppName?: string
      /** 菜单对应的子应用页面名称 */
      pageName?: string
      /** 
       * 自定义本地页面组件
       * @description 如果没有配置，则默认使用pageName对应的子应用页面组件
       */
      component?: () => Promise<any>
      /** 
       * 菜单权限码
       * @description 支持多个权限码校验
       */
      permission?: string | string[]
      /** 子菜单 */
      children?: MicroAppMenu['children']
    }[]
  }
}
