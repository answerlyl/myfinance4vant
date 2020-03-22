<template>
    <div>
        <van-divider />
        <record-month-count></record-month-count>
        <van-divider />
        <talk-sort-count></talk-sort-count>
        <van-divider />
        <record-count></record-count>
        <van-divider />
        <font-count></font-count>
        <van-divider />
        <week-hour-hot></week-hour-hot>
        <div style="margin-bottom: 100px"></div>
    </div>

</template>

<script>
    import RecordCount from "./RecordCount";
    import FontCount from "./FontCount";
    import WeekHourHot from "./WeekHourHot";
    import TalkSortCount from "./TalkSortCount";
    import RecordMonthCount from "./RecordMonthCount";
    export default {
        name: "TalkStatistics",
        components: {
            RecordCount,
            FontCount,
            WeekHourHot,
            TalkSortCount,
            RecordMonthCount
        }
    }
</script>

<style scoped>

</style>
