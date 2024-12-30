import { createWebHistory, createRouter } from 'vue-router'
import constantRouter from './constantRoutes'
let routes = constantRouter
const router = createRouter({
	history: createWebHistory(process.env?.BASE_URL || '/'),
	routes
})

//todo  全局路由守卫 异常处理
router.beforeEach(async (to, from, next) => {
	next()
})
router.onError((error) => {
  console.error('路由导航异常:', error);
});
router.afterEach(to => {
	
})
export default router
