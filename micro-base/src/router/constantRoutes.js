const router = [
	{
		path: '/',
		redirect: '/busi/app1/designImplementation'
	},
	{
		path: '/busi/:appName?/:pageName?',
		name: 'microAppRoot',
		component: () => import('@/components/baseLayoutNew'), // 基础布局
	},
	{
		path: '/:pathMatch(.*)*',
		name: '404',
		component: () => import('@/views/NotFound.vue'),
		meta: {
			title: '404'
		}
	}
]

export default router
