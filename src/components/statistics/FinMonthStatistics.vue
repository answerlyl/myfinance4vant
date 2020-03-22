<template>

    <div>
        <van-divider />
        <van-row >
            <van-col span="17" offset="1">
                <span style="color: #969799">支出￥{{pay}} 收入￥{{income}}</span>
            </van-col>
            <van-col span="6" >
                <van-button icon="calender-o" plain type="info" size="small" :text="qryDate" @click="showDatePicker = true" color="#fe7844"></van-button>
            </van-col>
        </van-row>
        <van-popup v-model="showDatePicker" position="bottom">
            <van-datetime-picker
                    v-model="pickDate"
                    type="year-month"
                    :min-date="minDate"
                    :max-date="maxDate"
                    @cancel="showDatePicker = false"
                    @confirm="onDateConfirm"
            />
        </van-popup>
        <van-divider />
        <fin-month-count :search-date="qryDate"></fin-month-count>
        <fin-month-sort :search-date="qryDate"></fin-month-sort>
        <div style="margin-bottom: 100px"></div>
    </div>
</template>

<script>
    import FinMonthCount from "./FinMonthCount";
    import FinMonthSort from "./FinMonthSort";
    import {formatDate,stringToDate} from '@/common/utils/dateUtil.js'
    import * as MyApi from '@/api/URLApiAddr.js'
    export default {
        name: "FinMonthStatistics",
        components: {
            FinMonthCount,
            FinMonthSort
        },
        data() {
            return {
                qryDate: formatDate(new Date(),'yyyy-MM'),

                pickDate:new Date(),
                showDatePicker:false,
                minDate: new Date(2020, 0, 1),
                maxDate: new Date(2025, 10, 1),
                income: 0,
                pay: 0
            }
        },
        watch:{
            qryDate() {
                this.qryMonthInfo()
            }

        },
        mounted(){
            this.qryMonthInfo()
        },
        methods: {
            qryMonthInfo() {
                let params = {month:this.qryDate}
                this.$axios.post(MyApi.QRY_FIN_MONTH_INFO,params/*,options*/)
                    .then((data) =>  {
                        //let data = response.data
                        if('200' == data.code){
                            let resData = data.data
                            if(resData){
                                this.income = resData.income
                                this.pay = resData.pay
                            }else{
                                this.income = 0
                                this.pay = 0
                            }
                        }

                    })
                    .catch((err) => {

                    })


            },
            onDateConfirm(value) {
                debugger
                this.qryDate = formatDate(value,'yyyy-MM');
                this.showDatePicker = false;
            }
        }
    }
</script>

<style scoped>

</style>
