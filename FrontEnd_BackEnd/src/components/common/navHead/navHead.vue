<template>
    <div class="navHead">
        <navBar>
            <img src="~assets/img/logo.png" alt="" class="logo" slot="left">
            <span slot="middle">Coronavirus COVID-19 Global Cases</span>
<!--            <img src="~assets/img/head/application.png" alt="" slot="right">-->
            <div slot="right">
                <el-dropdown @command="handleCommand">
                <span class="el-dropdown-link">
                    <img src="~assets/img/head/application.png" alt="" slot="right">
                </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="a">1</el-dropdown-item>
                        <el-dropdown-item command="b">2</el-dropdown-item>
                        <el-dropdown-item command="c">3</el-dropdown-item>
                        <el-dropdown-item command="d" disabled>4</el-dropdown-item>
                        <el-dropdown-item command="e" divided>5</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>

            </div>
        </navBar>
    </div>
</template>

<script>
    import navBar from "components/content/navBar/navBar";
    export default {
        name: "navHead",
        components:{
            navBar
        },
        methods: {
            handleCommand(command) {
                this.$message('click on item ' + command);
            }
        }
    }
</script>

<style scoped>
    .navHead{
        color: #ffffff;
        font-weight:lighter;
        font-size: 24px;
    }
    .navHead img{
        height: 26px;
        margin-top: 10px;
    }
    .el-dropdown-link {
        cursor: pointer;
        color: #409EFF;
    }
    .el-icon-arrow-down {
        font-size: 12px;
    }
</style>