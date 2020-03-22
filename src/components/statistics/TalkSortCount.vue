<template>
    <div>
        <van-row >
            <van-col span="9" offset="1" style="margin-top: 10px">
                <span >分类占比</span>
            </van-col>
            <canvas id="talkSortCount" ></canvas>
        </van-row>
        <van-row>

        </van-row>
    </div>
</template>

<script>
    import F2 from "@antv/f2/lib/index-all"
    import * as MyApi from '@/api/URLApiAddr.js'
    export default {
        name: "TalkSortCount",
        data() {
            return {
                chart: undefined
            }
        },
        mounted(){
            this.drawData();
        },
        methods: {
            drawData() {
                if(this.chart){
                    this.chart.destroy()
                }
                let params = {sortType:"3"}
                this.$axios.post(MyApi.QRY_REC_SORT_COUNT,params/*,options*/)
                    .then((resp) =>  {

                        if('200' == resp.code){
                            let data = resp.data
                            const chart = new F2.Chart({
                                id: 'talkSortCount',
                                width:window.innerWidth,
                                height:window.innerWidth*3/4,
                                pixelRatio: window.devicePixelRatio
                            });

                            chart.source(data);
                            chart.coord('polar', {
                                transposed: true,
                                radius: 0.75
                            });
                            chart.legend(false);
                            chart.axis(false);
                            chart.tooltip(false);

                            // 添加饼图文本
                            chart.pieLabel({
                                sidePadding: 40,
                                label1: function label1(data, color) {
                                    return {
                                        text: data.type,
                                        fill: color
                                    };
                                },
                                label2: function label2(data) {
                                    return {
                                        text: '' + String(Math.floor(data.count * 100) / 100).replace(/\B(?=(\d{3})+(?!\d))/g, ','),
                                        fill: '#808080',
                                        fontWeight: 'bold'
                                    };
                                }
                            });

                            chart.interval()
                                .position('sortType*count')
                                .color('type', [ 	'#FFD700','#13C2C2','#1890FF', '#2FC25B', '#FACC14', '#F04864','#FF69B4' ])
                                .adjust('stack');
                            chart.render();
                            this.chart = chart;

                        }


                    })
                    .catch((err) => {
                        debugger
                        console.log(err)
                        this.$toast.fail("请求异常,请稍后再试"+err);
                    })



            }
        }
    }
</script>

<style scoped>

</style>
