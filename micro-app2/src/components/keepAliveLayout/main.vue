<template>
	<router-view v-slot="{ Component, route }">
		<keep-alive max="10" :include="cachePageNames">
			<component v-if="isKeep" :is="Component" :key="route.fullPath" />
		</keep-alive>
	</router-view>
</template>

<script setup>
import { onMounted, nextTick, ref, computed, watch, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const windowList = ref([])
/** 缓存页面名称 */
const cachePageNames = computed(() => {
	let nameList = windowList.value.filter(e => e.keepAlive).map(e => e.name)
	const names = isKeep.value ? nameList : nameList.filter(name => name !== route.name)
	return names
})
onMounted(() => {
	cachePageNamesChange()
	window.addEventListener('refreshPage', refreshPage)
	window.addEventListener('cachePageNamesChange', cachePageNamesChange)
})

onUnmounted(() => {
	window.removeEventListener('refreshPage', refreshPage)
	window.removeEventListener('cachePageNamesChange', cachePageNamesChange)
})

const isKeep = ref(true)
/** 刷新页面数据 */
function refreshPage() {
	isKeep.value = false
	nextTick(() => {
		isKeep.value = true
	})
}
const cachePageNamesChange = () => {
	const tabListNames = JSON.parse(localStorage.getItem('tabList'))?.map(v => v.location.params.pageName)
	const routes = router.getRoutes()
	const cacheRoutes = routes?.filter(v => tabListNames?.includes(v.name))
	windowList.value = cacheRoutes?.map(v => ({
		fullPath: v.path,
		name: v.name,
		...v.meta
	}))
}
</script>
