<template>
    <div>
        <van-collapse v-model="activeNames">
            <van-collapse-item v-for="item in list" :name="item.sort" :value="item.amount" >
                <div slot="title"> <van-icon name="gold-coin" size="25" color="#fe7844" style="vertical-align:-7px;margin-right: 4px"/><span>{{item.sortName}} {{(item.amount/item.sumAmt*100).toFixed(2)}}% </span></div>
                <van-cell v-for="dtlItem in item.detailList" :title="dtlItem.sortDetailName + ' ' +(dtlItem.amount/dtlItem.sumAmt*100).toFixed(2) +'%'" is-link :value="dtlItem.amount" icon="balance-o" @click="qryDetailList(dtlItem.sortDetail)"/>
                <!--                <van-cell is-link >-->
<!--                    <van-row >-->
<!--                        <van-col span="2"><van-icon name="gold-coin" size="25" color="#fe7844" /></van-col>-->
<!--                        <van-col span="8">购物 20%</van-col>-->
<!--                        <van-col span="6" offset="8" style="text-align:right">-9999.99</van-col>-->
<!--                    </van-row>-->

<!--                </van-cell>-->
            </van-collapse-item>
<!--            <van-collapse-item title="标题2" name="2" icon="shop-o">-->
<!--                内容-->
<!--            </van-collapse-item>-->
        </van-collapse>

<!--        <van-cell is-link >-->
<!--            <van-row >-->
<!--                <van-col span="2"><van-icon name="gold-coin" size="25" color="#fe7844" /></van-col>-->
<!--                <van-col span="8">购物 20%</van-col>-->
<!--                <van-col span="6" offset="8" style="text-align:right">-9999.99</van-col>-->
<!--            </van-row>-->

<!--        </van-cell>-->

<!--        <van-cell>-->
<!--            <van-row >-->
<!--                <van-col span="2"><van-icon name="gold-coin" size="25" color="#fe7844" /></van-col>-->
<!--                <van-col span="8">购物 20%</van-col>-->
<!--                <van-col span="4" offset="8" style="text-align:right">-0.99</van-col>-->
<!--                <van-col span="2"><i class="van-icon van-icon-arrow van-cell__right-icon"></i> </van-col>-->
<!--            </van-row>-->

<!--        </van-cell>-->

    </div>
</template>

<script>
    import * as MyApi from '@/api/URLApiAddr.js'
    export default {
        name: "FinSortLine",
        props:{
            finType: 0,
            day: '',
            month: ''
        },
        data() {
            return {
                activeNames: ['1'],
                list: []

            }
        },
        watch: {
            finType() {
                debugger
                this.qrySortAmtList()
            },
            day(){
                debugger
                this.qrySortAmtList()
            },
            month(){
                debugger
                this.qrySortAmtList()
            }
        },

        methods: {
            qrySortAmtList(){
                debugger
                let params = {
                    finType: this.finType,
                    day: this.day,
                    month: this.month
                }
                // let params = {
                //     finType: 12101,
                //     day: '2020-02-29'
                // }
                this.$axios.post(MyApi.QRY_SORT_AMT_LIST,params/*,options*/)
                    .then((resp) =>  {
                        debugger
                        if(resp.code == 200){
                            this.list = resp.data
                        }

                    })
                    .catch((err) =>{
                        this.$toast.fail("数据初始化异常");
                    })

            },
            qryDetailList(sortDetail){
                debugger
                this.$router.push({ name:'finList',params:{finType:this.finType,day:this.day,month:this.month,sortDetail:sortDetail} })
            }
        }
    }
</script>

<style scoped>

</style>
