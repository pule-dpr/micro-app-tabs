<template>
	<KeepAliveLayout/>
</template>
<script setup>
import router from '@/router'
import { onMounted } from 'vue'
import KeepAliveLayout from './components/keepAliveLayout/main.vue'
import { useRouter, useRoute } from 'vue-router'
const PUBLIC_PATH = require('../package.json').publicPath.slice(1, -1)
const [{ replace, push }, route] = [useRouter(), useRoute()]
onMounted(() => {
	let routes = router.getRoutes()
	let count = 0
	window.microApp?.addDataListener?.(data => {
		console.log(data,'data2')
		if (data.isIntercept) return
		// 当基座下发跳转指令时进行跳转 需校验下发路由是否在当前应用注册
		if (data.name && route.name !== data.name && routes.some(r => r.name === data.name)) {
			setTimeout(() => {
				if (!count) {
					router.afterEach(to => {
						const baseRouter = window.microApp.router.getBaseAppRouter()
						// 控制主应用跳转
						baseRouter.replace({
							hash: to.href,
							params: { hashPath: to.href, title: to.meta.title, pageName: to.name, realAppName: PUBLIC_PATH }
						})
					})
				}
				console.log('======hhhh=====')
				//todo：解决特殊情况：（浏览器刷新导致的子应用卸载重挂 + 且刷新页面为非预设菜单的带参路由）时导致的参数丢失问题
				if (!data?.isDetailsType) {
					replace({ name: data.name })
				}
				count++
			}, 100)
		}
	}, true)
})
</script>
