<template>
	<div class="header">多页签组件详情</div>
	<div class="content">
		<p><span>调研：基于微前端多页签模式常见的实现方案有两种：</span></p>
		<p>
			1.多个子应用同时存在，在dom上通过v-show控制显示哪一个子应用，及display:none;控。不同子应用dom的显示隐藏。由于多个子应用同时存在，随着页面渲染越多，缓存越来越多，严重时会造成页面卡顿，性能是大问题，不推荐。
		</p>
		<p>
			2.	同一时间仅一个子应用处于激活状态，同时保存其他应用的状态进入后台，子应用状态通过框架提供的keep-alive实现，子应用内部通过路由的keep-alive进行保活，同一时间，只是展示一个子应用的active页面，可减少DOM节点数，非active子应用卸载时同时会卸载DOM及不需要的事件监听，可释放一定内存，这类方式推荐。
		</p>
		<p><span>名词解释：</span></p>
		<p><span>预设菜单：</span>在菜单列表中可见的菜单，如：设计实现，无预设菜单为在菜单列表中不可见菜单，如当前页面：多页签组件详情，此页面为详情页在子应用1的内部</p>
		<p><span>tabList：</span>为存在缓存中的多页签数据列表，用于渲染多页签，以及同步每个多页签的数据，如页签名称，完整路由等</p>
		<p><span>替换规则：</span>为什么会有替换规则？因为主，子应用的路由模式不同，场景：从菜单列表点击进入子应用页面时，主应用会改变一次，子应用同步会再改变一次，详细原理请移步：基于microApp框架详细设计下的场景解析</p>
		<el-image

			style="width: 100%; height: 600px"
      :src="require('../../assets/dashboad/appTabs.png')"
      :zoom-rate="1.2"
      :max-scale="7"
      :min-scale="0.2"
      :preview-src-list="[require('../../assets/dashboad/appTabs.png')]"
      :initial-index="4"
      fit="contain"/>
	</div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
console.log(route, 'pppp')
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
