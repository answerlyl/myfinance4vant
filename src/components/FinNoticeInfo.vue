<template>
    <div>
        <van-notice-bar
                mode="closeable"
                v-if="noticeIsShow"
                :color="fontColor"
                :background="bkgColor"
                left-icon="like-o"
        >
            {{noticeInfo}}
        </van-notice-bar>
    </div>

</template>

<script>
    import * as MyApi from '../api/URLApiAddr.js'
    export default {
        name: "FinNoticeInfo",
        data() {
            return {
                noticeIsShow:false,
                fontColor:'#FF83FA',
                bkgColor:'#FFE1FF',
                noticeInfo:'hello world'
            }
        },
        mounted() {
            this.initNotice()
        },
        methods: {
            initNotice(){
                let params = {}
                this.$axios.post(MyApi.QRY_NOTICE_INFO,params/*,options*/)
                // 请求成功后
                    .then((data) => {
                        if('200' == data.code){
                            let noticeInfo = data.data
                            if(noticeInfo){
                                this.noticeIsShow = true
                                this.fontColor = noticeInfo.fontColor
                                this.bkgColor = noticeInfo.bkgColor
                                this.noticeInfo = noticeInfo.showInfo
                            }
                        }

                    })
                    .catch((err) => {

                    })

            }
        }
    }
</script>

<style scoped>

</style>
