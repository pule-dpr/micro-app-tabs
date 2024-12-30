"use strict";
module.exports = {
	types: [
		{ value: "perf", name: "优化:    提升性能、体验" },
		{ value: "fix", name: "修复:    修复Bug" },
		{ value: "feat", name: "特性:    新功能" },
		{ value: "ci", name: "构建:   自动化构建配置和脚本变更" },
		{ value: "util", name: "工具:    开发工具变动(构建、脚手架工具等)" },
		{ value: "chore", name: "流程:    非src test的修改" },
		{ value: "build", name: "发布:    构建或外部依赖变更" },
		{ value: "docs", name: "文档:    修改文档(如README CHANGELOG)" },
		{ value: "style", name: "格式:    空格, 分号等格式修复" },
		{ value: "refactor", name: "重构:    重构(及不修复错误也不添加功能)" },
		{ value: "test", name: "测试:    添加测试(单元测试、集成测试等)" },
		{ value: "revert", name: "回滚:    代码回退" },
	],
	scopes: [],

	// override the messages, defaults are as follows
	messages: {
		type: "选择提交类型:",
		scope: "选择一个scope (可选):",
		// used if allowCustomScopes is true
		customScope: "请输入自定义说明:",
		subject: "短说明:\n",
		body: '长说明，使用"|"换行(可选)：\n',
		breaking: "非兼容性说明 (可选):\n",
		footer: "是否有关联关闭的issue，例如：#31, #34(可选):\n",
		confirmCommit: "确定提交说明?",
	},
	allowCustomScopes: true,
	allowBreakingChanges: ["特性", "修复"],
	// limit subject length
	subjectLimit: 100,
};
