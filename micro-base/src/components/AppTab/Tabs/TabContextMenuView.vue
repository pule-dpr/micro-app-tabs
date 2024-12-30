<template>
	<div>
		<MenuActionView
			@closeRightTab="closeRightTab"
			@closeCurrentTab="closeCurrentTab"
			@closeOtherTab="closeOtherTab"
			@refreshTab="refreshTab"
			@closeAll="closeAll"
			:tabList="tabList"
			:position="position"
			:tabIndex="tabIndex"
		/>
	</div>
</template>

<script setup>
import MenuActionView from './MenuActionView.vue'
import { toRefs } from 'vue'

const emits = defineEmits(['deleteTab', 'closeOtherTab', 'closeCallback', 'refreshTab', 'closeAll'])
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
function closeCurrentTab(e) {
	e.stopPropagation()
	const tabItem = tabList.value[tabIndex.value]
	emits('deleteTab', tabItem.id)
	emits('closeCallback')
}

function closeOtherTab(e) {
	e.stopPropagation()
	const includeIds = tabList.value.filter((_, i) => i !== tabIndex.value).map(v => v.id)
	emits('closeOtherTab', {
		includeIds,
		newCurrentId: tabList.value[tabIndex.value].id
	})
	emits('closeCallback')
}
function closeAll(e) {
	e.stopPropagation()
	emits('closeAll')
	emits('closeCallback')
}
function closeRightTab(e) {
	e.stopPropagation()
	const startIndex = tabList.value.findIndex(v => v.id === tabList.value[tabIndex.value].id)
	const includeIds = tabList.value.filter((_, i) => i > startIndex).map(v => v.id)
	emits('closeOtherTab', {
		includeIds,
		newCurrentId: tabList.value[tabIndex.value].id
	})
	emits('closeCallback')
}
function refreshTab(e) {
	e.stopPropagation()
	const tabItem = tabList.value[tabIndex.value]
	emits('refreshTab', tabItem.id)
	emits('closeCallback')
}
</script>
