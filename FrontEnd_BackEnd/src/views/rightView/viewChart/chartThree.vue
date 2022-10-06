<template>
    <div id="line-chart" class="imgUrl">
    </div>
</template>

<script>
    import {getTimeSeries} from "../../../network/getMapData";

    export default {
        mounted() {
            this.initChart();
        },
        methods: {
            initChart() {
                let echarts = require('echarts')
                let myChart = echarts.init(document.getElementById('line-chart'));
                getTimeSeries().then(data => {
                    let k_v = {};//以日期为键，人数为值
                    for (let country in data) {
                        for (let i = 0; i < data[country].length; i++) {
                            k_v[data[country][i].date] = k_v.hasOwnProperty(data[country][i].date) ? (k_v[data[country][i].date] + data[country][i].confirmed) : data[country][i].confirmed;
                        }
                    }
                    /*for (let i = 0; i < data.China.length; i++) {
                        //let time=new Date(Date.parse(data.China[i].date.replace("-",  "/")));
                        xvalue.push(echarts.format.formatTime('yyyy-MM-dd', data.China[i].date));
                        yvalue.push(data.China[i].confirmed);
                    }*/
                    let option = {
                        //backgroundColor: '#222',
                        backgroundColor:'rgb(34,34,34,0.3)',
                        title: {
                            text: '全球确诊人数时序变化情况',
                            textStyle: {
                                color: 'rgba(255,255,255)'
                            },
                            left: 10
                        },
                        toolbox: {
                            feature: {
                                dataZoom: {
                                    yAxisIndex: false
                                },
                                saveAsImage: {
                                    pixelRatio: 2
                                }
                            }
                        },
                        tooltip: {
                            trigger: 'axis',
                            axisPointer: {
                                type: 'shadow'
                            }
                        },
                        grid: {
                            bottom: 90
                        },
                        dataZoom: [{
                            type: 'inside'
                        }, {
                            type: 'slider'
                        }],
                        xAxis: {
                            data: Object.keys(k_v),
                            silent: false,
                            splitLine: {
                                show: false
                            },
                            splitArea: {
                                show: false
                            },
                            axisLabel: {
                                color: 'rgba(255,255,255,0.5)'
                            }
                        },
                        yAxis: {
                            show: false,
                            splitArea: {
                                show: false
                            },
                            type: 'value'
                        },
                        series: [{
                            type: 'bar',
                            //data: data.valueData,
                            itemStye:{
                                color:'rgb(255,0,0)'
                            },

                            data: Object.values(k_v),
                            // Set `large` for large data amount
                            large: true
                        }]
                    };
                    myChart.setOption(option);
                })
            },
            changeChart(country) {
                console.log(country.countryFullName);
                getTimeSeries().then(data=>{
                    let echarts = require('echarts')
                    let myChart = echarts.init(document.getElementById('line-chart'));
                    let xvalue = [];
                    let yvalue = [];
                    for (let i = 0; i < data[country.countryFullName].length; i++) {
                        xvalue.push(echarts.format.formatTime('yyyy-MM-dd', data[country.countryFullName][i].date));
                        yvalue.push(data[country.countryFullName][i].confirmed);
                    }
                    let option = {
                        backgroundColor: 'rgba(34,34,34,0.3)',
                        title: {
                            text: country.provinceName + '确诊人数时序变化情况',
                            textStyle: {
                                color: 'rgba(255,255,255)'
                            },
                            left: 10
                        },
                        toolbox: {
                            feature: {
                                dataZoom: {
                                    yAxisIndex: false
                                },
                                saveAsImage: {
                                    pixelRatio: 2
                                }
                            }
                        },
                        tooltip: {
                            trigger: 'axis',
                            axisPointer: {
                                type: 'shadow'
                            }
                        },
                        grid: {
                            bottom: 90
                        },
                        dataZoom: [{
                            type: 'inside'
                        }, {
                            type: 'slider'
                        }],
                        xAxis: {
                            data: xvalue,
                            silent: false,
                            splitLine: {
                                show: false
                            },
                            splitArea: {
                                show: false
                            },
                            axisLabel: {
                                color: 'rgba(255,255,255)'
                            }
                        },
                        yAxis: {
                            show: false,
                            splitArea: {
                                show: false
                            },
                            type: 'value'
                        },
                        series: [{
                            type: 'bar',
                            itemStye: {
                                color:'rgba(255,0,0)'
                            },
                            //data: data.valueData,
                            data: yvalue,
                            // Set `large` for large data amount
                            large: true
                        }]
                    };
                    myChart.setOption(option);
                });
            }
        },
    }
</script>

<style scoped>
    .imgUrl {
        height: 200px;
        width: auto;
    }
</style>