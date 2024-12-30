import { allAppMenuList } from '@/appMenus'
import { cloneDeep } from 'lodash'

export function findAuthExtByLocation(_location, appName) {
	const item = allAppMenuList?.find(v => v.pageName === _location.params.pageName && appName===v.appName) || {}
	let title = item?.title || _location.params.title
	title = title || findTitleByPathname(_location.parmas.pageName)

	return {
		icon: item?.icon,
		title
		// title: title || (Config.app[appName] ? Config.app[appName].name : "404 Not Found"),
	}
}

export function findTitleByPathname(pathname) {
	return allAppMenuList?.find(v => v.pageName === pathname)?.title || ''
}

export function findTabByLocation(location, tabList, hasPreMenu = true) {
	if (hasPreMenu) {
		return tabList?.find(v => v.location.params.appName === location.params.appName && v.location.params.pageName === location.params.pageName)
	} else {
		return tabList?.find(
			v => v.location.params.pageName === location.params.pageName && v.location.fullPath === location.fullPath
		)
	}
}

export function createTab(id, appName, location) {
	return {
		createTime: Date.now(),
		id,
		appName,
		location,
		...findAuthExtByLocation(location, appName)
	}
}

export const computedFuncList = (list, feature) => {
	let l = cloneDeep(list)

	if (l.some(v => v.id === feature.id)) {
		l = l.filter(v => v.id !== feature.id)
		l.unshift(feature)
	} else {
		if (l.length >= 6) {
			l.unshift(feature)
			l.pop()
		} else {
			l.unshift(feature)
		}
	}
	return l
}
