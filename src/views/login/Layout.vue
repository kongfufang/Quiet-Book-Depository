<template>
	<div>
		<homeIndex></homeIndex>
    <mainIndex></mainIndex>
    <selectIndex></selectIndex>
    <footIndex></footIndex>
	</div>
</template>

<script>
import homeIndex from '@/components/home.vue'
import mainIndex from '@/components/main.vue'
import selectIndex from '@/components/select.vue'
import footIndex from '@/components/footer.vue'
export default {
  name: 'layoutIndex',
  components: {
    homeIndex,
    mainIndex,
    selectIndex,
    footIndex
  }
}
</script>

<style scoped >
@keyframes scroll-down {
	0% { transform: translateY(-4%); }
	100%{ transform: translateY(0%); }
}
</style>
