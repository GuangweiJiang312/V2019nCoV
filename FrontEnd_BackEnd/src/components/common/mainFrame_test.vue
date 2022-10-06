<template>
    <div class="frame">
        <el-row>
            <el-col :span="24"><div class="grid-content head">
                <slot name = "navHead"></slot>
            </div></el-col>
        </el-row>
        <el-row  :gutter = 6>
            <div class="grid-content-left">
                <slot name = "bodyLeft"></slot>
            </div>
            <el-col :span="24"><div class="grid-content">
                <slot name = "mapBox"></slot>
            </div></el-col>
            <div class="grid-content-right">
                <slot name = "bodyRight"></slot>
            </div>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "mainFrame_test"
    }
</script>

<style scoped>
    .frame{
        margin-top: 10px;
        margin-left: 6px;
        margin-right: 6px;
    }

    .el-row {
        margin-bottom: 10px;
        /*margin-top: 10px;*/
    }
    .grid-content-left {
        z-index: 10;
        position: fixed;
        top: 60px;
        left: 10px;
        min-height: 36px;
        width: 16.6%;
        background-color: rgba(0,0,0,0.2);
    }

    .grid-content-right {
        z-index: 10;
        position: fixed;
        top: 60px;
        right: 10px;
        min-height: 36px;
        background-color: rgba(0,0,0,0.2);
        width : 29.1%
    }
</style>