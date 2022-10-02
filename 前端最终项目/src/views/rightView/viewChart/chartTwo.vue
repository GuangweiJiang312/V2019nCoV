<template>
    <div id="chart" class="imgUrl">
    </div>
</template>

<script>
    export default {
        mounted() {
            this.initChart()
        },
        methods:{
            initChart(){
                let echarts = require('echarts')
                let myChart = echarts.init(document.getElementById('chart'));
                let continentCount={
                    "亚洲":0,
                    "欧洲":0,
                    "北美洲":0,
                    "南美洲":0,
                    "非洲":0,
                    "大洋洲":0,
                    "其他":0
                };
                let continentCount_arr=[];
                for (let i = 0; i < this.$store.state.areaData.results.length; i++) {
                    continentCount[this.$store.state.areaData.results[i].continents]+=this.$store.state.areaData.results[i].currentConfirmedCount
                }
                for (let x in continentCount) {
                    continentCount_arr.push({
                        "value":continentCount[x],
                        "name":x
                    });
                }
                myChart.setOption({
                    //backgroundColor:'#222',
                    backgroundColor:'rgb(34,34,34,0.3)',
                    title: {
                        text: '各洲现存确诊数对比',
                        left: 10,
                        top: 20,
                        textStyle: {
                            color: 'rgba(255,255,255)'
                        }
                    },

                    tooltip: {
                        trigger: 'item',
                        formatter: '{a} <br/>{b} : {c} ({d}%)'
                    },

                    visualMap: {
                        show: false,
                        min: 80,
                        max: 600,
                        inRange: {
                            colorLightness: [0, 1]
                        }
                    },
                    series: [
                        {
                            itemStyle: {
                                //color: 'rgb(0, 128, 128)',
                                color: {
                                    type: 'linear',
                                    x: 0,
                                    y: 0,
                                    x2: 0,
                                    y2: 1,
                                    colorStops: [{
                                        offset: 0, color: 'rgb(255,0,0)' // 0% 处的颜色
                                    }, {
                                        offset: 1, color: 'rgb(0,0,255)' // 100% 处的颜色
                                    }],
                                    global: false // 缺省为 false
                                },
                                shadowBlur: 200,
                                shadowColor: 'rgba(0, 0, 0)'
                            },
                            name: '现存确诊人数',
                            type: 'pie',
                            radius: '55%',
                            center: ['50%', '50%'],
                            data: continentCount_arr.sort(function (a, b) { return a.value - b.value; }),
                            roseType: 'radius',
                            label: {
                                color: 'rgba(255, 255, 255)'
                            },
                            labelLine: {
                                lineStyle: {
                                    color: 'rgba(255, 255, 255)'
                                },
                                smooth: 0.2,
                                length: 10,
                                length2: 20
                            },
                            animationType: 'scale',
                            animationEasing: 'elasticOut',
                            animationDelay: function (idx) {
                                return Math.random() * 200;
                            }
                        }
                    ]
                });
            },
            changeChart(country,results){
                console.log(country)
                let echarts = require('echarts')
                let myChart = echarts.init(document.getElementById('chart'));
                let continentCount_arr=[];
                for (let i = 0; i < results.length; i++) {
                    if(results[i].continents===country.continents){
                        continentCount_arr.push({
                            "value":results[i].currentConfirmedCount,
                            "name":results[i].provinceName
                        })
                    }
                }
                myChart.setOption({
                    backgroundColor:'rgba(34,34,34,0.3)',
                    title: {
                        text: country.continents+'各国现存确诊数对比',
                        left: 10,
                        top: 20,
                        textStyle: {
                            color: 'rgba(255,255,255)'
                        }
                    },

                    tooltip: {
                        trigger: 'item',
                        formatter: '{a} <br/>{b} : {c} ({d}%)'
                    },

                    visualMap: {
                        show: false,
                        min: 80,
                        max: 600,
                        inRange: {
                            colorLightness: [0, 1]
                        }
                    },
                    series: [
                        {
                            itemStyle: {
                                //color: 'rgb(0, 128, 128)',
                                color: {
                                    type: 'linear',
                                    x: 0,
                                    y: 0,
                                    x2: 0,
                                    y2: 1,
                                    colorStops: [{
                                        offset: 0, color: 'rgba(255,0,0)' // 0% 处的颜色
                                    }, {
                                        offset: 1, color: 'rgba(0,0,255)' // 100% 处的颜色
                                    }],
                                    global: false // 缺省为 false
                                },
                                shadowBlur: 200,
                                shadowColor: 'rgba(0, 0, 0)'
                            },
                            name: '现存确诊人数',
                            type: 'pie',
                            radius: '55%',
                            center: ['50%', '50%'],
                            data: continentCount_arr.sort(function (a, b) { return a.value - b.value; }),
                            roseType: 'radius',
                            label: {
                                color: 'rgba(255, 255, 255)'
                            },
                            labelLine: {
                                lineStyle: {
                                    color: 'rgba(255, 255, 255)'
                                },
                                smooth: 0.2,
                                length: 10,
                                length2: 20
                            },
                            animationType: 'scale',
                            animationEasing: 'elasticOut',
                            animationDelay: function (idx) {
                                return Math.random() * 200;
                            }
                        }
                    ]
                });
            }
        }
    }
</script>

<style scoped>
    .imgUrl{
        height: 200px;
        width: auto;
    }
</style>