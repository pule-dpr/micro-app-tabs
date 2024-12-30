<template>
	<div class="empty">
		<div>
			<el-row type="flex" justify="center">
				<img :src="notFound" alt="" class="not-found-img" />
			</el-row>
			<el-row type="flex" justify="center">
				<el-button type="text" @click="goHome">首页</el-button>
				<el-button type="text" @click="back">返回上页</el-button>
			</el-row>
		</div>
	</div>
</template>

<script>
export default {
	name: 'NotFound',
	data() {
		return {
			notFound: require('../assets/404.png')
		}
	},
	methods: {
		back() {
			this.$router.go(-1)
		},
		goHome() {
			this.$router.push({ path: '/' })
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
	height: 100%;
	.not-found-img {
		width: 50%;
	}
}
</style>
