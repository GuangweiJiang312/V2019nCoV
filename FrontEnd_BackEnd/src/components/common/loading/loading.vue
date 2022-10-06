<template>
    <div class="loading">
        <img src="./load.png" alt="">
    </div>
</template>

<script>
    export default {
        name: "loading"
    }
</script>

<style scoped>
    .loading{
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        text-align: center;
        background-color: white;
        z-index: 9;
    }
    .loading img{
        height: 60px;
        animation: load 2s infinite;
        position:absolute;
        top:0;
        bottom:0;
        left:0;
        right:0;
        margin:auto;
    }

    @keyframes load{
        from{
            transform: rotate(0deg);
        }
        to{
            transform: rotate(360deg);
        }
    }
</style>