<template>
	<div class="header">跨应用跳转案例</div>
	<div class="content">
		<p><span>场景：</span>当前在子应用app3中，不通过菜单点击，而直接通过当前子应用中的按钮进行跳转，以满足业务需求。</p>
		<p><span>实现：</span>通过向基座发送消息，基座通过datachange的监听接收后进行处理。</p>
		<p><span>示例：</span><button @click="go">点击我跳转到子应用app1中的问题发现解决</button></p>
	</div>
</template>

<script setup>
const go = () => {
	window.microApp.dispatch({
		//这是自定义的参数，用于区别消息的类型以便于进行不同处理，这里NAV代表跳转类型消息
		type: 'NAV',
		detail: { appName: 'app1', pageName: 'problemSolving' },
		params: {},
		query: {}
	})
}
</script>
<style lang="scss" scoped>
.header {
	text-align: center;
	font-size: 24px;
	font-weight: 600;
	background: #f3f3f3;
	color: #e96900;
	padding: 12px;
}
.content {
	padding: 32px;
	font-size: 16px;
	font-weight: 500;
	span {
		color: #e96900;
	}
}
</style>
