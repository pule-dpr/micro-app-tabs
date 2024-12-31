<template>
	<div class="header">保活案例</div>
	<div class="content">
		<p>
			<span>场景：</span
			>路由保活应用于许多业务场景，如列表进详情页回退到列表页需要保留之前筛选状态，且此功能在多页签场景中更是比较重要
		</p>
		<p><span>实现：</span>通过菜单配置项（keepAlive）来决定，统一在子应用自身的App.vue中进行处理。</p>
		<p><span>keepAliveLayout组件：</span>
		<ul>
			<li>通过keep-alive组件，动态绑定需要缓存的组件</li>
			<li>通过订阅基座AppTab组件自定义change事件和子应用路由，监听处理出需要缓存的组件名称</li>
			<li>通过订阅AppTab的自定义双键重新加载事件，进行组件的重新渲染</li>
			<li>目前组件keepAliveLayout是放在子应用内部，实际项目中此组件应放在公共组件库中，后续有时间我也会放在此项目最外层，通过pnpm的工作空间进行引用</li>
		</ul>
		</p>
		<p>
			<span>示例：</span
			>你可以操作表单后随意切换至其他页面，再次回到此页面时，表单数据会依然存在，可以通过双键页签进行刷新操作
		</p>
		<el-form inline class="text-bold-df">
			<el-form-item label="名称：" class="item-width-xl">
				<el-input type="text" v-model.trim="params.name" placeholder="请输入名称" @change="search" clearable></el-input>
			</el-form-item>
			<el-form-item label="是否可售：">
				<el-select
					style="width: 200px"
					filterable
					clearable
					v-model="params.houseFairId"
					placeholder="请选择"
					class="input-width"
				>
					<el-option label="是" :value="true" />
					<el-option label="否" :value="false" />
				</el-select>
			</el-form-item>
		</el-form>
	</div>
</template>
<script>
export default {
	name: 'keepAliveCase'
}
</script>
<script setup>
import { useRoute, useRouter } from 'vue-router'
import { ref } from 'vue'

const route = useRoute()

const params = ref({})
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
