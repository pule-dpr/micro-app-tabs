<template>
	<transition name="el-fade-in">
		<slot v-if="status === 'finish'" />
		<div v-else class="init-transition-container">
			<template v-if="status === 'init'">
				<img height="160" src="@/assets/anju-loading.gif" alt="加载中" />
				<p class="sub-message">页面加载中...</p>
			</template>
			<el-empty v-else description="页面加载失败！">
				<el-button type="warning" icon="el-icon-refresh" style="background-color: #ff5c00" @click="init">
					重新加载
				</el-button>
			</el-empty>
		</div>
	</transition>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

/**
 * 初始化状态
 * @type {import('vue').Ref<'init' | 'finish' | 'error'}>}
 */
const status = ref('finish')

</script>

<style lang="scss" scoped>
.init-transition-container {
	position: fixed;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
	text-align: center;
	.sub-message,
	::v-deep .el-empty__description p {
		color: #909399;
		font-size: 16px;
	}
}
</style>
