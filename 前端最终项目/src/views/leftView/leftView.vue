<template>
    <div id="leftView">
        <div class="summarize">
            <div class="sum-title">Total Confirmed</div>
            <div class="sum-num">{{this.$store.state.areaData.number.totalConfirmCount}}</div>
        </div>
        <scroll :rollHeight="scrollHeight">
            <div slot="rollTitle" class="rollTitle">Confirmed Case by<br>Country/Region</div>
            <div v-for="(item,index) in this.$store.state.areaData.results" slot="content">
                <div class = "des-content" @click="itemClick(item)">
                    <span class="content-num">{{item.confirmedCount}}</span>
                    <span class="content-name">{{item.provinceName}} {{item.continents}}</span>
                </div>
            </div>
        </scroll>

        <div class="updateTime">
            <div class="updateTime-title">Last Updated Time</div>
            <div class="updateTime-data">{{updateTime}}</div>
        </div>
    </div>
</template>

<script>
    import scroll from "components/common/scroll/scroll";

    export default {
        name: "leftView",
        components:{
            scroll
        },
        props:{
            fullHeight:Number
        },
        data(){
            return{
            }
        },
        computed:{
            scrollHeight(){
                return this.fullHeight - 300
        },
            updateTime(){
                let time = this.$store.state.areaData.number.time
                return this.formatDate(new Date(time))
            }
        },
        mounted() {
            // this.updateTime = '2020/3/8 11.18AM'
        },
        methods:{
            formatDate(now) {
                let year=now.getFullYear();  //取得4位数的年份
                let month=now.getMonth()+1;  //取得日期中的月份，其中0表示1月，11表示12月
                let date=now.getDate();      //返回日期月份中的天数（1到31）
                let hour=now.getHours();     //返回日期中的小时数（0到23）
                let minute=now.getMinutes(); //返回日期中的分钟数（0到59）
                let second=now.getSeconds(); //返回日期中的秒数（0到59）
                return year+"-"+month+"-"+date+" "+hour+":"+minute+":"+second;
            },
            itemClick(index){
                console.log(index);
                this.$bus.$emit('clickItem',index)
            },
            countryName(name){
                if(name == 'China') return 'China'
                else return ''
            }
        }
    }
</script>

<style scoped>
    #leftView{
        color: #ffffff;
        font-size: 14px;
    }
    .rollTitle{
        font-weight: lighter;
        padding-top: 15px;
        padding-bottom: 15px;
        border-bottom: #555 solid 1px;
    }
    .summarize{
        text-align: center;
        padding-top: 15px;
        padding-bottom: 15px;
        border-bottom: #000000 solid 10px;
    }
    .sum-title{
        font-weight: lighter;
    }
    .sum-num{
        font-size: 30px;
        font-weight: bold;
        color: red;
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
        width: 130px;
    }
    .content-num{
        color: red;
        padding-left: 35px;
        padding-right: 10px;
        padding-bottom: 4px;
        /*display: inline-block;*/
    }

    .updateTime{
        border-top: #000 solid 10px;
    }

    .updateTime div{
        text-align: center;
    }
    .updateTime-title{
        font-size: 10px;
        font-weight: lighter;
        margin-top: 14px;
        /*margin-bottom: 4px;*/
    }
    .updateTime-data{
        font-size: 10px;
        margin-top: 14px;
        margin-bottom: 6px;
        font-weight: bold;
    }

</style>