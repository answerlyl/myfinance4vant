<template>

    <div>
        <van-nav-bar :title="title" >
        </van-nav-bar>
<!--        <van-cell-group>-->
<!--            <van-button style="margin-top: 10px;" type="default"-->
<!--                        block round  :loading="isLoading"-->
<!--                        loading-text="提交中..."-->
<!--                        @click="show=true">通知</van-button>-->
<!--        </van-cell-group>-->
        <van-cell-group>
            <van-button style="margin-top: 10px;" type="default"
                        block round  :loading="isLoading"
                        loading-text="提交中..."
                        @click="logout">退出</van-button>
        </van-cell-group>
<!--        <van-dialog v-model="show" title="情人节快乐" show-cancel-button>-->
<!--            <img src="https://img.yzcdn.cn/vant/apple-3.jpg" style="height:240px">-->
<!--        </van-dialog>-->
    </div>
</template>

<script>
    import store from '@/store'
    import * as types from '@/common/types/mutation.js'

    export default {
        name: "UserPage",
        data(){
            return {
                title:'我的',
                isLoading:false,
                show:false
            }
        },
        methods: {
            logout(){
                store.commit(types.SYS+types.LOGOUT)
                store.commit(types.SYS + types.CLEAR_TOKEN)
                this.$router.push({path:"/pageLogin"})

            }
        }
    }
</script>

<style scoped>

</style>
