import microApp from '@micro-zoe/micro-app'
import router from './router'
import App from './App'
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

createApp(App)
.use(router)
.use(ElementPlus, {
	locale: zhCn,
	valueOnClear: () => undefined
})
.mount('#micro-app-root')

// 设置当前获取菜单项
microApp.start({
	'disable-memory-router': true, // 关闭虚拟路由系统
	// 全局生命周期逻辑处理 业务异常基座做响应的降级处理
	lifeCycles: {
		created() {
			console.warn('基座', 'base-created 全局监听')
		},
		beforemount() {
			console.warn('基座', 'base-beforemount 全局监听')
		},
		mounted(microApp) {
			// todo 设置当前活跃菜单项 基座自带页面和业务页面活跃逻辑区分开  业务
			console.warn('基座', 'base-mounted 全局监听', microApp?.detail?.name)
		},
		unmount(microApp) {
			// todo
			console.warn('基座', 'base-unmount 全局监听', microApp)
		},
		error() {
			console.warn('基座', 'baseerror 全局监听')
		}
	}
})
