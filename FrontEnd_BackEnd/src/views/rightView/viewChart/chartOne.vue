<template>
    <div id="chart" class="imgUrl">
    </div>
</template>
<script>
    import rightView from "../rightView";

    export default {
        mounted() {
            this.initChart();
        },
        methods: {
            initChart() {
                let echarts = require('echarts')
                let myChart = echarts.init(document.getElementById('chart'));
                myChart.setOption({
                    //backgroundColor: '#222',
                    backgroundColor:'rgb(34,34,34,0.2)',
                    title: {
                        text: '全球总数统计',
                        textStyle: {
                            color: 'rgba(255,255,255)'
                        }
                    },
                    tooltip: {},
                    xAxis: {
                        data: ['总死亡数', '总确诊数', '总治愈数'],
                        axisLabel: {
                            color: 'rgba(255,255,255)'
                        }
                    },
                    yAxis: {
                        show: false
                    },
                    series: [{
                        name: '人数',
                        type: 'bar',
                        itemStyle:{
                          color:'rgb(255,0,0)'
                        },
                        data: [this.$store.state.areaData.number.totalDeadCount, this.$store.state.areaData.number.totalConfirmCount, this.$store.state.areaData.number.totalCuredCount]
                    }]
                });
            },
            changeChart(country) {
                let echarts = require('echarts')
                let myChart = echarts.init(document.getElementById('chart'));
                myChart.setOption({
                    //backgroundColor: '#222222',
                    //backgroundColor:'rgb(34,34,34,0.1)',
                    title: {
                        text: country.provinceName + '总数统计',
                        textStyle: {
                            color: 'rgba(255,255,255)'
                        }
                    },
                    tooltip: {},
                    xAxis: {
                        data: ['总死亡数', '总确诊数', '总治愈数'],
                        axisLabel: {
                            color: 'rgba(255,255,255)'
                        }
                    },
                    yAxis: {
                        show: false
                    },
                    series: [{
                        name: '人数',
                        type: 'bar',
                        itemStyle:{
                            color:'rgb(255,0,0)'
                        },
                        data: [country.deadCount, country.confirmedCount, country.curedCount]
                    }]
                });
            }
        }
    }
</script>

<style scoped>
    .imgUrl {
        height: 200px;
        width: auto;
    }
</style>