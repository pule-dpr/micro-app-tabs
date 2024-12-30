module.exports = {
	root: true,
	env: {
		node: true
	},
	extends: ['plugin:vue/essential', 'eslint:recommended', '@vue/prettier'],
	parserOptions: {
		parser: 'babel-eslint'
	},
	rules: {
		'vue/multi-word-component-names': 'off'
	},
	globals: {
		WxLogin: 'readonly',
		qq: 'readonly',
		TMap: 'readonly'
	}
}
