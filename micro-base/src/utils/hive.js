/**
 * @classdesc 本地存储 链式操作
 */
export default class Hive {
	/**
	 * @method 写入值 链式操作
	 * @param {string} key
	 * @param {any} params
	 * @return {Hive}
	 */
	set(key, params) {
		localStorage.setItem(key, params)
		return this
	}

	/**
	 * @method 设置存储 链式操作
	 * @param {string} key
	 * @return {Any}
	 */
	get(key) {
		return localStorage.getItem(key) || null
	}

	/**
	 * @method 设置存储 链式操作
	 * @param {string|array} key
	 * @return {Hive}
	 */
	remove(key) {
		if (Array.isArray(key)) {
			key.forEach(o => localStorage.removeItem(o))
		} else {
			localStorage.removeItem(key)
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
