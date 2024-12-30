module.exports = {
	root: true,
	env: {
		node: true
	},
	extends: ['plugin:vue/vue3-essential', 'eslint:recommended', '@vue/prettier'],
	parserOptions: {
		parser: 'babel-eslint'
	},
	rules: {
		'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		'vue/no-mutating-props': 'off',
		'no-unused-vars': 'warn'
	},
	globals: {
		defineProps: 'readonly',
		defineEmits: 'readonly',
		defineModel: 'readonly',
		defineExpose: 'readonly',
		defineOptions: 'readonly',
		WxLogin: 'readonly' // qq: "readonly",
		// TMap: "readonly"
	}
}
