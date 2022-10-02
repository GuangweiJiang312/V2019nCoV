<template>
    <div class="mapContainer">
        <div id="gaodeMap"></div>
        <el-button v-on:click="resetMap" id="reset" type='info' icon='el-icon-full-screen' plain class = "resetMap"></el-button>
    </div>
</template>

<script>
    import {request} from 'network/request.js'
    import {getMapArea,getMapNews} from "network/getMapData";
    import axios from "axios"
    import {getChinaData} from "network/getMapData";
    import {chinaLocation} from 'assets/json/chinaLocation.json'
    import chinaCities from 'assets/json/chinaCities.json'
    import 'assets/css/infoWin.css'
/*import func from '../../../../vue-temp/vue-editor-bridge';*/

    export default {
        name: "gaodeMap",
        //变量定义的地方
        data() {
           return {
               //例子如下，变量类型和默认值
               // name:{
               //     type:String,
               //     default:'zhangkai'
               // }
               index:{
                   type:Number,
                   default() {
                       return -1;
                   }
               },
               map:null,
               roundPointLayer:null,
               infoWin:null,
               newsWin:[],
               tableDom:null,
               tableDoms:[]
           }
        },
        mounted() {
            //写代码的地方，mouted就是vue组件挂载之后调用的一个生命周期的函数
            // this.getData()
            this.index = -1
            this.getItemIndex()
            //this.initMap()
            //this.initRoundPointLayer(this.map)           
            axios.get('http://106.52.187.27:8089/api/chinaData').then(res => {
                this.initMap()
                this.initRoundPointLayer(res)
            })
        },
        methods:{
            //写函数的地方，在mouted里面用 this.xxx() 调用
            getItemIndex(){
                this.$bus.$on('clickItem',res => {
                    this.index = res
                })
            },
            initMap() {
                this.map = new AMap.Map('gaodeMap', {
                    mapStyle: 'amap://styles/dark',
                    defaultCursor:'default',
                    viewMode:'3D',
                    zoom: 4,
                    zooms:[4,18],
                    center: [106, 37.5],
                    showBuildingBlock:true,
                    buildingAnimation:true
                })
            },
            initRoundPointLayer(res) {
                this.roundPointLayer = new Loca.RoundPointLayer({
                    eventSupport:true,
                    map: this.map
                })

                var mapData = []
                var filterData = []
                res.data.getAreaStat.forEach(item => {
                    filterData.push({
                        lng: chinaLocation[item.provinceName][0],
                        lat: chinaLocation[item.provinceName][1],
                        lnglat: chinaLocation[item.provinceName],
                        name: item.provinceName,
                        confirmedCount: item.confirmedCount,
                        curedCount: item.curedCount,
                        deadCount: item.deadCount
                    })
                })
                filterData.forEach(item => {
                    if (item.name && item.lnglat) {
                        mapData.push(item)
                    }
                })
                this.roundPointLayer.setData(mapData, {
                    lnglat: function (data) {
                        var item = data.value;
                        return item.lnglat;

                    }
                })
                this.roundPointLayer.setOptions({
                    style: {
                        radius: function(data) {
                            var confirmedCount=data.value.confirmedCount
                            if(confirmedCount<100) {return 3}
                            else if(confirmedCount<300) {return 5}
                            else if(confirmedCount<500) {return 10}
                            else if(confirmedCount<1000) {return 13}
                            else if(confirmedCount<2000) {return 15}
                            else {return 30}
                        },
                        color: function(data) {
                            var confirmedCount=data.value.confirmedCount
                            if(confirmedCount<100) {return '#ff0000'}
                            else if(confirmedCount<300) {return '#dc143c'}
                            else if(confirmedCount<500) {return '#a52a2a'}
                            else if(confirmedCount<1000) {return '#b22222'}
                            else if(confirmedCount<2000) {return '#8b0000'}
                            else {return '#800000'}
                        },
                        opacity: 0.84,
                        borderWidth: 1,
                        borderColor: '#eee'
                    },
                    selectStyle:{
                        color: '#EE9A00',
                        borderWidth: 5,
                    }
                })

                this.roundPointLayer.on('mousemove',(ev)=> {
                    var rawData=ev.rawData
                    var originalEvent=ev.originalEvent
                    this.openInfoWin(this.map,originalEvent,{
                        '名称':rawData.name,
                        '累计确诊人数':rawData.confirmedCount,
                        '累计治愈人数':rawData.curedCount,
                        '累计死亡人数':rawData.deadCount
                    })
                })

                this.roundPointLayer.on('mouseleave',(ev)=>{
                    this.closeInfoWin()
                })

                this.roundPointLayer.on('click',(ev)=>{
                    this.closeInfoWin()
                    this.map.setZoomAndCenter(9, ev.rawData.lnglat)
                    this.map.setPitch(66)
                    this.roundPointLayer.hide()
                    axios.get('https://lab.isaaclin.cn/nCoV/api/news?num=50&province='+ev.rawData.name).then(res=>{
                        for(var i=0;i<chinaCities.length;i++) {
                            if(chinaCities[i].name==ev.rawData.name) {
                                var newsData=res.data.results
                                newsData.forEach((news,index)=>{
                                    for (var j=0;j<chinaCities[i].children.length;j++) {
                                        var city=chinaCities[i].children[j]
                                        if(news.summary.indexOf(city.name)!=-1) {
                                            var newsMarker=new AMap.Marker({
                                                map:this.map,
                                                position:new AMap.LngLat(parseFloat(city.log)+Math.random()*2-1,parseFloat(city.lat)+Math.random()*2-1),
                                                icon:new AMap.Icon({
                                                    imageSize:new AMap.Size(25,25),
                                                    image:"data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTg2OTEyNzA3NjYyIiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9Ijk0MCIgd2lkdGg9IjMyIiBoZWlnaHQ9IjMyIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+PGRlZnM+PHN0eWxlIHR5cGU9InRleHQvY3NzIj48L3N0eWxlPjwvZGVmcz48cGF0aCBkPSJNNTAwLjU1IDQ4Ny4wNW0tMTMzLjM0IDBhMTMzLjM0IDEzMy4zNCAwIDEgMCAyNjYuNjggMCAxMzMuMzQgMTMzLjM0IDAgMSAwLTI2Ni42OCAwWiIgZmlsbD0iIzhjMjExMyIgcC1pZD0iOTQxIj48L3BhdGg+PHBhdGggZD0iTTUwMi40OSA5NTAuODFjLTI2LjM1IDAtNTEuMjQtMTAuMi03MC4wOS0yOC43MS00OS45OC00OS4xMS0xMjIuNS0xMjUuMDItMTg0LjE0LTIwNy43My0zNS4wNC00Ny4wMi02Mi42NC05MS4xMy04Mi4wNC0xMzEuMTItMjMuOTItNDkuMy0zNi4wNS05My44OC0zNi4wNS0xMzIuNTEgMC01MC4yNSA5Ljg1LTk5LjAxIDI5LjI3LTE0NC45MyAxOC43NS00NC4zNCA0NS41OS04NC4xNSA3OS43OC0xMTguMzNzNzQtNjEuMDIgMTE4LjMzLTc5Ljc4YzQ1LjkyLTE5LjQyIDk0LjY5LTI5LjI3IDE0NC45My0yOS4yNyA1MC4yNSAwIDk5LjAxIDkuODUgMTQ0LjkzIDI5LjI3IDQ0LjM0IDE4Ljc1IDg0LjE1IDQ1LjU5IDExOC4zMyA3OS43OHM2MS4wMiA3My45OSA3OS43OCAxMTguMzNjMTkuNDIgNDUuOTIgMjkuMjcgOTQuNjkgMjkuMjcgMTQ0LjkzIDAgMzguNjMtMTIuMTMgODMuMjEtMzYuMDUgMTMyLjUxLTE5LjQgMzkuOTktNDcgODQuMS04Mi4wNCAxMzEuMTItNjEuNjMgODIuNzItMTM0LjE2IDE1OC42Mi0xODQuMTQgMjA3LjczLTE4LjgyIDE4LjUyLTQzLjcxIDI4LjcxLTcwLjA3IDI4LjcxeiBtMC04MDMuOTFjLTE2Ny41NCAwLTMwMy44NCAxMzYuMy0zMDMuODQgMzAzLjg0IDAgNTMuOTQgMzYuMTQgMTMwLjk1IDEwNC41MiAyMjIuNzIgNTkuMDMgNzkuMjIgMTI4Ljk2IDE1Mi4zOCAxNzcuMjIgMTk5LjggMTIuMzkgMTIuMTcgMzEuOCAxMi4xNyA0NC4xOSAwIDQ4LjI3LTQ3LjQyIDExOC4xOS0xMjAuNTggMTc3LjIyLTE5OS44IDY4LjM4LTkxLjc3IDEwNC41Mi0xNjguNzggMTA0LjUyLTIyMi43MiAwLjAxLTE2Ny41NC0xMzYuMjktMzAzLjg0LTMwMy44My0zMDMuODR6IiBmaWxsPSIjOGMyMTEzIiBwLWlkPSI5NDIiPjwvcGF0aD48L3N2Zz4="
                                                })
                                            })
                                            newsMarker.setLabel({
                                                offset:new AMap.Pixel(20,20),
                                                content:"<div class='info'><span class='span-info'>"+news.title+"</span></div>",
                                                direction:"bottom-left"
                                            })
                                            newsMarker.on('click',(ev)=>{
                                                this.openInfoWin(this.map,{offsetX:260,offsetY:10},{
                                                    "标题":news.title,
                                                    "概要":news.summary,
                                                    "日期":(new Date(parseInt(news.pubDate)).toLocaleString().replace(/:\d{1,2}$/,' ')),
                                                    "信息源":news.infoSource
                                                })
                                            })
                                            break
                                        }
                                    }
                                })
                                break
                            }
                        }
                    })
                })

                this.roundPointLayer.render()
            },
            resetMap() {
                this.map.setZoomAndCenter(4,[106, 37.5])
                this.map.setPitch(0)
                this.map.clearMap()
                this.roundPointLayer.show()
            },
            openInfoWin(map, offsetLoc, content) {
                if (!this.infoWin) {
                    this.infoWin = new AMap.InfoWindow({
                        anchor: 'top-left',
                        autoMove:false,
                        isCustom: true,  //使用自定义窗体
                        offset: new AMap.Pixel(20, 0),
                        closeWhenClickMap:true
                    });
                }

                var x = offsetLoc.offsetX;
                var y = offsetLoc.offsetY;
                var lngLat = map.containerToLngLat(new AMap.Pixel(x, y));

                if (!this.tableDom) {
                    let infoDom = document.createElement('div');
                    infoDom.className = 'info';
                    this.tableDom = document.createElement('table');
                    infoDom.appendChild(this.tableDom);
                    this.infoWin.setContent(infoDom);
                }

                var trStr = '';
                for (var name in content) {
                    var val = content[name];
                    trStr +=
                        '<tr>' +
                            '<td class="label">' + name + '</td>' +
                            '<td>&nbsp;</td>' +
                            '<td class="content">' + val + '</td>' +
                        '</tr>'
                }

                this.tableDom.innerHTML = trStr;
                this.infoWin.open(map, lngLat);
            },
            closeInfoWin() {
                if (this.infoWin) {
                    this.infoWin.close();
                }
            }
         },
        computed:{
            /*areaData(){
                if (this.$store.state.areaData.results) {
                    return this.$store.state.areaData.results
                }
                else {
                    return []
                }
                
            },*/
        }
    }
</script>

<style scoped>
    .mapContainer{
        height:100%;
        position:relative
    }

    #gaodeMap{
        color: white;
        height:100%
    }

    #reset{
        position: absolute;
        top:0;
        right:0;
    }

    .resetMap{
        position: fixed;
        left: 66%;
        top: 90px;
    }
</style>