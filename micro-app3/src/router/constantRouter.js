const router = [
	{
		path: '/eventCase/index',
		name: 'eventCase',
		meta: {
			title: '事件案例',
			keepAlive: true
		},
		component: () => import(/* webpackChunkName: "demand" */ '@/views/eventCase/index.vue')
	},
	{
		path: '/jumpCase/index',
		name: 'jumpCase',
		meta: {
			title: '跳转案例',
			keepAlive: true
		},
		component: () => import(/* webpackChunkName: "task" */ '@/views/jumpCase/index.vue')
	},
	{
		path: '/appJumpCase/index',
		name: 'appJumpCase',
		meta: {
			title: '跨应用跳转案例',
			keepAlive: true
		},
		component: () => import(/* webpackChunkName: "task" */ '@/views/appJumpCase/index.vue')
	},
	{
		path: '/:pathMatch(.*)*', // 工作台默认为登录后首页
		name: '404', // 具名路由导航使用  全局注册的时候检测是否唯一 有重复给出对应的提示信息
		component: () => import(/* webpackChunkName: "PageNotFound" */ '@/views/PageNotFound'), // 基础布局
		meta: {
			title: '404【没有找到页面】', // 页面名称 如不设则当前页面兜底为统一名称
			hideInBreadcrumb: true, //是否面包屑展示
			hideInMenu: true, // 是否隐藏菜单
			hideInTag: true,
			disableRedirect: false, // 是否禁止面包屑重定向
			keepAlive: false // 是否保留状态
		}
	}
]

export default router
