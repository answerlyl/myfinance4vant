<template>
    <div>

        <van-row >
            <van-divider />
            <van-col span="9" offset="1">
                <span >分类占比</span>
            </van-col>
            <van-col span="7" offset="7">
                <van-button :plain="isPlain" type="info" size="mini" round :color="payColor" @click="refreshType(false,12101)">支出</van-button>
                <van-button :plain="!isPlain" type="info" size="mini" round :color="incomeColor" @click="refreshType(true,12100)">收入</van-button>
            </van-col>
        </van-row>
        <van-row>
            <canvas id="finMonthSortPercent" ></canvas>
        </van-row>


    </div>

</template>

<script>
    import F2 from "@antv/f2/lib/index-all"
    import * as MyApi from '@/api/URLApiAddr.js'
    export default {
        name: "FinMonthSort",
        props:{
            searchDate: {
                type: String,
                default: '',
            }
        },
        data() {
            return {
                isPlain: false,
                payColor:'#E1B4AF',
                incomeColor:'#70cdd0',
                mainColor:'#E1B4AF',
                chart: undefined

            };
        },
        watch: {
            searchDate() {
                debugger
                this.isPlain = false
                this.drawData()
            }
        },
        mounted(){
            this.drawData();
        },
        methods: {

            drawData(finType) {
                if(this.chart){
                    this.chart.destroy()
                }
                let params = {month:this.searchDate,finType:finType}
                this.$axios.post(MyApi.QRY_FIN_MONTH_SORT_PERCENT,params/*,options*/)
                    .then((response) =>  {
                        let code = response.code;
                        let data = response.data;
                        debugger
                        if(code == 200){
                            let viewHeight = (window.innerWidth*3/4)
                            const chart = new F2.Chart({
                                id: 'finMonthSortPercent',
                                width:window.innerWidth,
                                height:viewHeight,
                                pixelRatio: window.devicePixelRatio,
                                padding: [40, 'auto', 'auto', 'auto']
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
                                .position('const*money')
                                .adjust('stack')
                                .color('type', [ '#E1B4AF','#FF7F00','#836FFF','#1890FF', '#13C2C2', '#2FC25B', '#FACC14' ]);
                            chart.pieLabel({
                                sidePadding: 30,
                                activeShape: true,
                                label1: function label1(data) {
                                    return {
                                        text: '￥' + data.money,
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

                                        // $('#title').text(data.type);
                                        // $('#money').text(data.money);
                                    }
                                }
                            });
                            this.chart = chart
                            chart.render();
                        }

                    })
                    .catch((err) => {
                        debugger
                        console.log(err)
                        this.$toast.fail("请求异常,请稍后再试"+err);
                    })

            },
            refreshType(flag,finType) {
                if(flag){
                    this.mainColor = this.incomeColor
                }else{
                    this.mainColor = this.payColor
                }
                this.isPlain = flag
                this.drawData(finType)


            }
        }
    }
</script>

<style scoped>

</style>
