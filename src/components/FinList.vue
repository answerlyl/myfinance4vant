<template>

    <div>
        <van-nav-bar :title="title" left-text="返回" left-arrow  @click-left="onClickLeft">
        </van-nav-bar>
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
            <van-list
                    v-model="loading"
                    :finished="finished"
                    finished-text="哥哥找过了,没有更多了,爱宝爱宝"
                    loading-text="宝不着急,哥哥正在找,嗷呜~"
                    :error.sync="error"
                    error-text="请求失败，点击重新加载"
                    @load="onLoad"
            >
                <van-swipe-cell v-for="item in list" :key="item.finId">

                    <van-cell >

                        <!-- 使用 title 插槽来自定义标题 -->
                        <template slot="title">
                            <van-row type="flex" justify="space-between">
                                <van-col span="12" >
                                    <span style="font-size: 20px">{{splitDate(item.inputDate)}}</span>
                                    <span> {{splitTime(item.inputDate)}}</span>
                                </van-col>
                                <van-col span="6">
                                    <van-tag  plain round  :type="getFinType(item.finType)" style="float: right;margin-top:5px">{{item.finTypeName}}</van-tag>
                                </van-col>
                                <van-col span="6">
                                    <span style="font-size: 20px">￥{{item.amount}}</span>
                                </van-col>
                            </van-row>
                            <van-row type="flex" >
                                <van-col span="4" >{{item.belongName}}</van-col>
                                <van-col span="6" offset="10"><span style="float:left">{{item.sortName}}</span></van-col>
                                <van-col span="6"><span style="color:#969799;font-size: 12px">{{item.sortDetailName}}</span></van-col>
                            </van-row>
                            <van-row type="flex" justify="space-between">
                                <van-col span="24" >
                                    <span style="float: left;color:#969799;font-size: 12px">{{item.remark}}</span>
                                </van-col>

                            </van-row>
                        </template>

                    </van-cell>
                    <template slot="right">
                        <van-button square plain type="info" text="修改" class="upd-button" @click="alterFin(item.finId)"/>
                    </template>
                </van-swipe-cell>
            </van-list>

        </van-pull-refresh>

    </div>

</template>

<script>
    import FinNav from './FinNav'
    import * as MyApi from '../api/URLApiAddr.js'
    import {formatDate} from '../common/utils/dateUtil.js'
    export default {
        name: 'FinList',
        components: {
            FinNav
        },
        data() {
            return {
                title: '账单详情',
                list: [],
                error: false,
                loading: false,
                finished: false,
                refreshing: false,
                tagType: "danger",
                pageInfo:{
                    day:'',
                    sortDetail:'',
                    finType:Number,
                    month:'',
                    current:1,
                    size:10,
                    total:-1
                }


            }
        },
        watch:{
            // 监测路由变化,只要变化了就调用获取路由参数方法将数据存储本组件即可
            $route: 'getParams'
        },
        created() {
            this.getParams()

        },
        methods: {
            onLoad() {

                // if(this.pageInfo.month == undefined || this.pageInfo.month == ''){
                //     this.$toast.fail("月份不能为空")
                //     this.finished = true
                //     return false
                // }

                debugger
                if (this.refreshing) {
                    this.list = [];
                    this.pageInfo.current = 1
                    this.pageInfo.total=-1
                    this.refreshing = false
                }

                let ths = this
                if(this.list.length == this.pageInfo.total){
                    this.finished = true;
                    return false
                }
                let params = this.pageInfo
                this.$axios.post(MyApi.QRY_FIN_LIST,params/*,options*/)
                    .then((response) =>  {
                        debugger
                        let code = response.code;
                        if(code == '200'){

                            let data = response.data
                            if(data.records.length >0){
                                ths.pageInfo.current ++

                                //ths.list = data.records
                                ths.list = ths.list.concat(data.records)
                                ths.pageInfo.total = data.total;
                                if(ths.list.length == data.records.total){
                                    this.finished = true;
                                }

                            }else{
                                this.finished = true;
                            }
                        }
                        this.loading = false;

                    })
                    .catch((err) =>{
                        this.loading = false
                        this.error = true
                        this.$toast.fail("数据初始化异常"+err);
                    })

            },
            splitDate(inputDate) {
                return inputDate.substr(0,10)
            },
            splitTime(inputDate) {
                return inputDate.substr(11,5)
            },
            getFinType(finType,finTypeName){
                if(finType == '12101'){
                    return "danger"
                }else{
                    return  "primary"
                }
                //return finTypeName
            },
            onClickLeft() {
                history.back();
            },
            getParams(){
                debugger
                this.pageInfo.month = this.$route.params.month;
                this.pageInfo.day = this.$route.params.day;
                this.pageInfo.finType = this.$route.params.finType;
                this.pageInfo.sortDetail = this.$route.params.sortDetail;
            },
            onRefresh() {
                // 清空列表数据
                this.finished = false;

                // 重新加载数据
                // 将 loading 设置为 true，表示处于加载状态
                this.loading = true;
                this.onLoad();
            },
            alterFin(finId){
                let month = this.pageInfo.month
                this.$router.push({ name:'finance',params:{finId:finId,month:month} })
            }
        }

    }


</script>

<style scoped="scoped">
    .upd-button {
        height: 100%;
    }
    .van-list >>> .van-list__finished-text{
            margin-bottom: 50px;
    }


</style>
