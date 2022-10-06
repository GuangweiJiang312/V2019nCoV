<template>
    <div>
        <div class = mapBox :style="{height:mapHeight+'px'}">
            <keep-alive>
                <router-view></router-view>
            </keep-alive>
        </div>

        <div class = "tabBar">
            <tabControl :tabItem="['WorldMap','ChinaMap','donationsMap']"
                        class="tabControl" @tabClick = "tabClick" ref = "tabControl" :height=30 :width=450
            />

            <scroll class="inf-our" :rollHeight = 62>
                <div slot="content" class="content">
                    <span>Learn style from </span>
                    <a href="https://gisanddata.maps.arcgis.com/apps/opsdashboard/index.html#/">
                        <span>Coronavirus COVID-19 Global Cases by Johns Hopkins CSSE</span>
                    </a>
                    <br>
                    <span>Data: </span><a href="https://ncov.dxy.cn/ncovh5/view/pneumonia"><span>https://ncov.dxy.cn/ncovh5/view/pneumonia</span></a>
                </div>
            </scroll>
        </div>

    </div>
</template>

<script>
    import tabControl from "components/content/tabControl/tabControl";
    import scroll from "components/common/scroll/scroll";

    export default {
        name: "mapView",
        components:{
            tabControl,scroll
        },
        props:{
          fullHeight:Number
        },
        computed:{
          mapHeight(){
              return this.fullHeight - 90
          }
        },
        data(){
          return{
              show:true,
              mapDataArea:{}
          }
        },
        mounted(){

        },
        methods:{
            tabClick(index){
                switch (index) {
                    case 0:
                        this.show = true
                        this.$router.push('/worldMap')
                        break
                    case 1:
                        this.show = true
                        this.$router.push('/chinaMap')
                        break
                    case 2:
                        this.show = true
                        this.$router.push('/donationsMap')
                        break
                }
            }
        }
    }
</script>

<style scoped>
    .mapBox{
        /*height: 500px;*/
        background-color: black;
    }

    .mapBox img{
        width: 100%;
        height: 100%;
        display: block;
    }

    .inf-our{
        color: white;
        border-top: #000 solid 10px;
        font-size: 12px;
        font-weight: lighter;
    }

    .content{
        padding: 10px;
        font-size: 10px;
    }

    .content span{
        line-height: 24px;
    }

    .content a{
        color: #0195f3;
        text-decoration:none
    }

    .tabBar{
        position: fixed;
        bottom: 6px;
        left: 16.6%;
        right: 29.1%;
        background-color: rgba(0,0,0,0.2);
    }
</style>