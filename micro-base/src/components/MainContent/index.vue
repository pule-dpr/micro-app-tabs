<template>
	<main v-if="currentApp" v-loading="appLoading">
		<!-- todo vite应用在微前端中无法正常渲染，按照官方文档也开启了iframe沙箱模式，还是不行。在未找到解决方法之前暂时使用iframe的方式渲染vite应用 -->
		<iframe
			v-if="microOptions.name === 'wiki'"
			:src="`${microOptions.url}`"
			height="100%"
			width="100%"
			style="border: 0; display: block"
			@load="appLoading = false"
		/>
		<micro-app v-else v-bind="microOptions" v-on="lifeCycles" keep-alive />
	</main>
</template>

<script setup>
import { allAppMenuList,allAppMenuTree } from '@/appMenus'
import micro, { getActiveApps } from '@micro-zoe/micro-app'
import { isEmpty } from 'lodash'
import { computed, ref, watch, onUnmounted, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Hive from '@/utils/hive'
const hive = new Hive()
const route = useRoute()
const router = useRouter()
micro.router.setBaseAppRouter(router)
const appLoading = ref(true)

watch(
	() => route.params.appName,
	() => {
		//处理类似技管中有oa这种菜单，通过顶部菜单或右侧菜单来回切换时，appLoading触发不了false的问题
		const activeAppName = getActiveApps({ excludeHiddenApp: true })?.[0]
		const realAppName = currentPage.value?.title
			? currentPage.value.reAppName || currentApp.value.appName
			: activeAppName
		if (realAppName !== activeAppName) {
			appLoading.value = true
		}
	}
)

/** 当前应用 */
const currentApp = computed(() => allAppMenuTree?.find(item => item.appName === route.params.appName))

/**
 * 当前页面配置
 * @type {import('vue').ComputedRef<typeof allAppMenuList[number]>}
 */
const currentPage = computed(() => {
	const { appName, pageName } = route.params
	return allAppMenuList?.find(item => item.appName === appName && item.pageName === pageName) || {}
})
const config = {
  app1: 'http://localhost:6071',
  app2: 'http://localhost:6072',
  app3: 'http://localhost:6073'
}
/**
 * 微前端配置项
 * @type {import('vue').ComputedRef<import('@micro-app/types').AppInterface>}
 */
const microOptions = computed(() => {
	const { microAppOption } = currentPage.value
	let realAppName = getActiveApps({ excludeHiddenApp: true })?.[0]
	//如果是无预设菜单，从tabList中再次检查是否存在，存在加载对应子应用，也不存在就在当前激活子应用中找对应页面，正常404就行
	if(isEmpty(currentPage.value)){
		const tabList = hive.get('tabList') ? JSON.parse( hive.get('tabList')) : [];
		const fintItem =  tabList?.find(item => item.location?.fullPath === route?.fullPath ) || {}
		if(fintItem && fintItem?.location?.params?.realAppName){
			realAppName = fintItem.location.params.realAppName
		}
	}
	// || route.params.appName,解决在无预设菜单（详情）时，通过浏览器强制刷新后，找不到appName问题
	const appName = currentPage.value?.title ? currentPage.value.reAppName || currentApp.value.appName : realAppName || route.params.appName
	const { pageName } = route.params
	return {
		name: appName,
		library: appName,
		url: `${config[appName]}/${appName}/`,
		iframe: false,
		inline: false,
		destroy: false,
		clearData: true,
		disablesScopecss: false,
		disableSandbox: false,
		ssr: false,
		keepAlive: true,
		disableMemoryRouter: true,
		defaultPage: '',
		keepRouterState: true,
		disablePatchRequest: true,
		baseroute: '',
		fiber: false,
		shadowDOM: false,
		data: { name: pageName, isIntercept: appName !== realAppName, isDetailsType: isEmpty(currentPage.value) },
		...microAppOption
	}
})

/** @type {import('@micro-app/types').lifeCyclesType} */
const lifeCycles = {
	created(event) {
		console.log('created', event)
	},
	datachange(event) {
		const data = event?.detail?.data
		console.log('datachange', data)
	},
	beforemount(event) {
		console.log('beforemount', event)
	},
	mounted(event) {
		appLoading.value = false
		const realAppName = getActiveApps({ excludeHiddenApp: true })?.[0]
		const appName = currentPage.value?.title ? currentPage.value.reAppName || currentApp.value.appName : realAppName
		console.log('mounted', event)
		//非预设菜单做特殊处理
		if (isEmpty(currentPage.value)) {
			micro.router.push({ name: realAppName, path: route.fullPath })
			return
		}
		console.log(currentPage.value,'fff')
		micro.setData(currentPage.value.reAppName || currentApp.value.appName, {
			name: route.params.pageName,
			isIntercept:appName !== realAppName
		})
	},
	unmount(event) {
		console.log('unmount', event)
	},
	error(event) {
		appLoading.value = false
		console.log('error', event)
	},
	beforeshow(event) {
		console.log('beforeshow', event)
	},
	aftershow(event) {
		appLoading.value = false
		console.log('aftershow', event)
		const realAppName = getActiveApps({ excludeHiddenApp: true })?.[0]
		const appName = currentPage.value?.title ? currentPage.value.reAppName || currentApp.value.appName : realAppName
		//非预设菜单做特殊处理
		if(isEmpty(currentPage.value)){
			micro.router.push({ name: realAppName, path: route.fullPath })
			return
		}
		console.log(currentPage.value,'fff')
		micro.setData(currentPage.value.reAppName || currentApp.value.appName, {
			name: route.params.pageName,
			isIntercept:appName !== realAppName
		})
	},
	afterhidden(event) {
		console.log('afterhidden', event)
	}
}

/** 监听基座应用全局数据变化 */
function handleSubscribe(event) {
	if (typeof event !== 'object') return
}
onMounted(() => {
	micro.addGlobalDataListener?.(handleSubscribe, true)
})
onUnmounted(() => {
	micro.removeGlobalDataListener(handleSubscribe)
	// 清空基座应用绑定的全局数据函数
	micro.clearGlobalDataListener()
})
</script>

<style lang="scss">
micro-app,
micro-app-body {
	height: 100% !important;
}
</style>
