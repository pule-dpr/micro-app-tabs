<template>
	<div class="header">微前端架构详情</div>
	<div class="content">
		<p><span>主要原理：</span></p>
		<div class="case-card">
			<p><span>准则一：</span>通过类似TCP三次握手原理，保持并维护主子应用的路由统一，基座中tabList内最终每个页签对象中路径值，主路由（history），子应用路由（hash），三者一致</p>
			<p><span>准则二：</span>通过利用路由特性：相同路由不跳转，结束每一次链路</p>
			<p><span>准则三：</span>同时也仅有一个子应用处于被激活状态，已激活后进入另一个子应用时，该子应用推入后台（microApp框架内置）</p>
			<p><span>准则四：</span>页面跳转总共两种方式：<span>方式一：</span>（使用microApp框架中虚拟路由主改子的方式）<span>方式二：</span>（基座路由发生改变触发datachange，子应用监听接收信息后，在子应用内部replace子路由）</p>
			<p><span>准则五：</span>已激活子应用（预设菜单《a》，未预设菜单《b》），未激活子应用（预设菜单《c》，未预设菜单《d》）四种页面类型，进入a,b,d三种类型的页面时始终使用方式一，只有进入c类型页面时使用方式二</p>
		</div>
		<p><span>总设计图：</span></p>
		<el-image
			style="width: 100%; height: 600px"
			:src="require('../../assets/dashboad/all-design.png')"
			:zoom-rate="1.2"
			:max-scale="7"
			:min-scale="0.2"
			:preview-src-list="[require('../../assets/dashboad/all-design.png')]"
			:initial-index="4"
			fit="contain"/>
		<p><span>场景解析：此demo中几乎包含了所有可能出现的业务场景，我将会把此demo中所有场景一一列举，并解析流程</span></p>
		<p><span>步骤差分为以下几个（用于链路描述）：</span></p>
		<p><span>a：由于主应用路由存在监听：主路由变化，判断页签是否存在，处理页签（创建删除替换等）</span></p>
		<p><span>b：主应用通过datachange将pageName传给子应用，子应用监听接收pageName并子路由replace</span></p>
		<p><span>c：子路由守卫监听到路由变化，通过虚拟路由，获取主应用路由实例，并同步主路由，完成主子路由的统一，与此同时更新页签（替换页签信息中的路由，改为详细的hash路由）</span></p>
		<p><span>d：通过虚拟路由，直接获取到子应用路由实例，直接改子应用到路由到目标路由</span></p>
		<div class="case-card" v-for="(item,index) in sensList" :key="index">
			<p><span>场景{{index + 1}}：</span>{{item.sens}}</p>
			<p><span>示例：</span>{{ item.case }}</p>
			<p><span>原理链路：</span>{{ item.desc }}</p>
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
		desc:'点击--a（不存在页签，创建页签，命中子应用加载组件）--b--c--b--（由于子应用已经在目标路由，路由特性，相同路由不做处理，结束）'
	},
	{
		sens:'通过点击菜单列表进入已激活子应用下的页面',
		case:'点击菜单列表下子应用app1中的（设计实现）后，再次点击（问题发现解决）',
		desc:'点击--a（存在页签，获取页签信息中的详细hash路由后跳转）--d--c--（由于主应用已经在目标路由，路由特性，相同路由不做处理，结束）'
	},
	{
		sens:'通过点击子应用页面中按钮，进入详情页',
		case:'点击菜单列表下子应用app1中的（设计实现），点击按钮（基于microApp框架详细设计）',
		desc:'待补充'
	},
	{
		sens:'通过点击页签进入未激活子应用的预设菜单页面',
		case:'点击菜单列表下子应用app1中的（设计实现），点击菜单列表下子应用app2中的（保活案例），点击页签（设计实现）',
		desc:'待补充'
	},
	{
		sens:'通过点击页签进入已激活子应用的预设菜单页面',
		case:'点击菜单列表下子应用app1中的（设计实现），点击菜单列表下子应用app1中的（问题发现解决），点击页签（设计实现）',
		desc:'待补充'
	},
	{
		sens:'通过点击页签进入已激活子应用的未预设菜单（详情）页面',
		case:'点击菜单列表下子应用app1中的（设计实现），点击按钮（基于microApp框架详细设计），点击菜单列表下子应用app1中的（问题发现解决），点击页签（基于microApp框架详细设计）',
		desc:'待补充'
	},
	{
		sens:'通过点击页签进入未激活子应用的未预设菜单（详情）页面',
		case:'点击菜单列表下子应用app1中的（设计实现），点击按钮（基于microApp框架详细设计），点击菜单列表下子应用app2中的（保活案例），点击页签（基于microApp框架详细设计）',
		desc:'待补充'
	},
	{
		sens:'通过点击子应用页面中按钮跳转',
		case:'跳转案例',
		desc:'待补充'
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
	.case-card{
		border-radius: 16px;
		background: #f9f9f9;
		border: 1px solid #ccc;
		padding: 32px;
		margin: 8px 0;
	}
}
</style>
