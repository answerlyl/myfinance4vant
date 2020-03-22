<template>

    <div>
        <canvas id="mountNode" ></canvas>
    </div>
</template>

<script>

    import F2 from "@antv/f2/lib/index-all"

    export default {
        props:{
            searchDate: {
                type: String,
                default: '',
            }
        },
        name: "TestVanPicker",
        data() {
            return {

            };
        },
        watch: {
            searchDate() {
                debugger
                this.drowData(this.searchDate)
            }
        },
        mounted(){
            this.drowData()  ;
        },
        methods: {
            drowData(){
                var data = [{
                    day: '周一',
                    value: 300
                }, {
                    day: '周二',
                    value: 400
                }, {
                    day: '周三',
                    value: 350
                }, {
                    day: '周四',
                    value: 500
                }, {
                    day: '周五',
                    value: 490
                }, {
                    day: '周六',
                    value: 600
                }, {
                    day: '周日',
                    value: 900
                }];
                debugger
                // 与上面的视图层对应
                var chart = new F2.Chart({
                    id: 'mountNode',
                    width:window.innerWidth,
                    height:window.innerWidth*3/4,
                    pixelRatio: window.devicePixelRatio
                });
                //配置数据源
                chart.source(data, {
                    //value和day都是根据模拟数据的属性来配置的，所以这里的value和day是可以更改的，具体根据后台数据属性来
                    value: {
                        tickCount: 5,
                        min: 0
                    },
                    day: {
                        range: [0, 1]
                    }
                });
                // 配置文本提示信息以及触发的方法
                chart.tooltip({
                    showCrosshairs: true,
                    showItemMarker: false,
                    onShow: function onShow(ev) {
                        var items = ev.items;
                        items[0].name = null;
                        items[0].value = '$ ' + items[0].value;
                    }
                });
                //配置对应方式
                chart.axis('day', {
                    label: function label(text, index, total) {
                        var textCfg = {};
                        if (index === 0) {
                            textCfg.textAlign = 'left';
                        } else if (index === total - 1) {
                            textCfg.textAlign = 'right';
                        }
                        return textCfg;
                    }
                });
                // 配置定位
                chart.line().position('day*value');
                //配置图表样式
                chart.point().position('day*value').style({
                    stroke: '#fff',
                    lineWidth: 1
                });
                //渲染
                chart.render();
            }

        }
    }
</script>

<style scoped>

</style>
