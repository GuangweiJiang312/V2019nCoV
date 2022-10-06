<template>
    <div class="frame">
        <el-row>
            <el-col :span="24"><div class="grid-content head">
                <slot name = "navHead"></slot>
            </div></el-col>
        </el-row>
        <el-row  :gutter = 6>
            <el-col :span="4"><div class="grid-content">
                <slot name = "bodyLeft"></slot>
            </div></el-col>
            <el-col :span="13"><div class="grid-content">
                <slot name = "mapBox"></slot>
            </div></el-col>
            <el-col :span="7"><div class="grid-content">
                <slot name = "bodyRight"></slot>
            </div></el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "mainFrame"
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
    .grid-content {
        min-height: 36px;
        background-color: #222;
    }
</style>