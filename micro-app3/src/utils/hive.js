/**
 * 本地存储 链式操作 后续考虑键值添加scope 数据加解密
 */
export default class Hive {
	constructor(scope) {
		this.scope = scope || ''
	}
	/**
	 * @method 写入值 链式操作
	 * @param {string} key
	 * @param {*} params
	 * @return {Hive}
	 */
	set(key, params) {
		let scopedKey = (this.scope + key).trim()
		localStorage.setItem(scopedKey, params)
		return this
	}

	/**
	 * @method 设置存储 链式操作
	 * @param {string} key
	 * @return {*}
	 */
	get(key) {
		let scopedKey = (this.scope + key).trim()
		return localStorage.getItem(scopedKey) || null
	}

	/**
	 * @method 设置存储 链式操作
	 * @param {string|array} key
	 * @return {Hive}
	 */
	remove(key) {
		if (Array.isArray(key)) {
			key.forEach(o => localStorage.removeItem((this.scope + o).trim()))
		} else {
			localStorage.removeItem((this.scope + key).trim())
		}
		return this
	}

	/**
	 * @method 清空本地存储
	 * @return {Hive}
	 */
	clear() {
		localStorage.clear()
		return this
	}
}
