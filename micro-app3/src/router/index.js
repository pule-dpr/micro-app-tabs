import { createWebHashHistory, createRouter } from 'vue-router'
// import { createRouter, createWebHistory } from 'vue-router'
import constantRouter from './constantRouter'

let routes = constantRouter
const router = createRouter({
	history: createWebHashHistory(process.env?.BASE_URL || '/'),
	// history: createWebHistory(process.env?.BASE_URL || '/'),
	routes
})

//todo  全局路由守卫 异常处理
router.beforeEach(async (to, from, next) => {
	if (to.name === from.name) return false
	if (!from.name && '404' === to.name) return false
	next()
})
router.onError((error) => {
  // 在这里处理路由导航的异常，找不到’/‘的异常
  console.error('路由导航异常:', error);
});

router.afterEach(to => {
	
})

export default router
