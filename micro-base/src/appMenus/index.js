import { cloneDeep } from "lodash"

/** @type {MicroAppMenu[]} */
const allMenuTree = [
	{
		appName: 'app1',
		title: '子应用app1',
		icon: 'el-icon-cloudy',
		children: [
			{
				title: '设计实现',
				pageName: 'designImplementation'
			},
			{
				title: '问题发现解决',
				pageName: 'problemSolving'
			},
			{
				title: '菜单案例',
				rebusi: 'app2',
				pageName: 'specificCase'
			}
		]
	},
	{
		appName: 'app2',
		title: '子应用app2',
		icon: 'el-icon-cloudy',
		children: [
			{
				title: '菜单案例',
				pageName: 'specificCase'
			},
			{
				title: '保活案例',
				pageName: 'keepAliveCase'
			}
		]
	},
	{
		appName: 'app3',
		title: '子应用app3',
		icon: 'el-icon-cloudy',
		children: [
			{
				title: '事件案例',
				pageName: 'eventCase'
			},
			{
				title: '跳转案例',
				pageName: 'jumpCase',
			},
			{
				title: '跨应用跳转案例',
				pageName: 'appJumpCase',
			}
		]
	}
]
/** @type {Omit<MicroAppMenu['children'][number],'children'>[]} */
const allMenuList = []

function childRecursion(list, appName) {
	console.log(appName,list,'vvvv')
	if (Array.isArray(list) === false) return []
	return list.map(item => {
		const row = {}
		row.title = item.title
		if (item.icon?.startsWith('el-icon-')) row.icon = item.icon
		if (item.children) {
			row.children = childRecursion(item.children, appName)
		} else {
			if (allMenuList.some(e => e.appName == appName && e.pageName == item.name)) {
				console.error('路由配置name和appName不能重复，请检查该路由配置', item)
				return row
			}
			if (item.rebusi) row.reAppName = item.rebusi
			row.pageName = item.pageName
			allMenuList.push({ ...row, appName })
		}
		return row
	})
}
allMenuTree.forEach(v=>childRecursion(v.children,v.appName))
console.log(allMenuList,'allMenuList')
/**
 * 所有应用菜单树
 * @description
 * - 该数据为原始数据且不可修改，只能用于数据查询
 * - 如需获取当前用户所拥有的菜单，请从store里获取`state.appMenuTree`
 */
export const allAppMenuTree = Object.freeze(allMenuTree)

/**
 * 所有应用菜单列表
 * @description
 * - 该数据为原始数据且不可修改，只能用于数据查询
 * - 如需获取当前用户所拥有的菜单，请从store里获取`state.appMenuTree`
 */
export const allAppMenuList = Object.freeze(allMenuList)
