<template>
    <div>
        <van-row >
            <van-col span="9" offset="1">
                <span >收支对比</span>
            </van-col>
            <van-col span="7" offset="7">
                <van-button :plain="isPlain" type="info" size="mini" round :color="payColor" @click="refreshType(false,12101)">支出</van-button>
                <van-button :plain="!isPlain" type="info" size="mini" round :color="incomeColor" @click="refreshType(true,12100)">收入</van-button>
            </van-col>
        </van-row>
        <div :style="{width: comWidth+'px',height:comHeight +'px'}">
            <canvas id="finDayCountCan" ></canvas>
        </div>
        <van-row>
            <fin-sort-line :day="sortDay" :fin-type="sortFinType"></fin-sort-line>
        </van-row>

    </div>

</template>

<script>
    import F2 from "@antv/f2/lib/index-all"
    import FinSortLine from "./FinSortLine";
    import * as MyApi from '../../api/URLApiAddr.js'
    import * as MyUtil from '../../common/utils/dateUtil.js'
    export default {
        name: "FinDayCount",
        components: {
            FinSortLine
        },
        props:{
            searchDate: {
                type: String,
                default: ''
            }
        },
        data() {
            return {
                isPlain: false,
                payColor:'#E1B4AF',
                incomeColor:'#70cdd0',
                mainColor:'#E1B4AF',
                chart: undefined,
                comWidth:window.innerWidth,
                comHeight:window.innerWidth*3/4,
                sortDay:'',
                sortFinType:12101
            };
        },
        watch: {
            searchDate() {
                debugger
                this.drawData()
            },
            sortDay(){
                debugger
                let x = 100;
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
                let thiz = this
                let params = {date:this.searchDate,finType:finType}
                this.$axios.post(MyApi.QRY_FIN_DAY_COUNT,params/*,options*/)
                    .then((response) =>  {
                        let code = response.code;
                        let data = response.data;
                        debugger
                        if(code == 200){
                            const originDates = [];
                            const originSteps = [];
                            const firstDayArr = [];
                            let i = 0;
                            data.forEach(function(obj) {
                                if(i >= data.length-10){
                                    originDates.push(obj.date);
                                    originSteps.push(obj.steps);
                                }
                                i ++

                                if (obj.first) {
                                    firstDayArr.push(obj);
                                }
                            });

                            const chart = new F2.Chart({
                                id: 'finDayCountCan',
                                width: this.comWidth,
                                height: this.comHeight,
                                pixelRatio: window.devicePixelRatio
                            });

                            chart.source(data, {
                                date: {
                                    type: 'timeCat',
                                    tickCount: 5,
                                    values: originDates,
                                    mask: 'MM-DD'
                                },
                                steps: {
                                    tickCount: 5
                                }
                            });

                            chart.axis('date', {
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
                            chart.axis('steps', {
                                position: 'right',
                                label: function label(text) {
                                    return {
                                        text: MyUtil.formatNumber(text * 1),
                                        fill: '#cacaca'
                                    };
                                },

                                grid: {
                                    stroke: '#d1d1d1'
                                }
                            });
                            chart.legend({
                                align: 'center',
                                itemWidth: null // 图例项按照实际宽度渲染
                            });
                            chart.tooltip({
                                showItemMarker: false,
                                showCrosshairs: true,
                                alwaysShow: true,
                                background: {
                                    radius: 2,
                                    padding: [ 3, 5 ]
                                },
                                onShow: function onShow(ev) {
                                    const items = ev.items;
                                    items[0].name = '';
                                    items[0].value = '￥' + items[0].value + '';
                                }
                            });
                            chart.interval().position('date*steps').style({
                                radius: [ 2, 2, 0, 0 ]
                            }).color(this.mainColor);

                            // firstDayArr.forEach(function(obj) {
                            //     chart.guide().line({
                            //         top: false,
                            //         start: [ obj.date, 'min' ],
                            //         end: [ obj.date, 'max' ],
                            //         style: {
                            //             lineWidth: 1,
                            //             stroke: '#A4A4A4'
                            //         }
                            //     });
                            //     chart.guide().text({
                            //         position: [ obj.date, 'max' ],
                            //         content: obj.date,
                            //         style: {
                            //             textAlign: 'start',
                            //             fill: '#cacaca',
                            //             textBaseline: 'top'
                            //         },
                            //         offsetX: 5,
                            //         offsetY: 5
                            //     });
                            // });
                            // 定义进度条
                            chart.scrollBar({
                                mode: 'x',
                                xStyle: {
                                    backgroundColor: '#e8e8e8',
                                    fillerColor: '#808080',
                                    offsetY: -2
                                }
                            });
                            chart.interaction('pan');
                            chart.interaction('interval-select', {
                                onEnd(ev) {
                                    try{
                                        const { data} = ev;
                                        debugger
                                        thiz.sortDay = data.date;
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
                this.sortFinType = finType
                this.drawData(finType)


            }
        }
    }
</script>

<style scoped>

</style>
