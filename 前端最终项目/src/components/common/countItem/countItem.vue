<template>
    <div>
        <div v-for="item in data" slot="content">
            <div class = des-content>
                <span class="content-num">{{item.confirmedCount}}</span>
                <span class="content-name">{{item.provinceEnglishName}}</span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "countItem",
        props:{
            data:Number,
            name:String
        }
    }
</script>

<style scoped>
    .des-content{
        padding-top: 14px;
        padding-bottom: 14px;
        border-bottom: #555 solid 1px;
        font-size: 16px;
    }
    .content-name{
        font-weight: lighter;
    }
    .content-num{
        color: red;
        padding-left: 50px;
        padding-right: 20px;
    }
</style>