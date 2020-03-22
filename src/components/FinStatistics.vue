<template>

    <div>
        <van-nav-bar :title="title" >
        </van-nav-bar>
        <van-tabs v-model="active" sticky>
            <van-tab  title="日统计">
                <fin-day-statistics></fin-day-statistics>
            </van-tab>
            <van-tab  title="月统计">
                <fin-month-statistics></fin-month-statistics>
            </van-tab>
            <van-tab  title="聊天统计">
                <talk-statistics></talk-statistics>
            </van-tab>
        </van-tabs>
    </div>

</template>

<script>

    import FinDayStatistics from "./statistics/FinDayStatistics";
    import FinMonthStatistics from "./statistics/FinMonthStatistics";
    import TalkStatistics from "./statistics/TalkStatistics";
    export default {
        name: "FinStatistics",
        components: {
            FinMonthStatistics,
            FinDayStatistics,
            TalkStatistics
        },
        data(){
            return {
                title:'统计',
                active:0

            }
        }



    }
</script>

<style scoped>

</style>
