<template>
	<div class="header">问题记录与分析</div>
	<div class="content">
		<h3>详情可跳转至博客地址：https://blog.csdn.net/ujjhuhu/article/details/141138943?spm=1011.2415.3001.5331</h3>
		<div class="case-card" v-for="(item,index) in sensList" :key="index">
			<p><span>问题{{index + 1}}：</span>{{item.sens}}</p>
			<p><span>原因：</span>{{ item.case }}</p>
			<p><span>解决：</span>{{ item.desc }}</p>
			<el-image
			v-if="item.img"
			style="width: 100%; height: 600px"
			:src="item.img"
			:zoom-rate="1.2"
			:max-scale="7"
			:min-scale="0.2"
			:preview-src-list="[item.img]"
			:initial-index="4"
			fit="contain"/>
		</div>
	</div>
</template>

<script setup>

const sensList = [
	{
		sens:'前期设计阻碍较大',
		case:' 前期进行初步了解后，想依据之前的经验，去复用一些解决方案，但是发现区别太大对当前微前端框架不太熟悉由于系统菜单存在多个特殊的应用场景，如菜单为kbs，但内部嵌有oa的子应用菜单，菜单通过路由appName渲染，点击时要保持菜单不变，但要渲染对应子应用，以及包含详情多开，或动态tab标签等，设计时需要考虑全面，整个链路较长，多个应用间调试不方便，在路由监听，路由守卫等监听中进行逻辑处理，稍有不慎就会进入死循环。',
		desc:'下载mircoApp框架的demo，熟悉配置项以及常用api，将初步设计方案在demo中实现，排除业务逻辑可能发生的影响，对应基座子应用等项目找出对应问题，利用路由特性实现整个链路的闭环，再修复完善一些特殊情况的兼容以及问题。'
	},
	{
		sens:'由于同步路由的操作，导致路由堆栈混乱，浏览器回退前进存在问题',
		case:'应该是mircoApp的虚拟路由中子改主，或主改子路由时，会对浏览器的路由栈做一些特殊处理，如清空，浏览器的回退前进操作时，表现是主应用路由和子应用路由都别改变了，加上写了很多监听路由的逻辑，偶现会死循环跳转。',
		desc:'将子应用中的事件监听dataChange的触发中改变路由的改为replace，以及路由守卫中的通过虚拟路由子改主路由的方式也改为replace。'
	},
	{
		sens:'首次加载子应用会在接收到datachange后，子应用replace前，有个前置默认跳转的操作，触发路由守卫（直接操作的路由），导致多tab多弹一个以及报错。',
		case:'microApp框架设计如此，当主子应用使用路由不同时，一个history一个hash，首次加载子应用时，会先跳默认路由找到子应用，再通过事件监听改变子应用路由默认路由一般是’/‘，通过表现，发现默认路由在from子应用状态经过后台推前台的操作会改变，也就是默认路由其实是动态的，由于测试时只进行了两个子应用的测试，一直没发现问题，多个子应用一起运行切换时才发现，所有之前解决方案pass。',
		desc:'之前解决方案：不使用‘/’的路由，路由守卫做拦截，等于‘/’不触发改主应用逻辑，这样路由内部会抛出一个未找到对应路由的错误，通过onError在外部接住就行。暂时没有想到更好的方式。现在的解决方式：确定了默认路由跳转的时机，通过在默认路径跳转完成之后，动态挂载一个新的路由守卫，处理与主应用路由同步的逻辑。'
	},
	{
		sens:'在绩效界面（oa）时，点击kbs工作台，删除工作台tab，删除完成后会新增一个oa的工作台tab',
		case:'子应用间切换时，时机就是在当前子应用（a应用）afterhidden后，准备加载新子应用（b应用）beforeshow之前，路由改变，microOptions随之改变，会主动向b应用发送a应用最新的消息。b应用就会触发dataChange事件。只有工作台存在这个问题是因为oa，kbs都有工作台（dashboard）这个路由，而我们拦截的方式是通过if(!router.getRoutes().some(r=>r.name===data.name)) return例如：绩效打开任务管理，关闭任务管理，触发kbs的afterhidden，然后进行默认的操作，就是会主动向oa应用发送kbs应用最新的消息（也就是{name:taskManage}）,oa收到消息后检索routes中不存在这个name的路由，就拦截掉了。反之工作台，走到这一步能找到name为dashboard的路由，就会触发接下来的逻辑，跳转oa工作台，同步主应用路由，新增tab。',
		desc:'由于触发这个默认操作的必经的生命周期是afterhidden，afterhidden触发的关键就是即将加载的子应用和当前子应用不一样，所以在data中新增变量isIntercept（是否拦截）data: { name: pageName,isIntercept:appName !== realAppName}在子应用中新增判断if(data.isIntercept) return'
	},
	{
		sens:'404页面特殊情况开两个',
		case:'由于原设计，path中的appName，其实为表面为两用，一是用于寻找右侧菜单，二是用于渲染对应子应用，但其实主要就只是用于渲染右侧菜单，子应用的渲染第一优先级是其菜单配置中的rePageName, 这个设定在一般场景下不存在问题，但是在特殊场景下，如404，找不到对应菜单配置并且还是在其他子应用右侧菜单中的page（如技管菜单中绩效），就会出现我在oa子应用中的404，加载tab404页面，因为404所以找不到对应的菜单配置，就会使用第二优先级的appName，但appName为kbs，会加载kbs子应用，再加载404的连锁反应。',
		desc:'',
		img:require('../../assets/dashboad/w-5.png')
	},
	{
		sens:'a子应用加载A页面完成后，跳转另一个b子应用的B页面，a子应用进入后台缓存，此时点击进入a子应用的C页面，a应用推出前台后会先进A页面闪一下，再到C页面',
		case:'尝试在子应用中路由守卫处拦截，没用，拦不了后台推前台的那一下闪烁，因为闪烁那一下不是路由跳转导致的闪烁，而是由于子应用有缓存，先加载子应用（之前就在A页面），再跳转路由，感觉是正常现象。',
		desc:'',
		img:require('../../assets/dashboad/w-6.png')
	},
	{
		sens:'部分场景涉及到下一步操作，如活动详情，点击下一步时新增了页签',
		case:'由于详情多开的设计，页签路由存的是完全精准的路由，活动的下一步也是通过路由控制的，导致按详情多开的场景一样处理了',
		desc:'暂无，因为涉及到业务设计，需要与产品商讨，换一种方式来展示下一步，看是改交互还是改实现方式，反正需要与详情多开的场景有所区别'
	},
	{
		sens:'通过点击菜单加载a应用的apage(多列表)，apage中按钮可跳转到详情adetails，然后我点击b菜单跳转到b应用的bpage，然后我通过tab再点adetails，回不去，会新增一个404页面',
		case:'因为进入b应用bpage时，将a应用从前台推入后台了，通过tab再点击回去时，由于详情时非预设菜单，在全局菜单中找不到，adetails是独属于a应用的路由，导致基座不知道加载那个子应用，由于之前设计是如果找不到对应的菜单（子应用信息）就在当前已激活的子应用下进行跳转，所以就会在b应用中去跳转到adtails到路由，自然就是会404',
		desc:'太多了，去博客看'
	},
	{
		sens:'特殊情况下：刷新浏览器，浏览器清缓存子应用重新挂载并且当前页面为带参数详情页，会出现参数丢失情况',
		case:'经过排查，此问题由于页面跳转有两种方式，一种传参跳，一种直接通过虚拟路由跳转，在这种特殊情况下，会同时触发两种跳转方式，导致传参跳把通过虚拟路由跳给覆盖了',
		desc:'',
		img:require('../../assets/dashboad/w-10.png')
	}
]
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
	}
	.case-card{
		border-radius: 16px;
		background: #f9f9f9;
		border: 1px solid #ccc;
		padding: 32px;
		margin: 8px 0;
	}
}
</style>
