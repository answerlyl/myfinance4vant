<template>
    <div>
        <van-nav-bar :title="title" left-text="返回" left-arrow  @click-left="onClickLeft">
        </van-nav-bar>

        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
            <van-list
                    v-model="loading"
                    :finished="finished"
                    finished-text="哥哥找过了,没有更多了,爱宝爱宝"
                    loading-text="快点快点,不能让宝等太久"
                    @load="onLoad"
            >
                <van-cell v-for="item in list" >

                    <!-- 使用 title 插槽来自定义标题 -->
                    <template slot="title">
                        <van-row type="flex" justify="space-between">
                            <van-col span="12" >
                                <!--                                <van-icon name="balance-list" size="20" style="margin-right: 15px"/>-->
                                <span style="font-size: 20px">{{item.month}}</span>
                            </van-col>
                            <van-col span="6" offset="6">

                                <span style="float: right" ><van-icon name="notes-o" size="23px" color="#fe7844" @click="goToFinList(item.month)"/></span>
                            </van-col>
                        </van-row>
                        <van-row type="flex" justify="space-between">
                            <van-col span="8"  offset="3"><span style="float: right;font-size: 20px;color:#ee0a24">￥-{{item.pay}}</span></van-col>
                            <van-col span="8" offset="2"><span style="float:left;font-size: 20px;color:#1989fa">￥{{item.income}}</span></van-col>
                            <van-col span="3"></van-col>
                        </van-row>
                        <van-row type="flex" justify="space-between">
                            <van-col span="8"  offset="3"><span style="float: right;font-size: 16px">本月支出</span></van-col>
                            <van-col span="8" offset="2"><span style="float:left;font-size: 16px">本月收入</span></van-col>
                            <van-col span="3"></van-col>
                        </van-row>
                        <van-row type="flex" justify="space-between">
                            <van-col span="24" >
                                <span style="float: right;color:#969799;font-size: 12px">月结余:￥{{computeBalance(item.income,item.pay)}}</span>
                            </van-col>

                        </van-row>
                    </template>

                </van-cell>

            </van-list>
        </van-pull-refresh>
    </div>
</template>

<script>
    import FinNav from './FinNav'
    import * as MyApi from '../api/URLApiAddr.js'

    export default {
        name: "FinReport",
        components: {
            FinNav
        },
        data() {
            return {
                title : '账单列表',
                list: [],
                loading: false,
                finished: false,
                refreshing: false,
                tagType: "danger",
                pageInfo:{
                    current:1,
                    size:10,
                    total:-1
                }
            }
        },
        methods: {
            onLoad() {

                if (this.refreshing) {
                    this.list = [];
                    this.pageInfo.current = 1
                    this.pageInfo.total=-1
                    this.refreshing = false
                }

                debugger

                if(this.pageInfo.total == this.list.length){
                    ths.finished = true;
                    return false
                }
                let params = this.pageInfo
                let ths = this

                this.$axios.post(MyApi.QRY_FIN_REPORT,params/*,options*/)
                    .then((resp) =>  {

                        let data = resp.data
                        if(data.records.length >0){
                            ths.pageInfo.current ++
                            ths.list = ths.list.concat(data.records)
                            ths.pageInfo.total = data.total
                            if(ths.list.length == data.total){
                                this.finished = true;
                            }
                        }else{
                            this.finished = true;
                        }

                        this.loading = false;


                    })
                    .catch((err) =>{
                        this.$toast.fail("数据初始化异常");
                    })

            },
            computeBalance(income,pay){
                let balance = income-pay
                return balance.toFixed(2)
            },
            onClickLeft() {
                history.back();
            },
            goToFinList(month){

                this.$router.push({ name:'finList',params:{month:month} })
            },
            onRefresh() {
                // 清空列表数据
                this.finished = false;

                // 重新加载数据
                // 将 loading 设置为 true，表示处于加载状态
                this.loading = true;
                this.onLoad();
            }

        }
    }
</script>

<style scoped>
    .van-list >>> .van-list__finished-text{
        margin-bottom: 50px;
    }

</style>
