<template>
	<aside class="base-aside" :class="{ 'is-collapse': isCollapse }">
		<div class="top-head">
			<div class="title">菜单列表</div>
			<el-button
				class="collapse-button"
				type="text"
				:icon="isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'"
				style="color: inherit"
				@click="isCollapse = !isCollapse"
			/>
		</div>
		<el-menu
			background-color="#272a30"
			text-color="#B6BABF"
			active-text-color="#FF5C00"
			:collapse="isCollapse"
			:default-active="`${currentAppName}-${currentPageName}`"
		>
			<template v-for="(item, i) in allAppMenuTree">
				<el-sub-menu
					v-if="Array.isArray(item.children)"
					:key="`${currentAppName}-sub-${i}`"
					:index="`${currentAppName}-${i}`"
				>
					<template #title>
						<i :class="item.icon || 'el-icon-menu'"></i> <span>{{ item?.title }}</span>
					</template>
					<el-menu-item
						v-for="(menu, c) in item.children"
						:key="c"
						:index="`${item.appName}-${menu.pageName}`"
						@click="getRouteParams({appName:item.appName,...menu})"
					>
						{{ menu.title }}
					</el-menu-item>
				</el-sub-menu>
				<el-menu-item v-else :key="`${currentAppName}-top-${i}`" :index="item.pageName" @click="getRouteParams(item)">
					<i :class="item.icon || 'el-icon-menu'"></i>
					<span>{{ item.title }}</span>
				</el-menu-item>
			</template>
		</el-menu>
	</aside>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import microApp ,{getActiveApps}from '@micro-zoe/micro-app'
import Hive from '@/utils/hive'
import { allAppMenuList,allAppMenuTree } from '@/appMenus'

const hive = new Hive()
const route = useRoute()
const router = useRouter()
const currentAppName = computed(() => route.params.appName)
const currentPageName = computed(() => route.params.pageName)

const currentApp = computed(() => allAppMenuTree?.find(item => item.appName === currentAppName.value))

const isCollapse = ref(false)

const getRouteParams = menu => {
	//详情类的未预设菜单，不会触发这里的事件，这里事件触发时，都只能拿到子应用对应pagename
	//判断是否已加载，加载了直接去改子应用路由，没加载通过父传data去改
	const tabList  = hive.get('tabList') ? JSON.parse(hive.get('tabList')) : [];
	const tabItem = tabList?.find(v=> v.location.params.appName === menu?.appName && v.location.params.pageName === menu.pageName)
	//跳转兜底：由于同步tabList数据是子应用先处理完路由再同步主路由，再根据主路由获取的，会出现一种情况，点击菜单，子应用还没处理完，还没来得及同步主应用路由，就进入了其他新页面，会导致hashPath没有值
	if(tabItem && tabItem.location.params.hashPath){
		if(tabItem.location.fullPath === route.fullPath) return
		//为解决同菜单下，不同微应用切换，获取当前正活跃的子应用是否包含，准备加载页面的子应用
		const activeApp = getActiveApps({ excludeHiddenApp: true })
		const preAppName = menu?.reAppName || tabItem.appName || currentApp.value.appName
		const path = tabItem.location.fullPath?.split('#')?.[0]
		const hash = tabItem.location.fullPath?.split('#')?.[1] ? '#' + tabItem.location.fullPath?.split('#')?.[1] :''
		if(activeApp?.includes(preAppName)){
			microApp.router.push({name: preAppName, path: tabItem.location.params.hashPath})
		}else{
			//使用fullPath，为了不触发主应用路由改变后，tab替换而导致的再次点击找不到params中hashPath，的问题。
			router.push({ path,hash,params: { pageName: menu.pageName } })
		}
	}else{
		router.push({ name: 'microAppRoot', params: { appName:menu.appName, pageName:menu.pageName } })
	}
}
</script>

<style lang="scss" scoped>
.base-aside {
	$asideWidht: 200px;

	background-color: #272a30;
	width: $asideWidht;

	$topHeight: 40px;
	.top-head {
		height: $topHeight;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #fff;
		.title {
			font-size: 16px;
			font-weight: bold;
			width: calc(100% - 50px);
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
		.collapse-button {
			font-size: 22px;
			padding: 0;
			height: 26px;
			width: 26px;
		}
	}

	.el-menu {
		&::-webkit-scrollbar {
			width: 6px !important;
			height: 6px !important;
			background: #272a30 !important;
		}
		&::-webkit-scrollbar-track {
			border-radius: 0 !important;
			background: #272a30 !important;
		}
		&::-webkit-scrollbar-thumb {
			border-radius: 4px !important;
			background: #b6babf !important;
			cursor: pointer !important;
		}

		&:not(.el-menu--collapse) {
			width: $asideWidht;
		}
		height: calc(100% - $topHeight);
		border-right: none;
		overflow-y: auto;
		overflow-x: hidden;
	}

	&.is-collapse {
		width: initial;
		.title {
			display: none;
		}
	}
}
</style>
