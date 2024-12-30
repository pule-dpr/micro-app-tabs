import './public-path'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
dayjs.locale('zh-cn')

let app
// 将渲染操作放入 mount 函数
export function mount() {
	app = createApp(App)
		.use(router)
		.use(ElementPlus, {
			locale: zhCn,
			valueOnClear: () => undefined
		})
		.mount('#app')
	// handleMicroData(router)
}

// 将卸载操作放入 unmount 函数
export function unmount() {
	sentinelArgus?.uninstall()
	app.unmount?.()
	// history?.destroy()
	app = null
}
console.log(window.__MICRO_APP_ENVIRONMENT__,'pppppp')

mount()
