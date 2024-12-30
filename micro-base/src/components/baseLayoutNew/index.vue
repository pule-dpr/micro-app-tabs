<template>
	<init-transition>
		<section class="base-layout">
			<section class="base-container">
				<BaseAside/>
				<div class="base-main">
					<AppTab/>
				</div>
			</section>
		</section>
	</init-transition>
</template>

<script setup>
import AppTab from '../AppTab/index.vue'
import BaseAside from './components/baseAside.vue'
import { useRoute } from 'vue-router'
const route = useRoute()
</script>

<style lang="scss" scoped>
.base-layout {
	height: 100vh;
	.base-container {
		height: 100%;
		display: flex;
		box-sizing: border-box;
		.base-main {
			display: block;
			flex: 1;
			flex-basis: auto;
			overflow: auto;
			box-sizing: border-box;
		}
	}
}
</style>
