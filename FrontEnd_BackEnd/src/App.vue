<template>
  <div id="app">
    <loading v-show="isShow" class="loading"></loading>
    <main-frame_test v-show = "!isShow">
      <navHead slot="navHead"></navHead>

      <leftView slot="bodyLeft" :full-height="fullHeight"></leftView>
      <map-view slot = "mapBox" :fullHeight = "fullHeight"></map-view>
      <rightView slot="bodyRight" :full-height="fullHeight"></rightView>
    </main-frame_test>
  </div>
</template>

<script>
  import mainFrame from 'components/common/mainFrame'
  import mainFrame_test from "./components/common/mainFrame_test";
  import navHead from "components/common/navHead/navHead";
  import loading from "./components/common/loading/loading";

  import leftView from "views/leftView/leftView";
  import mapView from "views/mapView/mapView";
  import rightView from "views/rightView/rightView";

  import {getMapArea} from "network/getMapData";

  export default {
    name: "app",
    components:{
      mainFrame,
      mainFrame_test,
      navHead,
      leftView,
      mapView,
      rightView,
      loading
    },
    data(){
      return{
        fullHeight:Number,
        fullWidth:Number,
        isShow:true,
        mapDataArea:Object
      }
    },
    created(){
      this.fullHeight = document.documentElement.clientHeight;
      this.fullWidth = document.documentElement.clientWidth;
      console.log(this.fullHeight);
      console.log(this.fullWidth);
    },
    mounted() {
      this.get_bodyHeight();
      this.getMapData()
    },
    methods: {
      get_bodyHeight() {
        //动态获取浏览器高度
        const that = this;
        window.onresize = () => {
          return (() => {
            window.fullHeight = document.documentElement.clientHeight;
            that.fullHeight = window.fullHeight;
          })();
        };
      },

      getMapData(){
        getMapArea().then(res => {
          // console.log(res);
          this.mapDataArea.results = res.getListByCountryTypeService2true
          let totalConfirmCount = 0
          let totalDeadCount = 0
          let totalCuredCount = 0
          let time = 0
          let arr = this.mapDataArea.results;
          for (let i=arr.length-1; i>=0; i--) {
            totalConfirmCount += arr[i].confirmedCount
            totalDeadCount += arr[i].deadCount
            totalCuredCount += arr[i].curedCount
            if(arr[i].createTime>time){
              time = arr[i].createTime
            }
          }
          let number = {
            totalConfirmCount,totalDeadCount,totalCuredCount,time
          }
          this.mapDataArea.number = number
          // console.log(number);

          this.mapDataArea.results.sort(this.rank)
          this.$store.dispatch('addAreaData',this.mapDataArea).then(res => {
            this.isShow = false
          })
        })
      },
      rank(a,b){
        return b.confirmedCount-a.confirmedCount
      }
    }
  }
</script>

<style>
  @import 'assets/css/base.css';

  .amap-logo{
    display: none;
    opacity:0 !important;
  }
  .amap-copyright {
    opacity:0;
  }
</style>
