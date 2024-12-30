<template>
	<div class="tab-context-menu-layout" :style="{ left: position[0] + 'px', top: position[1] + 'px' }">
		<ul>
			<li :class="!canRefresh ? 'tab-menu-diable' : ''" @click="refreshTab">
				<i class="el-icon-refresh"></i> 重新加载
			</li>
			<li :class="!canClose ? 'tab-menu-diable' : ''" @click="canCloseCurrent">
				<i class="el-icon-document-delete"></i> 关闭标签页
			</li>
			<li :class="!canCloseRight ? 'tab-menu-diable' : ''" @click="canCloseRightAction">
				<i class="el-icon-d-arrow-right"></i> 关闭右侧标签页
			</li>
			<li :class="!canClose ? 'tab-menu-diable' : ''" @click="canCloseOther">
				<i class="el-icon-circle-close"></i> 关闭其他标签页
			</li>
			<!-- 暂时注销，没有确定返回页 -->
			<!-- <li :class="!canClose ? 'tab-menu-diable' : ''" @click="canCloseAll">
				<i class="el-icon-s-open"></i> 清空所有标签页
			</li> -->
		</ul>
	</div>
</template>

<script setup>
import { computed, toRefs } from 'vue'

const emits = defineEmits(['closeCurrentTab', 'closeOtherTab', 'closeRightTab', 'refreshTab', 'closeAll'])
const props = defineProps({
	tabList: {
		type: Array,
		default: []
	},
	position: {
		type: Array,
		default: []
	},
	tabIndex: {
		type: Number,
		default: 0
	}
})
const { tabList, position, tabIndex } = toRefs(props)
const canClose = computed(() => tabList.value.length > 1)
const canCloseRight = computed(() => tabIndex.value + 1 !== tabList.value.length)
const canRefresh = computed(() => tabList.value[tabIndex.value].id === localStorage.currentTabKey)
const canCloseCurrent = e => canClose.value && emits('closeCurrentTab', e)
const canCloseOther = e => canClose.value && emits('closeOtherTab', e)
const canCloseAll = e => canClose.value && emits('closeAll', e)
const canCloseRightAction = e => canCloseRight.value && emits('closeRightTab', e)
const refreshTab = e => canRefresh.value && emits('refreshTab', e)
</script>

<style lang="scss" scoped>
.tab-context-menu-layout {
	position: absolute;
	z-index: 501;
	padding: 12px 16px;
	background: #fff;
	border-radius: 4px;
	box-shadow: 0 0 6px rgb(0 0 0 / 20%);

	ul {
		margin: 0;
		padding: 0;
		list-style: none;
	}

	li {
		padding: 5px 10px;
		color: #4e5866;
		cursor: pointer;

		&:hover {
			color: rgb(16, 136, 255);
		}

		&.tab-menu-diable {
			color: rgb(158, 158, 158) !important;
			cursor: not-allowed;
			opacity: 0.8;
		}
	}
}
</style>
