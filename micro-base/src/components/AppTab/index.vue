<template>
	<Tabs
		:tabList="tabList"
		:currentId="currentTabKey"
		@closeOtherTab="closeOtherTab"
		@changeTabPageByClick="changeTabPageByClick"
		@deleteTab="deleteTab"
		@refreshTab="refreshTab"
		@closeAll="closeAll"
	/>
</template>

<script setup>
import { createTab, findTabByLocation } from './utils'
import { onMounted, onUnmounted, watch, nextTick, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import Tabs from './Tabs/index.vue'
import { cloneDeep } from 'lodash'
import { v4 as uuid } from 'uuid'
import { allAppMenuList } from '@/appMenus'
import Hive from '@/utils/hive'
import microApp, { getActiveApps,activate } from '@micro-zoe/micro-app'

const hive = new Hive()
const TAB_SIZE = 15
const router = useRouter()
const route = useRoute()

const currentTabKey = ref(hive.get('currentTabKey'))
const tabList = ref(hive.get('tabList') ? JSON.parse(hive.get('tabList')) : [])

function stateChange(options) {
	/**
	 * @desc 更新select key 缓存
	 */
	const { currentTabKey: newCurrentTabKey, tabList: newTabList } = options
	if (newCurrentTabKey) {
		hive.set('currentTabKey', newCurrentTabKey)
		currentTabKey.value = newCurrentTabKey
	}
	if (newTabList) {
		hive.set('tabList', JSON.stringify(newTabList))
		tabList.value = newTabList
		const event = new CustomEvent('cachePageNamesChange')
		window.dispatchEvent(event)
	}
}

/**
 * @desc 新增一个tab
 */
function createNewTab(appName, currentTabKey, location) {
	const id = uuid()
	const tab = createTab(id, appName, location)
	let newTabList = []

	if (tabList.value.length >= TAB_SIZE) {
		newTabList = cloneDeep(tabList.value)
		//删掉活跃tab栈的第15个（最久时间没点过点）
		const microAppHistoryPages = []
		const tabNames = newTabList?.map(v => v.title)
		const activeHistroy = microAppHistoryPages?.map(v => tabNames?.includes(v.title))
		//详情特殊处理
		if (!!activeHistroy?.length) {
			const index = newTabList?.findIndex(v => v.title === activeHistroy?.at(-1)?.title)
			newTabList.splice(index, 1)
			newTabList.push(tab)
		} else {
			newTabList.splice(0, 1)
			newTabList.push(tab)
		}
	} else {
		newTabList = [...tabList.value, tab]
	}
	//更新tab时间
	const oldIdx = tabList.value.findIndex(v => v.id === currentTabKey)
	if (newTabList[oldIdx]) {
		newTabList[oldIdx].createTime = Date.now()
	}
	stateChange({ currentTabKey: id, tabList: newTabList })
}

/**
 * @desc 替换一个tab
 * @param {*} id tabId
 */
function replaceTab(id, appName, location) {
	const tabListDeep = cloneDeep(tabList.value)
	const tabIndex = tabListDeep.findIndex(v => v.id === id)
	if (tabIndex === -1) {
		createNewTab(appName, id, location)
	} else {
		const appName = route.params.appName
		const newTab = createTab(id, appName, location)
		tabListDeep.splice(tabIndex, 1, newTab)
		const newId = newTab.id
		stateChange({ currentTabKey: newId, tabList: tabListDeep })
	}
}
/**
 * @desc 清空所有tab标签，卸载所有子应用，跳转至基座工作台
 */
function closeAll() {
	// stateChange({ tabList: [],currentTabKey:'' })
	// microApp.unmountAllApps({ destroy: true, clearAliveState: true }).then(() => console.log('卸载成功'))
}
/**
 * @desc 删除tab
 */
function deleteTab(tabKeykey) {
	const tabListDeep = cloneDeep(tabList.value)
	const key = tabKeykey ? tabKeykey : currentTabKey.value
	const index = tabListDeep?.findIndex(v => v.id === key)
	const deleteItem = tabListDeep?.find(v => v.id === key)
	let item = undefined
	if (tabListDeep.length === 1) {
		return
	}
	tabListDeep.splice(index, 1)
	//如果删除的是选中的，按左右顺序取
	if (key === currentTabKey.value) {
		item = tabListDeep[index - 1] || tabListDeep[index] || tabListDeep[index + 1]
	}
	stateChange({ tabList: [...tabListDeep] })
	if (item) {
		nextTick(() => changeTabPageByClick(item))
	}
	//当删除的tab是该子应用最后一个tab，手动对子应用卸载，//有问题:卸载成功再渲染子应用时，datachange监听不到了
	// setTimeout(()=>{
	// 	const currentPage = allAppMenuList?.find(v=>v.pageName === deleteItem.location.params.pageName)
	// 	const currentRealAppName = currentPage.reAppName || currentPage.appName
	// 	const pageNames = tabListDeep?.map(v=>v.location.params.pageName)
	// 	const menus = allAppMenuList?.filter(v=> pageNames?.includes(v.pageName)&&v.appName ===  deleteItem.location.params.appName)
	// 	const otherAppTabMenuItem = menus?.find(v=>v.reAppName === currentRealAppName || v.appName === currentRealAppName)
	// 	console.log(currentRealAppName,menus,otherAppTabMenuItem,'otherAppTabMenuItem')
	// 	if(!otherAppTabMenuItem){
	// 		microApp.unmountApp(currentRealAppName, { clearAliveState: true }).then(() => console.log(currentRealAppName,'卸载成功'))
	// 	}
	// },0)
}

/**
 * @desc 切换tab
 */

function changeTabPage(key, push = true, _location) {
	const tabItem = tabList.value?.find(v => v.id === key)
	if (!tabItem) {
		return
	}
	const isSelf = _location && _location.fullPath === tabItem.location.fullPath
	if (currentTabKey.value !== tabItem.id) {
		stateChange({ currentTabKey: key, tabList: tabList.value })
	}
	if (!isSelf && push) {
		nextTick(() => router.push(tabItem.location))
	}
}

function changeTabPageByClick(page) {
	if (page.location.fullPath === route.fullPath) return
	const menuItem = allAppMenuList?.find(v => v.pageName === page.location.params.pageName)
	const activeApp = getActiveApps({ excludeHiddenApp: true })
	const realAppName = menuItem?.title ? menuItem?.reAppName || page.appName : page.location.params.realAppName || activeApp?.[0]
	const path = page.location.fullPath?.split('#')?.[0]
	const hash = page.location.fullPath?.split('#')?.[1] ? '#' + page.location.fullPath?.split('#')?.[1] :''
	//这里还需要处理一种特殊情况，menuItem不存在说明不是预设的菜单，是详情类的二级菜单
	//menuItem不存在，直接跳转到page的fullpath
	//menuItem存在，是正被激活子应用的页面直接通过虚拟路由改子路由，不是正在激活的，重走基座路由逻辑
	//判读当前活跃子应用是否包含跳转的子应用
	if (activeApp?.includes(realAppName)) {
		//跳转兜底：由于同步tabList数据是子应用先处理完路由再同步主路由，再根据主路由获取的，会出现一种情况，点击菜单，子应用还没处理完，还没来得及同步主应用路由，就进入了其他新页面，会导致hashPath没有值
		if(page.location.params.hashPath){
			//改子应用路由,子路由守卫会同步主应用
			microApp.router.push({ name: realAppName, path,hash })
		}else{
			router.push({ name: 'microAppRoot', params: { appName:realAppName, pageName:page.location.params.pageName } })
		}
	} else {
		//使用fullPath，为了不触发主应用路由改变后，tab替换而导致的再次点击找不到params中hashPath，的问题。
		console.log(page.location.fullPath,'changeTabPageByClick')
		router.push({ path,hash, params: { pageName: page.location.params.pageName } })
	}
}
/**
 * @desc 批量关闭页签
 * @param {*} param0
 */
function closeOtherTab({ includeIds = [], newCurrentId }) {
	const newList = tabList.value.filter(v => !includeIds.includes(v.id))
	const currentTab = newList?.find(v => newCurrentId === v.id) || newList[0]
	stateChange({ currentTabKey: currentTab.id, tabList: [...newList] })
	nextTick(() => changeTabPageByClick(currentTab))
}
/**
 * @description 刷新页签
 */
function refreshTab(id, data) {
	if (!id) return
	const newId = uuid()
	const list = cloneDeep(tabList.value)
	const index = list.findIndex(v => id === v.id)
	list[index].id = newId
	list[index].cacheData = data
	stateChange({ currentTabKey: newId, tabList: [...list] })
	if (currentTabKey.value !== id) {
		nextTick(() => changeTabPageByClick(list[index]))
	}
	//触发子应用刷新事件
	const event = new CustomEvent('refreshPage')
	window.dispatchEvent(event)
}

/**
 * @description 初始化
 */
onMounted(() => {
	const appName = route.params.appName || ''
	const locationObj = {
		fullPath: route.fullPath,
		params: route.params,
		query: route.query
	}
	const currentTab = tabList.value?.find(v => v.id === currentTabKey.value) || findTabByLocation(route, tabList.value)
	!currentTab
		? createNewTab(appName, currentTabKey.value, locationObj)
		: changeTabPage(currentTab.id, false, locationObj)
})

/**
 * 销毁
 */
onUnmounted(() => {
	// hive.remove('currentTabKey')
	// hive.remove('tabList')
})
/**
 * @description 路由变化
 */
watch(
	() => route.fullPath,
	() => {
		const appName = route.params.appName
		//判断是否有预设菜单，同时判断该替换，新增，改变
		//有预设菜单，pageName相同，hash相同就改变，不同就替换
		//无预设菜单，hash路由相同且pageName相同就改变，否则就创建
		//判断有无预设菜单
		//处理工作台
		const item = allAppMenuList?.find(v => v.pageName === route.params.pageName && v.appName === route.params.appName)
		const findTab = findTabByLocation(route, tabList.value, !!item)
		const locationObj = {
			fullPath: route.fullPath,
			params: route.params,
			query: route.query
		}
		console.log(route.fullPath,item,findTab,locationObj,'=====watchrouter')
		if (item && findTab && route.fullPath === findTab.location.fullPath) {
			return changeTabPage(findTab.id, false, locationObj)
		}
		if (item && findTab && route.fullPath !== findTab.location.fullPath) {
			return replaceTab(findTab.id, appName, locationObj)
		}
		if (!item && findTab) {
			return changeTabPage(findTab.id, false, locationObj)
		}
		createNewTab(appName, currentTabKey.value, locationObj)
	}
)
</script>

<style lang="scss" scoped></style>
