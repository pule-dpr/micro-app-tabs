<template>
	<div class="lm-tab-wrapper-component">
		<TabBars
			:tabList="tabList"
			:currentId="currentId"
			@closeOtherTab="closeOtherTab"
			@changeTabPageByClick="changeTabPageByClick"
			@deleteTab="deleteTab"
			@refreshTab="refreshTab"
			@closeAll="closeAll"
		/>
		<div class="lm-tab-content-box">
			<main-content class="base-main" />
		</div>
	</div>
</template>

<script setup>
import { onMounted, toRefs } from 'vue'
import TabBars from './TabBars'
import MainContent from '../../MainContent'
const emits = defineEmits(['closeOtherTab', 'changeTabPageByClick', 'deleteTab', 'refreshTab'])
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
function closeAll() {
	emits('closeAll')
}
function closeOtherTab({ includeIds, newCurrentId }) {
	emits('closeOtherTab', { includeIds, newCurrentId })
}
function changeTabPageByClick(page) {
	emits('changeTabPageByClick', page)
}
function deleteTab(id) {
	emits('deleteTab', id)
}
function refreshTab(id) {
	emits('refreshTab', id)
}
</script>

<style lang="scss" scoped>
.lm-tab-wrapper-component {
	display: flex;
	width: 100%;
	height: 100%;
	overflow: hidden;
	flex-direction: column;
	.lm-tab-content-box {
		position: relative;
		// z-index: 99;
		z-index: 3;
		overflow: scroll;
		background: var(--background);
		border-radius: var(--radius3) var(--radius3) 0 0;
		flex: 1;
		display: flex;
		.base-main {
			display: block;
			flex: 1;
			flex-basis: auto;
			overflow: auto;
			box-sizing: border-box;
		}
	}
}

.lm-tab-bar-wrapper {
	position: relative;
	display: flex;
	overflow: hidden;
	background-color: var(--tab-bg);

	.tab-control-btn {
		display: flex;
		width: 30px;
		height: 100%;
		font-size: 18px;
		color: var(--tab-item-color);
		cursor: pointer;
		align-items: center;
		justify-content: center;
	}
}

.lm-tab-bar-content {
	display: flex;
	width: max-content;
	align-items: flex-end;
	height: 100%;
	transition: transform 0.2s;
}

.lm-tab-bar-box {
	height: var(--tab-height);
	overflow: hidden;
	color: var(--tab-item-color);
	flex: 1;

	.tab-item-box {
		position: relative;
		width: 134px;
		height: 32px;
		margin: 0 1px;
		cursor: pointer;

		&:hover {
			color: var(--tab-item-selected-color);
			background-color: var(--tab-item-selected-bg);
			border-radius: var(--radius2) var(--radius2) 0 0;

			+ .tab-item-box {
				.tab-line {
					display: none;
				}
			}

			.tab-line {
				display: none;
			}
		}

		.tab-line {
			position: absolute;
			top: 8px;
			left: -2px;
			z-index: 1;
			width: 1px;
			height: 16px;
			background-color: var(--tab-item-color);
		}

		.tab-line.tab-last-line {
			right: -2px;
			left: auto;
		}

		&:first-child {
			.tab-line {
				opacity: 0 !important;
			}
		}

		&.tab-active-item {
			color: var(--tab-item-selected-color);
			background: var(--tab-item-selected-bg);
			border-radius: var(--radius2) var(--radius2) 0 0;
		}
	}

	.tab-index-item {
		position: relative;
		z-index: 2;
		width: 134px;
		height: 32px;
		padding: 0 16px;
		overflow: hidden;
		font-size: var(--fs);
		line-height: 32px;
		text-overflow: ellipsis;
		white-space: nowrap;
		cursor: pointer;

		.anticon {
			position: relative;
			top: 9px;
			margin-right: 12px;
			font-size: 18px;
		}

		.delete-tab-icon {
			position: absolute;
			right: -6px;
			display: flex;
			font-size: 16px;
			opacity: 1;
		}

		&:hover {
			.delete-tab-icon {
				opacity: 1;
			}
		}
	}
}

.app-menu-layout-for-tab-bar {
	width: 100%;
}

.tab-context-menu-layout {
	position: absolute;
	z-index: 501;
	padding: 5px 0;
	background: var(--tab-item-bg);
	border-radius: 4px;
	box-shadow: 0 0 6px rgb(0 0 0 / 20%);

	ul {
		margin-bottom: 0;
	}

	li {
		padding: 5px 10px;
		color: #4e5866;
		cursor: pointer;

		&:hover {
			color: var(--primary);
		}

		&.tab-menu-diable {
			color: var(--disabled) !important;
			cursor: not-allowed;
			opacity: 0.8;
		}
	}
}
</style>
