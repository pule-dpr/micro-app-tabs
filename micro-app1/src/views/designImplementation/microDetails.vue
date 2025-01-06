<template>
	<div class="header">微前端架构详情</div>
	<div class="content">
		<p><span>总设计图：</span></p>
		<p><span>主要原理：</span>通过菜单配置项来决定，最小单位的菜单所属应用使用rebusi配置项来决定，若无rebusi字段，则取父菜单的appName。</p>
		<p><span>场景解析：此demo中几乎包含了所有可能出现的业务场景，我将会把此demo中所有场景一一列举，并解析流程</span></p>

		<div class="case-card" v-for="(item,index) in sensList" :key="index">
			<p><span>场景{{index + 1}}：</span>{{item.sens}}</p>
			<p><span>示例：</span>{{ item.case }}</p>
			<p><span>原理：</span>{{ item.theory }}</p>
		</div>
	</div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()

const sensList = [
	{
		sens:'通过点击菜单列表进入非激活状态子应用下的页面',
		case:'点击菜单列表下子应用app1中的（设计实现）',
		theory:'theory'
	},
	{
		sens:'通过点击菜单列表进入已激活子应用下的页面',
		case:'点击菜单列表下子应用app1中的（设计实现）后，再次点击（问题发现解决）',
		theory:'theory'
	},
	{
		sens:'通过点击子应用页面中按钮，进入详情页',
		case:'点击菜单列表下子应用app1中的（设计实现），点击按钮（基于microApp框架详细设计）',
		theory:'theory'
	},
	{
		sens:'通过点击页签进入未激活子应用的预设菜单页面',
		case:'点击菜单列表下子应用app1中的（设计实现）',
		theory:'theory'
	},
	{
		sens:'通过点击页签进入已激活子应用的预设菜单页面',
		case:'点击菜单列表下子应用app1中的（设计实现）',
		theory:'theory'
	},
	{
		sens:'通过点击页签进入已激活子应用的未预设菜单（详情）页面',
		case:'点击菜单列表下子应用app1中的（设计实现）',
		theory:'theory'
	},
	{
		sens:'通过点击页签进入未激活子应用的未预设菜单（详情）页面',
		case:'点击菜单列表下子应用app1中的（设计实现）',
		theory:'theory'
	}
]

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
