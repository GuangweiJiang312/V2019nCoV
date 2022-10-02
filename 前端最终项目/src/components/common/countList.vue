<template>
    <div>
        <div v-for="item in this.$store.state.areaData.results">
            <countItem :data = item.confirmedCount></countItem>
        </div>
    </div>
</template>

<script>
    import countItem from "./countItem/countItem";
    export default {
        name: "countList",
        countItem
    }
</script>

<style scoped>

</style>