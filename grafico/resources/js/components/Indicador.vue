<template>
<trading-vue :data="chart" :width="this.width" :height="this.height"
        :color-back="colors.colorBack"
        :color-grid="colors.colorGrid"
        :color-text="colors.colorText">
</trading-vue>
</template>

<script>
// '../src/TradingVue.vue'
// '../test/data/data_aapl.json'
// '../src/stuff/utils.js'
import TradingVue from '../trading-vue-js-master/src/TradingVue'
import Data from '../trading-vue-js-master/test/data/data_aapl.json'
import Utils from '../trading-vue-js-master/src/stuff/utils.js'
export default {
    name: 'Stocks',
    description: 'Should correctly display dates and hide weekend gaps',
    components: {
        TradingVue
    },
    methods: {
        onResize(event) {
            this.width = window.innerWidth -400
            this.height = window.innerHeight - 400
        }
    },
    mounted() {
        window.addEventListener('resize', this.onResize)
        setTimeout(() => {
            // Async data setup
            this.$set(this, 'chart', Data)
        }, 0)
        this.onResize()
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.onResize)
    },
    data() {
        return {
            chart: {}, // Data will be here,
            width: window.innerWidth,
            height: window.innerHeight,
            colors: {
                colorBack: '#fff',
                colorGrid: '#eee',
                colorText: '#333',
            }
        };
    }
};
</script>

<style>
</style>