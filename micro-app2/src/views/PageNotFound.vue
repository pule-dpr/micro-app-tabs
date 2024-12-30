<template>
	<div class="empty">
		<div>
			<el-row type="flex" justify="center">
				<img :src="notFoundImg" alt="" class="not-found-img" />
			</el-row>
			<el-row type="flex" justify="center">
				<el-button type="text" @click="router.push({ path: '/' })">首页</el-button>
				<el-button type="text" @click="router.back()">返回上页</el-button>
			</el-row>
		</div>
	</div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
export default {
	name: 'PageNotFound',
	setup() {
		const notFoundImg = ref(require('@/assets/dashboad/page-not-find.png'))
		return {
			notFoundImg,
			router: useRouter()
		}
	}
}
</script>

<style scoped lang="scss">
.empty {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 100vh;
	.not-found-img {
		width: 50%;
	}
}
</style>
