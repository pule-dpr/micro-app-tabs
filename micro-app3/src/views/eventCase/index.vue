<template>
	<div class="header">事件案例</div>
	<div class="content">
		<p><span>场景：</span>AppTab提供常用操作的事件，如编辑页编辑成功后自动关闭当前窗口并跳转至列表页</p>
		<p><span>实现：</span>基座AppTab中统一实现，挂载到全局</p>
		<pre><span>示例：</span>
			
		</pre>
	</div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
console.log(route,'pppp')
</script>
<style lang="scss" scoped>
.header{
	text-align:center;
	font-size:24px;
	font-weight:600;
	background:#f3f3f3;
	color:#e96900;
	padding: 12px;
}
.content{
	padding:32px;
	font-size:16px;
	font-weight:500;
	span{
		color:#e96900;
	}
}
</style>
