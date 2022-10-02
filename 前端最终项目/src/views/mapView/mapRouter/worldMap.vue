<template>
    <div class="mapContainer">
        <div class="map-area" id="mapworld"></div>
        <el-button v-on:click="resetMap" id="reset" type='info' icon='el-icon-full-screen' plain class = "resetMap"></el-button>
    </div>
</template>
<script>
    import echarts from 'echarts/lib/echarts';
    import 'echarts/map/js/world.js';
    import {getMapArea} from "network/getMapData";
    import {results} from "assets/json/countryCE.json"
    import {world_local} from 'assets/json/world_location.json'
    import axios from 'axios'
    import 'assets/css/infoWin.css'

    export default {
        data() {
            return {
                map:null,
                roundPointLayer:null,
                infoWin:null,
                tableDom:null
            }
        },
        mounted(){
            axios.get('http://106.52.187.27:8089/api/worldData').then(res => {
                this.initMap()
                this.initRoundPointLayer(res)
            })

        },
        methods:{
            initMap() {
                this.map = new AMap.Map('mapworld', {
                    mapStyle: 'amap://styles/dark',
                    defaultCursor:'default',
                    viewMode:'3D',
                    zoom: 1,
                    center: [116.23,39.54],
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
                res.data.getListByCountryTypeService2true.forEach(item => {
                    mapData.push({
                        lng: world_local[item.countryFullName][0],
                        lat: world_local[item.countryFullName][1],
                        lnglat: world_local[item.countryFullName],
                        name: item.provinceName,
                        confirmedCount: item.confirmedCount,
                        curedCount: item.curedCount,
                        deadCount: item.deadCount
                })
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
                            if(confirmedCount<100) {return 5}
                            else if(confirmedCount<500) {return 8}
                            else if(confirmedCount<1000) {return 10}
                            else if(confirmedCount<10000) {return 15}
                            else if(confirmedCount<25000) {return 20}
                            else if(confirmedCount<50000) {return 25}
                            else if(confirmedCount<100000) {return 30}
                            else if(confirmedCount<500000) {return 40}
                            else {return 50}
                        },
                        color: '#800000',
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
                
                this.roundPointLayer.render()

                this.$bus.$on('clickItem',item => {
                    var countryName=item.provinceName
                    var lnglat
                    for (var i=0;i<mapData.length;i++) {
                        if(mapData[i].name==countryName) {
                            lnglat=mapData[i].lnglat
                            break
                        }
                    }
                    this.map.setZoomAndCenter(5,lnglat)
                })
            },
            resetMap() {
                this.map.setZoomAndCenter(1,[116.23,39.54])
                this.map.setPitch(0)
                this.roundPointLayer.show()
            },
            openInfoWin(map, event, content) {
                if (!this.infoWin) {
                    this.infoWin = new AMap.InfoWindow({
                    autoMove:false,
                        isCustom: true,  //使用自定义窗体
                        offset: new AMap.Pixel(130, 100)
                    });
                }

                var x = event.offsetX;
                var y = event.offsetY;
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
        }
    }
</script>
<style scoped>
    .mapContainer{
        height:100%;
        position:relative
    }

    .map-area {
        width: 100%;
        height: 100%;
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
