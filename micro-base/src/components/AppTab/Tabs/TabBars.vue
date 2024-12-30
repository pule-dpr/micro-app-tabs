<template>
	<header class="anju-window-tabs-bar">
		<el-icon @click="tagsBarScrollTo('left')" class="el-icon-arrow-left"><ArrowLeftBold /></el-icon>
		<el-divider direction="vertical" />
		<div ref="tagsBar" class="tags-bar">
			<span v-for="(page, index) in tabList" :key="page.id" @contextmenu="e => contextMenuAction(index, e)">
				<el-tag
					:type="page.location.fullPath === route.fullPath ? 'primary' : 'info'"
					:closable="page.name !== DEFAULT_PAGE_NAME && tabList.length > 1"
					@close="deleteTab(page.id)"
					@click="changeTabPageByClick(page)"
				>
					{{ page.title }}
				</el-tag>
			</span>
		</div>
		<el-icon class="btn-icon arrow-btn right" @click="tagsBarScrollTo('right')"><ArrowRight /></el-icon>
		<el-divider direction="vertical" />
		<el-icon @click="tagsBarScrollTo('right')" class="el-icon-arrow-right"><ArrowRightBold /></el-icon>
		<TabContextMenuView
			v-if="visibel"
			:tabIndex="tabIndex"
			@closeOtherTab="closeOtherTab"
			@deleteTab="deleteTab"
			@closeAll="closeAll"
			:position="position"
			:tabList="tabList"
			key="TabContextMenuView"
			@closeCallback="hideContextMenu"
			@refreshTab="refreshTab"
		/>
	</header>
</template>

<script setup>
import { onMounted, onUnmounted, ref, toRefs } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ArrowRightBold, ArrowLeftBold } from '@element-plus/icons-vue'
import TabContextMenuView from './TabContextMenuView.vue'

onMounted(() => {
	document.addEventListener('click', clickMenuAction, false)
})

onUnmounted(() => {
	document.removeEventListener('click', clickMenuAction, false)
})

const route = useRoute()
const router = useRouter()
const props = defineProps({
	tabList: {
		type: Array,
		default: []
	},
	currentId: {
		type: String,
		default: ''
	}
})
const { tabList, currentId } = toRefs(props)
const emits = defineEmits(['closeOtherTab', 'changeTabPageByClick', 'deleteTab', 'refreshTab', 'closeAll'])
const position = ref([-1000, -1000])
const visibel = ref(false)
const tabIndex = ref(0)
/** 默认页面名称 */
const DEFAULT_PAGE_NAME = 'dashboard'
function closeAll() {
	emits('closeAll')
}
function refreshTab(id) {
	emits('refreshTab', id)
}
function deleteTab(id) {
	emits('deleteTab', id)
}
function closeOtherTab({ includeIds, newCurrentId }) {
	emits('closeOtherTab', { includeIds, newCurrentId })
}
function clickMenuAction(event) {
	visibel.value = false
}
const hideContextMenu = () => (visibel.value = false)
const contextMenuAction = function (index, event) {
	event.preventDefault()
	visibel.value = true
	tabIndex.value = +index
	position.value = [event.pageX, event.pageY]
}
/**
 * 切换标签
 * @param {route} page 路由
 */
function changeTabPageByClick(page) {
	emits('changeTabPageByClick', page)
}

const tagsBar = ref()
/** 控制标签栏左右滚动 */
function tagsBarScrollTo(direction) {
	tagsBar.value.scrollBy({
		left: direction === 'right' ? 200 : -200,
		behavior: 'smooth'
	})
}
</script>

<style lang="scss">
.anju-window-tabs-bar {
	display: flex;
	align-items: center;
	padding: 5px 20px;
	border-bottom: 1px solid var(--el-border-color);
	box-sizing: border-box;
	background-color: var(--el-color-white);
	.btn-icon {
		font-size: 20px;
		cursor: pointer;
		color: var(--el-color-info);
		&:active {
			color: var(--el-color-info-light-5);
		}
	}
	.arrow-btn {
		background-color: #fff;
		z-index: 1;
		&.left {
			box-shadow: 4px 0 6px 4px #fff;
			margin-right: -4px;
		}
		&.right {
			box-shadow: -4px 0 6px 4px #fff;
			margin-left: -4px;
		}
	}
	.tags-bar {
		flex: 1;
		white-space: nowrap;
		overflow-x: auto;
		&::-webkit-scrollbar {
			display: none;
		}
	}
	.el-tag {
		margin-right: 0;
		&:not(:first-child) {
			margin-left: 8px;
		}
		cursor: pointer;
		border-radius: 0;
	}
}
</style>
