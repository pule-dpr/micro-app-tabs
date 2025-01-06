<template>
	<div class="header">设计实现</div>
	<div class="content">
		<p><span>微前端调研：</span>现有微前端框架分析与对比，主要是分析，所以各个问题的原因以及解决就不赘述了，只标注现在是否有相对成熟解决方案。</p>
		<el-image
			style="width: 100%; height: 400px"
      :src="require('../../assets/dashboad/micro-cp.png')"
      :zoom-rate="1.2"
      :max-scale="7"
      :min-scale="0.2"
      :preview-src-list="[require('../../assets/dashboad/micro-cp.png')]"
      :initial-index="4"
      fit="contain"/>
		<p><span>实现：</span>综上对比，以及对microApp也有一定的经验了，所以使用microApp设计实现一套多页签的架构！！！</p>
		<p>-----------》〉》〉》<span @click="goDetails('microDetails')">基于microApp框架详细设计</span></p>
		<p>-----------》〉》〉》<span @click="goDetails('appTabsDetails')">Apptabs多页签组件详细设计</span></p>
	</div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const goDetails = (name) => {
	router.push({name})
}
</script>
<style lang="scss" scoped>
.header{
	text-align:center;
	font-size:24px;
	font-weight:600;
	background:#f3f3f3;
	color:#e96900;
	padding: 12px;
}
.content{
	padding:32px;
	font-size:16px;
	font-weight:500;
	span{
		color:#e96900;
		cursor: pointer;
	}
}
</style>
