<template>
    <div id="rightView">
        <div class="data">
            <div class="dead">
                <div class="summarize">
                    <div class="sum-title">Total Deaths</div>
                    <div class="sum-num">{{this.$store.state.areaData.number.totalDeadCount}}</div>
                </div>
                <scroll :rollHeight="scrollHeight">
                    <div v-for="item in this.$store.state.areaData.results" slot="content">
                        <div class = des-content @click="scrollItemClick(item)">
                            <span class="content-num">{{item.deadCount}} Death</span>
                            <br>
                            <span class="content-name">{{item.provinceName}} {{item.continents}}</span>
                        </div>
                    </div>
                </scroll>
            </div>

            <div class="recover">
                <div class="summarize">
                    <div class="sum-title">Total Recovered</div>
                    <div class="sum-num">{{this.$store.state.areaData.number.totalCuredCount}}</div>
                </div>
                <scroll :rollHeight="scrollHeight">
                    <div v-for="item in this.$store.state.areaData.results" slot="content">
                        <div class = des-content @click="scrollItemClick(item)">
                            <span class="content-num">{{item.curedCount}} Recovered</span>
                            <span class="content-name">{{item.provinceName}} {{item.continents}}</span>
                        </div>
                    </div>
                </scroll>
            </div>
        </div>
        <div class = mapBox :style="{height:fullHeight-586}">
            <chart-one v-if="currentIndex === 0&&staticData.quanguoTrendChart" :img-url="staticData.quanguoTrendChart[0].imgUrl"></chart-one>
            <chart-two v-else-if ="currentIndex === 1&&staticData.foreignTrendChartGlobal" :img-url="staticData.foreignTrendChartGlobal[0].imgUrl"></chart-two>
            <chart-three v-else-if ="currentIndex === 2&&staticData.foreignTrendChartGlobal" :img-url="staticData.foreignTrendChartGlobal[1].imgUrl"></chart-three>
        </div>
        <tabControl :tabItem="['staticCountry','staticContinent','DailyCases']"
                    class="tabControl" @tabClick = "tabClick" ref = "tabControl" :height=30 :width=300
        />
    </div>
</template>

<script>
    import scroll from "components/common/scroll/scroll";
    import tabControl from "components/content/tabControl/tabControl";
    import chartOne from "./viewChart/chartOne";
    import chartTwo from "./viewChart/chartTwo";
    import chartThree from "./viewChart/chartThree";

    import {getStatic} from "network/getMapData"

    export default {
        name: "rightView",
        components:{
            scroll,
            tabControl,
            chartOne,
            chartTwo,
            chartThree
        },
        props:{
            fullHeight:Number,
        },
        data(){
            return{
                currentIndex:{
                    type:Number,
                    default:0
                },
                totalDead:{
                    type: Number,
                    default: 0
                },
                totalCured:{
                    type: Number,
                    default: 0
                },
                staticData:Object
            }
        },
        computed:{
            scrollHeight(){
                return this.fullHeight - 400
            }
        },
        created() {
            // this.currentIndex = 2
            this.getStaticData()
        },
        mounted(){
            setTimeout(() => {
                this.tabClick(0)
            },2000)
        },
        methods:{
            scrollItemClick(item){
                switch (this.currentIndex) {
                    case 0:{
                        chartOne.methods.changeChart(item);
                        break;
                    }
                    case 1:{
                        chartTwo.methods.changeChart(item,this.$store.state.areaData.results);
                        break;
                    }
                    case 2:{
                        chartThree.methods.changeChart(item);
                        break;
                    }
                }
            },
            tabClick(index){
                this.currentIndex = index;
            },
            countryName(name){
                if(name == 'China') return 'China'
                else return ''
            },
            getStaticData(){
                getStatic().then(res => {
                    // console.log(res.getStatisticsService);
                    this.staticData = res.getStatisticsService
                })
            }
        }
    }
</script>

<style scoped>
    #rightView{
        color: #ffffff;
        font-size: 14px;
        background-color: rgba(0,0,0,0.2);
    }
    .data{
        display: flex;
        justify-content: space-between;
        border-bottom: #000 solid 10px;
    }
    .dead ,.recover{
        flex:1;
        border-right: #000000 solid 10px;
    }
    .summarize{
        text-align: center;
        padding-top: 10px;
        padding-bottom: 10px;
        border-bottom: #000000 solid 10px;
    }
    .sum-title{
        font-weight: lighter;
    }

    .sum-num{
        font-size: 30px;
        font-weight: bold;
    }
    .recover .sum-num{
        color: #5cab1e;
    }

    .des-content{
        padding-top: 14px;
        padding-bottom: 14px;
        border-bottom: #555 solid 1px;
        font-size: 12px;
        cursor: pointer;
    }
    .content-name{
        font-weight: lighter;
        white-space: nowrap;
        display: inline-block;
        overflow: hidden;  /*超出宽度部分隐藏*/
        text-overflow: ellipsis;  /*超出部分以点号代替*/
        width: 140px;
        padding-left: 40px;
        padding-top: 4px;
    }
    .content-num{
        padding-left: 40px;
        padding-right: 20px;
    }
    .recover .content-num{
        color: #5cab1e;
    }

    .mapBox{
        background-color: rgba(0,0,0,0.1);
    }

    .mapBox img{
        width: 100%;
        height: 100%;
        display: block;
    }

    .tabControl{
        font-size: 10px;
        padding: 0;
    }

</style>