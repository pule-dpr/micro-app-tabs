<template>
	<micro-app
		v-loading="loading"
		element-loading-text="加载中..."
		:class="loading ? 'loading' : ''"
		:name="microApp.name"
		:url="microApp.url"
		:iframe="microApp.iframe"
		:inline="microApp.inline"
		:destroy="microApp.destroy"
		:clear-data="microApp.clearData"
		:disable-scopecss="microApp.disablesScopecss"
		:disable-sandbox="microApp.disableSandbox"
		:ssr="microApp.ssr"
		:keep-alive="microApp.keepAlive"
		:default-page="microApp.defaultPage"
		:keep-router-state="microApp.keepRouterState"
		:disable-patch-request="microApp.disablePatchRequest"
		:fiber="microApp.fiber"
		:shadowDOM="microApp.shadowDOM"
		:baseroute="microApp.baseroute"
		:library="microApp.library"
		:data="{ name: routeName, worker }"
		@created="handleCreated"
		@beforemount="handleBeforeMount"
		@mounted="handleMounted"
		@error="handleError"
		@datachange="handleDataChange"
	></micro-app>
</template>

<script setup>
import app from '@micro-zoe/micro-app'
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from '@/hooks/useVueHook'
import Hive from '@/utils/hive'
const hive = new Hive()
const { commit } = useStore()
const props = defineProps({
	microApp: {
		type: Object,
		required: true
	},
	keepAlive: {
		type: Boolean
	},
	worker: {
		required: false
	}
})

const route = useRoute()
const router = useRouter()
const loading = ref(true)
const routeName = computed(() => route.params.name)

onMounted(() => {
	console.log(props.microApp.name + '启动', routeName.value)
})

const emit = defineEmits(['dataChange'])
function handleMounted() {
	loading.value = false
}
function handleCreated() {}
function handleBeforeMount() {}
function handleError() {}
function handleDataChange(val) {
	if (!val.detail?.data) return
	emit('dataChange', { busi: props.microApp.name, name: val.detail.data.routeName })
	commit('setCurMenu', { busi: props.microApp.name, name: val.detail.data.routeName })
	let data = val.detail?.data?.detail || {}
	if (data.busi && (data.params || data.query)) {
		const res = JSON.parse(hive.get('micro-route')) || {}
		// if (props.microApp.name !== res.busi) return
		router.push({ name: data.busi, params: { name: data.name } })
		app.setData(data.busi, {
			name: routeName.value,
			worker: props.worker,
			params: res.params,
			query: res.query
		})
		hive.remove('micro-route')
	}
}
</script>

<style lang="scss">
micro-app,
micro-app-body {
	height: 100% !important;
	//overflow: hidden !important;
	.el-form-item__content {
		.el-input__prefix + .el-input__inner {
			padding-left: 12px;
			line-height: 1;
		}
	}
}
</style>
