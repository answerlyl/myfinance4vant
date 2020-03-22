<template>
    <div>
        <van-row >
            <van-col span="9" offset="1" style="margin-top: 10px">
                <span >每月发送条数统计</span>
            </van-col>
            <canvas id="recordMonthCount" ></canvas>
        </van-row>
        <van-row>

        </van-row>
    </div>
</template>

<script>
    import F2 from "@antv/f2/lib/index-all"
    import * as MyApi from '@/api/URLApiAddr.js'
    export default {
        name: "RecordMonthCount",
        data() {
            return {
                chart: undefined
            }
        },
        mounted(){
            this.drawData();
        },
        methods :{
            drawData() {

                if(this.chart){
                    this.chart.destroy()
                }
                let params = {}
                this.$axios.post(MyApi.QRY_REC_MONTH_COUNT,params/*,options*/)
                    .then((resp) =>  {
                        if('200' == resp.code){
                            let data = resp.data

                            const originDates = [];
                            const originSteps = [];
                            //const firstDayArr = [];
                            let i = 0;
                            data.forEach(function(obj) {
                                if(i >= data.length-10){
                                    originDates.push(obj.month);
                                    //originSteps.push(obj.steps);
                                }
                                i ++
                            });

                            const chart = new F2.Chart({
                                id: 'recordMonthCount',
                                width:window.innerWidth,
                                height:window.innerWidth*3/4,
                                pixelRatio: window.devicePixelRatio
                            });
                            chart.source(data, {
                                month:{
                                    type: 'timeCat',
                                    //tickCount: 1,
                                    values: originDates,
                                    mask: 'YY-MM'

                                }

                            });
                            chart.axis('month', {
                                tickLine: {
                                    length: 4,
                                    stroke: '#cacaca'
                                },
                                label: {
                                    fill: '#cacaca'
                                },
                                line: {
                                    top: true
                                }
                            });
                            chart.axis('recCount', {
                                position: 'right',
                                grid: {
                                    stroke: '#d1d1d1'
                                }
                            });
                            chart.legend({
                                align: 'center',
                                itemWidth: null // 图例项按照实际宽度渲染
                            });


                            chart.tooltip({
                                showItemMarker: true,
                                showCrosshairs: true,
                                alwaysShow: true,
                                background: {
                                    radius: 2,
                                    padding: [ 3, 5 ]
                                },
                                onShow: function onShow(ev) {
                                    debugger
                                    const items = ev.items;
                                    items[0].name = '';
                                    items[0].value = items[0].value + '';
                                    items[1].name = '';
                                    items[1].value = items[1].value + '';
                                }
                            });

                            // 定义进度条
                            chart.scrollBar({
                                mode: 'x',
                                xStyle: {
                                    backgroundColor: '#e8e8e8',
                                    fillerColor: '#808080',
                                    offsetY: -2
                                }
                            });
                            chart.interval()
                                .position('month*recCount')
                                .color('name',['#CDC9C9','#EEB4B4'])
                                .adjust('stack');
                            chart.interaction('interval-select', {
                                unSelectStyle:{
                                    fillOpacity: 1
                                },
                                onEnd(ev) {
                                    debugger
                                    try{
                                        const { data} = ev;
                                        debugger
                                        let point = chart.getPosition(data); // 获取该数据的画布坐标
                                        chart.showTooltip(point);
                                    }catch (e) {

                                    }
                                    // ev: Object 类型, 该对象包含的重要属性如下：
                                    // ev.data: Object 类型，被选中图形的原始数据
                                    // ev.shapeInfo: Object 类型，被选中图形的数据信息
                                    // ev.selected: 当前 shape 的选中状态

                                }
                            });
                            chart.interaction('pan');
                            chart.render();
                            this.chart = chart;
                        }


                    })
                    .catch((err) => {
                        debugger
                        console.log(err)
                        this.$toast.fail("请求异常,请稍后再试"+err);
                    })





                // const data = [{
                //     name: '哥哥',
                //     month: '2019-01',
                //     recCount: 18.9
                // }, {
                //     name: '哥哥',
                //     month: '2019-02',
                //     recCount: 28.8
                // }, {
                //     name: '哥哥',
                //     month: '2019-03',
                //     recCount: 39.3
                // }, {
                //     name: '哥哥',
                //     month: '2019-04',
                //     recCount: 81.4
                // }, {
                //     name: '哥哥',
                //     month: '2019-05',
                //     recCount: 47
                // }, {
                //     name: '哥哥',
                //     month: '2019-06',
                //     recCount: 20.3
                // }, {
                //     name: '哥哥',
                //     month: '2019-07',
                //     recCount: 24
                // }, {
                //     name: '哥哥',
                //     month: '2019-08',
                //     recCount: 35.6
                // }, {
                //     name: '靖宝',
                //     month: '2019-01',
                //     recCount: 12.4
                // }, {
                //     name: '靖宝',
                //     month: '2019-02',
                //     recCount: 23.2
                // }, {
                //     name: '靖宝',
                //     month: '2019-03',
                //     recCount: 34.5
                // }, {
                //     name: '靖宝',
                //     month: '2019-04',
                //     recCount: 99.7
                // }, {
                //     name: '靖宝',
                //     month: '2019-05',
                //     recCount: 52.6
                // }, {
                //     name: '靖宝',
                //     month: '2019-06',
                //     recCount: 35.5
                // }, {
                //     name: '靖宝',
                //     month: '2019-07',
                //     recCount: 37.4
                // }, {
                //     name: '靖宝',
                //     month: '2019-08',
                //     recCount: 42.4
                // }];
                //
                // const originDates1 = ['2019-06', '2019-07','2019-08'];


            }
        }
    }
</script>

<style scoped>

</style>
