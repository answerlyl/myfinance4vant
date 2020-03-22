<template>

    <div>
        <van-row >
            <van-col span="9" offset="1" style="margin-top: 10px">
                <span >字数占比</span>
            </van-col>
            <canvas id="talkFontCount" ></canvas>
        </van-row>
        <van-row>

        </van-row>
    </div>
</template>

<script>
    import F2 from "@antv/f2/lib/index-all"
    import * as MyApi from '@/api/URLApiAddr.js'
    export default {
        name: "FontCount",
        mounted(){
            this.drawData();
        },
        methods: {
            drawData() {
                // const data = [{
                //     sortType: '2',
                //     type: '靖宝',
                //     count: 1011691
                // }, {
                //     sortType: '2',
                //     type: '哥哥',
                //     count: 943709
                // }];
                if(this.chart){
                    this.chart.destroy()
                }
                let params = {sortType:"2"}
                this.$axios.post(MyApi.QRY_REC_SORT_COUNT,params/*,options*/)
                    .then((resp) =>  {
                        if('200' == resp.code){
                            let data = resp.data
                            const chart = new F2.Chart({
                                id: 'talkFontCount',
                                width:window.innerWidth,
                                height:window.innerWidth*3/4,
                                pixelRatio: window.devicePixelRatio
                            });
                            chart.source(data);
                            chart.coord('polar', {
                                transposed: true,
                                radius: 0.9,
                                innerRadius: 0.5
                            });
                            chart.axis(false);
                            chart.legend(false);
                            chart.tooltip(false);
                            chart.guide()
                                .html({
                                    position: [ '50%', '50%' ],
                                    html: '<div style="text-align: center;width:150px;height: 50px;">\n      <p style="font-size: 12px;color: #999;margin: 0" id="title"></p>\n      <p style="font-size: 18px;color: #343434;margin: 0;font-weight: bold;" id="money"></p>\n      </div>'
                                });
                            chart.interval()
                                .position('sortType*count')
                                .adjust('stack')
                                .color('type', [ '#FFC0CB', '#13C2C2' ]);
                            chart.pieLabel({
                                sidePadding: 30,
                                activeShape: true,
                                label1: function label1(data) {
                                    return {
                                        text:  data.count,
                                        fill: '#343434',
                                        fontWeight: 'bold'
                                    };
                                },
                                label2: function label2(data) {
                                    return {
                                        text: data.type,
                                        fill: '#999'
                                    };
                                },
                                onClick: function onClick(ev) {
                                    const data = ev.data;
                                    if (data) {

                                    }
                                }
                            });
                            chart.render();
                            this.chart = chart
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
