<template>
    <div>
        <van-row >
            <van-col span="9" offset="1" style="margin-top: 10px">
                <span >星期-小时热力图</span>
            </van-col>
            <canvas id="weekHourCount" ></canvas>
        </van-row>
    </div>

</template>

<script>
    import F2 from "@antv/f2/lib/index-all"
    import * as MyApi from '@/api/URLApiAddr.js'
    export default {
        name: "WeekHourHot",
        data() {
            return {
                cntData: [
                    {
                        "week": "Monday",
                        "time": "Midnight",
                        "value": 498
                    },
                    {
                        "week": "Monday",
                        "time": "1am",
                        "value": 75
                    },
                    {
                        "week": "Monday",
                        "time": "2am",
                        "value": 0
                    },
                    {
                        "week": "Monday",
                        "time": "3am",
                        "value": 0
                    },
                    {
                        "week": "Monday",
                        "time": "4am",
                        "value": 2
                    },
                    {
                        "week": "Monday",
                        "time": "5am",
                        "value": 6
                    },
                    {
                        "week": "Monday",
                        "time": "6am",
                        "value": 140
                    },
                    {
                        "week": "Monday",
                        "time": "7am",
                        "value": 355
                    },
                    {
                        "week": "Monday",
                        "time": "8am",
                        "value": 539
                    },
                    {
                        "week": "Monday",
                        "time": "9am",
                        "value": 726
                    },
                    {
                        "week": "Monday",
                        "time": "10am",
                        "value": 574
                    },
                    {
                        "week": "Monday",
                        "time": "11am",
                        "value": 888
                    },
                    {
                        "week": "Monday",
                        "time": "Midday",
                        "value": 1371
                    },
                    {
                        "week": "Monday",
                        "time": "1pm",
                        "value": 460
                    },
                    {
                        "week": "Monday",
                        "time": "2pm",
                        "value": 772
                    },
                    {
                        "week": "Monday",
                        "time": "3pm",
                        "value": 706
                    },
                    {
                        "week": "Monday",
                        "time": "4pm",
                        "value": 803
                    },
                    {
                        "week": "Monday",
                        "time": "5pm",
                        "value": 806
                    },
                    {
                        "week": "Monday",
                        "time": "6pm",
                        "value": 1068
                    },
                    {
                        "week": "Monday",
                        "time": "7pm",
                        "value": 733
                    },
                    {
                        "week": "Monday",
                        "time": "8pm",
                        "value": 936
                    },
                    {
                        "week": "Monday",
                        "time": "9pm",
                        "value": 1153
                    },
                    {
                        "week": "Monday",
                        "time": "10pm",
                        "value": 1649
                    },
                    {
                        "week": "Monday",
                        "time": "11pm",
                        "value": 935
                    },
                    {
                        "week": "Tuesday",
                        "time": "Midnight",
                        "value": 113
                    },
                    {
                        "week": "Tuesday",
                        "time": "1am",
                        "value": 35
                    },
                    {
                        "week": "Tuesday",
                        "time": "2am",
                        "value": 15
                    },
                    {
                        "week": "Tuesday",
                        "time": "3am",
                        "value": 0
                    },
                    {
                        "week": "Tuesday",
                        "time": "4am",
                        "value": 2
                    },
                    {
                        "week": "Tuesday",
                        "time": "5am",
                        "value": 1
                    },
                    {
                        "week": "Tuesday",
                        "time": "6am",
                        "value": 79
                    },
                    {
                        "week": "Tuesday",
                        "time": "7am",
                        "value": 351
                    },
                    {
                        "week": "Tuesday",
                        "time": "8am",
                        "value": 659
                    },
                    {
                        "week": "Tuesday",
                        "time": "9am",
                        "value": 1240
                    },
                    {
                        "week": "Tuesday",
                        "time": "10am",
                        "value": 665
                    },
                    {
                        "week": "Tuesday",
                        "time": "11am",
                        "value": 903
                    },
                    {
                        "week": "Tuesday",
                        "time": "Midday",
                        "value": 1477
                    },
                    {
                        "week": "Tuesday",
                        "time": "1pm",
                        "value": 597
                    },
                    {
                        "week": "Tuesday",
                        "time": "2pm",
                        "value": 775
                    },
                    {
                        "week": "Tuesday",
                        "time": "3pm",
                        "value": 747
                    },
                    {
                        "week": "Tuesday",
                        "time": "4pm",
                        "value": 902
                    },
                    {
                        "week": "Tuesday",
                        "time": "5pm",
                        "value": 751
                    },
                    {
                        "week": "Tuesday",
                        "time": "6pm",
                        "value": 964
                    },
                    {
                        "week": "Tuesday",
                        "time": "7pm",
                        "value": 997
                    },
                    {
                        "week": "Tuesday",
                        "time": "8pm",
                        "value": 945
                    },
                    {
                        "week": "Tuesday",
                        "time": "9pm",
                        "value": 1265
                    },
                    {
                        "week": "Tuesday",
                        "time": "10pm",
                        "value": 1475
                    },
                    {
                        "week": "Tuesday",
                        "time": "11pm",
                        "value": 903
                    },
                    {
                        "week": "Wednesday",
                        "time": "Midnight",
                        "value": 153
                    },
                    {
                        "week": "Wednesday",
                        "time": "1am",
                        "value": 16
                    },
                    {
                        "week": "Wednesday",
                        "time": "2am",
                        "value": 5
                    },
                    {
                        "week": "Wednesday",
                        "time": "3am",
                        "value": 18
                    },
                    {
                        "week": "Wednesday",
                        "time": "4am",
                        "value": 35
                    },
                    {
                        "week": "Wednesday",
                        "time": "5am",
                        "value": 1
                    },
                    {
                        "week": "Wednesday",
                        "time": "6am",
                        "value": 99
                    },
                    {
                        "week": "Wednesday",
                        "time": "7am",
                        "value": 234
                    },
                    {
                        "week": "Wednesday",
                        "time": "8am",
                        "value": 649
                    },
                    {
                        "week": "Wednesday",
                        "time": "9am",
                        "value": 1074
                    },
                    {
                        "week": "Wednesday",
                        "time": "10am",
                        "value": 1033
                    },
                    {
                        "week": "Wednesday",
                        "time": "11am",
                        "value": 1079
                    },
                    {
                        "week": "Wednesday",
                        "time": "Midday",
                        "value": 1489
                    },
                    {
                        "week": "Wednesday",
                        "time": "1pm",
                        "value": 578
                    },
                    {
                        "week": "Wednesday",
                        "time": "2pm",
                        "value": 591
                    },
                    {
                        "week": "Wednesday",
                        "time": "3pm",
                        "value": 658
                    },
                    {
                        "week": "Wednesday",
                        "time": "4pm",
                        "value": 851
                    },
                    {
                        "week": "Wednesday",
                        "time": "5pm",
                        "value": 710
                    },
                    {
                        "week": "Wednesday",
                        "time": "6pm",
                        "value": 842
                    },
                    {
                        "week": "Wednesday",
                        "time": "7pm",
                        "value": 676
                    },
                    {
                        "week": "Wednesday",
                        "time": "8pm",
                        "value": 692
                    },
                    {
                        "week": "Wednesday",
                        "time": "9pm",
                        "value": 965
                    },
                    {
                        "week": "Wednesday",
                        "time": "10pm",
                        "value": 1517
                    },
                    {
                        "week": "Wednesday",
                        "time": "11pm",
                        "value": 918
                    },
                    {
                        "week": "Thursday",
                        "time": "Midnight",
                        "value": 193
                    },
                    {
                        "week": "Thursday",
                        "time": "1am",
                        "value": 2
                    },
                    {
                        "week": "Thursday",
                        "time": "2am",
                        "value": 11
                    },
                    {
                        "week": "Thursday",
                        "time": "3am",
                        "value": 3
                    },
                    {
                        "week": "Thursday",
                        "time": "4am",
                        "value": 0
                    },
                    {
                        "week": "Thursday",
                        "time": "5am",
                        "value": 0
                    },
                    {
                        "week": "Thursday",
                        "time": "6am",
                        "value": 95
                    },
                    {
                        "week": "Thursday",
                        "time": "7am",
                        "value": 273
                    },
                    {
                        "week": "Thursday",
                        "time": "8am",
                        "value": 634
                    },
                    {
                        "week": "Thursday",
                        "time": "9am",
                        "value": 1221
                    },
                    {
                        "week": "Thursday",
                        "time": "10am",
                        "value": 668
                    },
                    {
                        "week": "Thursday",
                        "time": "11am",
                        "value": 763
                    },
                    {
                        "week": "Thursday",
                        "time": "Midday",
                        "value": 1229
                    },
                    {
                        "week": "Thursday",
                        "time": "1pm",
                        "value": 579
                    },
                    {
                        "week": "Thursday",
                        "time": "2pm",
                        "value": 956
                    },
                    {
                        "week": "Thursday",
                        "time": "3pm",
                        "value": 967
                    },
                    {
                        "week": "Thursday",
                        "time": "4pm",
                        "value": 1087
                    },
                    {
                        "week": "Thursday",
                        "time": "5pm",
                        "value": 886
                    },
                    {
                        "week": "Thursday",
                        "time": "6pm",
                        "value": 1109
                    },
                    {
                        "week": "Thursday",
                        "time": "7pm",
                        "value": 833
                    },
                    {
                        "week": "Thursday",
                        "time": "8pm",
                        "value": 833
                    },
                    {
                        "week": "Thursday",
                        "time": "9pm",
                        "value": 1302
                    },
                    {
                        "week": "Thursday",
                        "time": "10pm",
                        "value": 1505
                    },
                    {
                        "week": "Thursday",
                        "time": "11pm",
                        "value": 657
                    },
                    {
                        "week": "Friday",
                        "time": "Midnight",
                        "value": 104
                    },
                    {
                        "week": "Friday",
                        "time": "1am",
                        "value": 64
                    },
                    {
                        "week": "Friday",
                        "time": "2am",
                        "value": 17
                    },
                    {
                        "week": "Friday",
                        "time": "3am",
                        "value": 15
                    },
                    {
                        "week": "Friday",
                        "time": "4am",
                        "value": 0
                    },
                    {
                        "week": "Friday",
                        "time": "5am",
                        "value": 0
                    },
                    {
                        "week": "Friday",
                        "time": "6am",
                        "value": 110
                    },
                    {
                        "week": "Friday",
                        "time": "7am",
                        "value": 353
                    },
                    {
                        "week": "Friday",
                        "time": "8am",
                        "value": 675
                    },
                    {
                        "week": "Friday",
                        "time": "9am",
                        "value": 1201
                    },
                    {
                        "week": "Friday",
                        "time": "10am",
                        "value": 368
                    },
                    {
                        "week": "Friday",
                        "time": "11am",
                        "value": 825
                    },
                    {
                        "week": "Friday",
                        "time": "Midday",
                        "value": 1070
                    },
                    {
                        "week": "Friday",
                        "time": "1pm",
                        "value": 477
                    },
                    {
                        "week": "Friday",
                        "time": "2pm",
                        "value": 596
                    },
                    {
                        "week": "Friday",
                        "time": "3pm",
                        "value": 564
                    },
                    {
                        "week": "Friday",
                        "time": "4pm",
                        "value": 850
                    },
                    {
                        "week": "Friday",
                        "time": "5pm",
                        "value": 865
                    },
                    {
                        "week": "Friday",
                        "time": "6pm",
                        "value": 664
                    },
                    {
                        "week": "Friday",
                        "time": "7pm",
                        "value": 385
                    },
                    {
                        "week": "Friday",
                        "time": "8pm",
                        "value": 686
                    },
                    {
                        "week": "Friday",
                        "time": "9pm",
                        "value": 987
                    },
                    {
                        "week": "Friday",
                        "time": "10pm",
                        "value": 1241
                    },
                    {
                        "week": "Friday",
                        "time": "11pm",
                        "value": 964
                    },
                    {
                        "week": "Saturday",
                        "time": "Midnight",
                        "value": 606
                    },
                    {
                        "week": "Saturday",
                        "time": "1am",
                        "value": 28
                    },
                    {
                        "week": "Saturday",
                        "time": "2am",
                        "value": 3
                    },
                    {
                        "week": "Saturday",
                        "time": "3am",
                        "value": 1
                    },
                    {
                        "week": "Saturday",
                        "time": "4am",
                        "value": 4
                    },
                    {
                        "week": "Saturday",
                        "time": "5am",
                        "value": 45
                    },
                    {
                        "week": "Saturday",
                        "time": "6am",
                        "value": 38
                    },
                    {
                        "week": "Saturday",
                        "time": "7am",
                        "value": 123
                    },
                    {
                        "week": "Saturday",
                        "time": "8am",
                        "value": 269
                    },
                    {
                        "week": "Saturday",
                        "time": "9am",
                        "value": 719
                    },
                    {
                        "week": "Saturday",
                        "time": "10am",
                        "value": 676
                    },
                    {
                        "week": "Saturday",
                        "time": "11am",
                        "value": 656
                    },
                    {
                        "week": "Saturday",
                        "time": "Midday",
                        "value": 592
                    },
                    {
                        "week": "Saturday",
                        "time": "1pm",
                        "value": 443
                    },
                    {
                        "week": "Saturday",
                        "time": "2pm",
                        "value": 272
                    },
                    {
                        "week": "Saturday",
                        "time": "3pm",
                        "value": 204
                    },
                    {
                        "week": "Saturday",
                        "time": "4pm",
                        "value": 243
                    },
                    {
                        "week": "Saturday",
                        "time": "5pm",
                        "value": 284
                    },
                    {
                        "week": "Saturday",
                        "time": "6pm",
                        "value": 568
                    },
                    {
                        "week": "Saturday",
                        "time": "7pm",
                        "value": 299
                    },
                    {
                        "week": "Saturday",
                        "time": "8pm",
                        "value": 555
                    },
                    {
                        "week": "Saturday",
                        "time": "9pm",
                        "value": 746
                    },
                    {
                        "week": "Saturday",
                        "time": "10pm",
                        "value": 922
                    },
                    {
                        "week": "Saturday",
                        "time": "11pm",
                        "value": 1132
                    },
                    {
                        "week": "Sunday",
                        "time": "Midnight",
                        "value": 0.060884
                    },
                    {
                        "week": "Sunday",
                        "time": "1am",
                        "value": 534
                    },
                    {
                        "week": "Sunday",
                        "time": "2am",
                        "value": 50
                    },
                    {
                        "week": "Sunday",
                        "time": "3am",
                        "value": 54
                    },
                    {
                        "week": "Sunday",
                        "time": "4am",
                        "value": 0
                    },
                    {
                        "week": "Sunday",
                        "time": "5am",
                        "value": 0
                    },
                    {
                        "week": "Sunday",
                        "time": "6am",
                        "value": 27
                    },
                    {
                        "week": "Sunday",
                        "time": "7am",
                        "value": 50
                    },
                    {
                        "week": "Sunday",
                        "time": "8am",
                        "value": 498
                    },
                    {
                        "week": "Sunday",
                        "time": "9am",
                        "value": 840
                    },
                    {
                        "week": "Sunday",
                        "time": "10am",
                        "value": 482
                    },
                    {
                        "week": "Sunday",
                        "time": "11am",
                        "value": 457
                    },
                    {
                        "week": "Sunday",
                        "time": "Midday",
                        "value": 369
                    },
                    {
                        "week": "Sunday",
                        "time": "1pm",
                        "value": 275
                    },
                    {
                        "week": "Sunday",
                        "time": "2pm",
                        "value": 352
                    },
                    {
                        "week": "Sunday",
                        "time": "3pm",
                        "value": 379
                    },
                    {
                        "week": "Sunday",
                        "time": "4pm",
                        "value": 274
                    },
                    {
                        "week": "Sunday",
                        "time": "5pm",
                        "value": 346
                    },
                    {
                        "week": "Sunday",
                        "time": "6pm",
                        "value": 311
                    },
                    {
                        "week": "Sunday",
                        "time": "7pm",
                        "value": 303
                    },
                    {
                        "week": "Sunday",
                        "time": "8pm",
                        "value": 366
                    },
                    {
                        "week": "Sunday",
                        "time": "9pm",
                        "value": 453
                    },
                    {
                        "week": "Sunday",
                        "time": "10pm",
                        "value": 1079
                    },
                    {
                        "week": "Sunday",
                        "time": "11pm",
                        "value": 1552
                    }
                ]
            }
        } ,
        mounted(){
            this.drawData();
        },
        methods: {
            drawData() {
                if(this.chart){
                    this.chart.destroy()
                }
                let params = {}
                this.$axios.post(MyApi.QRY_REC_WEEK_HOUT_COUNT,params/*,options*/)
                    .then((resp) =>  {
                        if('200' == resp.code){
                            let data = resp.data
                            const chart = new F2.Chart({
                                id: 'weekHourCount',
                                width:window.innerWidth,
                                height:window.innerWidth*3/4,
                                pixelRatio: window.devicePixelRatio
                            });
                            chart.source(data);
                            chart.coord('polar', {
                                innerRadius: 0.2
                            });
                            chart.tooltip(false);
                            chart.axis('week', {
                                grid: null,
                                line: null,
                                tickLine: null,
                                label: null
                            });
                            chart.axis('time', {
                                line: null,
                                tickLine: null,
                                grid: null,
                                labelOffset: 3
                            });
                            chart.polygon()
                                .position('time*week')
                                .color('value', '#FFECF5-#FCDEE8-#FAD0DE-#F6C1D3-#F3AFC8-#F39EBD-#EE8DAE-#ED709C-#ED6091')
                                .style({
                                    stroke: '#fff',
                                    lineWidth: 1
                                });

                            const values = [ 'Mon.', 'Tue.', 'Wed.', 'Thu.', 'Fri.', 'Sat.', 'Sun.' ];
                            values.forEach(function(val, idx) {
                                debugger
                                chart.guide().text({
                                    top: true,
                                    position: [ 0, idx ],
                                    content: val,
                                    style: {
                                        fill: '#7A7A7A',
                                        textAlign: 'center',
                                        shadowBlur: 2,
                                        shadowColor: 'rgba(0, 0, 0, .45)'
                                    }
                                });
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
