<template>
	<div class="header">问题解决</div>
	<div class="content">
		<p><span>场景：</span>此页面在子应用app2中，入口菜单可放置任意子应用下，不同入口下页签不同。</p>
		<p><span>实现：</span>通过菜单配置项来决定，最小单位的菜单所属应用使用rebusi配置项来决定，若无rebusi字段，则取父菜单的appName。</p>
		<pre><span>示例：</span>如子应用app1的菜单配置项为

			{
				appName: 'app1',
				title: '子应用app1',
				icon: 'el-icon-cloudy',
				children: [
					{
						title: '设计实现（app1）',
						pageName: 'designImplementation',
						permission: 'ATC_MENU_PLATFORM'
					},
					{
						title: '问题发现解决（app1）',
						pageName: 'problemSolving',
						permission: 'ATC_MENU_PLATFORM'
					},
					{
						title: '菜单案例',
						rebusi: 'app2',
						pageName: 'specificCase',
						permission: 'STAFF'
					}
				]
			}
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
