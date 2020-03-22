<template>
	<div>


		<van-nav-bar :title="title" left-text="返回" left-arrow  @click-left="onClickLeft">
			<van-icon name="description" slot="right" size="20px"@click="goToFinReport()"/>
		</van-nav-bar>
		<fin-notice-info></fin-notice-info>

		<div class="fin-panel" >

			<van-field
					:required=true
					:border=false
					readonly
					clickable
					label="日期"
					:value="formModel.finDate"
					placeholder="请选择"
					@click="showDatePicker = true"
			/>
			<van-popup v-model="showDatePicker" position="bottom">
				<van-datetime-picker
						v-model="pickDate"
						type="date"
						:min-date="minDate"
						:max-date="maxDate"
						@cancel="showDatePicker = false"
						@confirm="onDateConfirm"
				/>
			</van-popup>
			<van-cell-group>
				<van-field
						readonly
						:required=true
						clickable
						label="时间"
						:value="formModel.finTime"
						placeholder="请选择"
						@click="showTimePicker = true"
				/>
				<van-popup v-model="showTimePicker" position="bottom">
					<van-datetime-picker
							v-model="pickTime"
							type="time"
							:min-hour="0"
							:max-hour="24"
							@cancel="showTimePicker = false"
							@confirm="onTimeConfirm"
					/>
				</van-popup>
			</van-cell-group>
			<van-cell-group>
				<van-field  readonly
							type="text" label="金额"
							placeholder="请录入金额"
							:required=true
							clickable
							:value="formModel.amount"
							@touchstart.native.stop="showKeyboard = true"
				/>
				<van-number-keyboard
						:show="showKeyboard"
						v-model="formModel.amount"
						extra-key="."
						close-button-text="完成"
						@blur="showKeyboard = false"
				/>
			</van-cell-group>
			<van-cell-group>
				<van-field
						readonly
						clickable
						label="归属/分类"
						:value="belongFinType"
						placeholder="请选择"
						@click="showPicker = true"
				/>
				<van-popup v-model="showPicker" position="bottom">
					<van-picker
							show-toolbar title="归属/分类" ref="belongPicker"
							:columns="belongFinTypes"
							value-key="attrName"
							@cancel="showPicker = false"
							@confirm="onConfirm"
					/>
				</van-popup>

			</van-cell-group>
			<van-cell-group>
				<van-field
						readonly
						clickable
						label="类型/明细"
						:value="sortAndDetail"
						placeholder="请选择"
						@click="showSortPicker = true"
				/>
				<van-popup v-model="showSortPicker" position="bottom">
					<van-picker show-toolbar title="类型/明细" ref="sortPicker"
								:columns="sortAndDetails"
								value-key="attrName"
								@cancel="showSortPicker = false"
								@confirm="onSortConfirm"/>
				</van-popup>
			</van-cell-group>

			<van-cell-group>
				<van-field
						v-model="formModel.remark"
						rows="2"
						autosize
						label="备注"
						type="textarea"
						maxlength="50"
						placeholder="请输入备注"
						show-word-limit
				/>

			</van-cell-group>

			<van-cell-group>
				<van-button style="margin-top: 10px;" type="primary"
							block round color="#fe7844" :loading="isLoading"
							loading-text="提交中..."
							@click="submitForm">提交</van-button>
			</van-cell-group>


		</div>
	</div>
</template>

<script>
	import FinNav from './FinNav'
	import FinNoticeInfo from "./FinNoticeInfo";
	import {formatDate,stringToDate} from '../common/utils/dateUtil.js'
	import * as MyApi from '../api/URLApiAddr.js'

	export default {
		name: 'MyFinance',
		components: {
			FinNav,
			FinNoticeInfo
		},


		data() {
			return {
				active: [],
				title: 'L&W-Finance',
				isLoading: false,
				formModel:{
					finId: this.$route.params.finId,
					amount: '',
					belong:'',
					finType:'',
					sort:'',
					sortDetail:'',
					remark:'',
					inputDate:formatDate(new Date,'yyyy-MM-dd'),
					month:formatDate(new Date,'yyyy-MM'),
					finDate:formatDate(new Date,'yyyy-MM-dd'),
					finTime:formatDate(new Date,'hh:mm'),
				},
				month:this.$route.params.month,
				pickDate:new Date(),
				showDatePicker:false,
				minDate: new Date(2020, 0, 1),
				maxDate: new Date(2025, 10, 1),

				pickTime:formatDate(new Date,'hh:mm'),
				showTimePicker:false,
				showKeyboard:false,
				belongFinType: '',
				showPicker: false,
				sortAndDetail: '',
				showSortPicker: false,
				remark:'',
				belongFinTypes:[],
				sortAndDetails:[]
			}
		},
		created:function() {
			debugger
			if(!this.formModel.finId){

				this.initData()
			}else{
				this.initAlterData()
			}
		},

		methods:{
			initData(){

				this.$axios.get(MyApi.QRY_ATTR_LIST).then((response) => {

					debugger
					let blg = response.data.belong
					let ft = response.data.finType



					this.belongFinTypes.push({values:blg});
					this.belongFinTypes.push({values:ft});

					let sortDetails = response.data.sort
					this.sortAndDetails = sortDetails

					this.formModel.belong = blg[0].attrId
					this.formModel.finType = ft[0].attrId
					this.belongFinType = blg[0].attrName + " " + ft[0].attrName

					this.formModel.sort = sortDetails[0].attrId
					this.formModel.sortDetail = sortDetails[0].children[0].attrId
					this.sortAndDetail = sortDetails[0].attrName + " " + sortDetails[0].children[0].attrName

					// console.log(response)
					// console.log(response.data.data)
				}).catch((error) => {
					this.$toast.fail("数据初始化异常");
				})

			},
			initAlterData(){
				debugger
				let finId = this.formModel.finId
				let params = {finId:finId}
				//let thiz = this
				this.$axios.post(MyApi.QRY_FIN_DETAIL,params/*,options*/)
				// 请求成功后
						.then((response) => {
							debugger

							let data = response.data;

							let blg = data.attrSepc.belong
							let ft = data.attrSepc.finType

							this.belongFinTypes.push({values:blg,defaultIndex:data.initIndex[0]});
							this.belongFinTypes.push({values:ft,defaultIndex:data.initIndex[1]});

							let sortDetails = data.attrSepc.sort

							let finance = data.finance
							this.belongFinType = finance.belongName + " " + finance.finTypeName
							this.sortAndDetail = finance.sortName + " " + finance.sortDetailName

							let resDate = finance.inputDate.substr(0,10)
							this.formModel.finDate = resDate

							this.pickDate = stringToDate(resDate)

							this.formModel.finTime = finance.inputDate.substr(11,5)
							this.pickTime = finance.inputDate.substr(11,5)

							this.sortAndDetails = sortDetails

							this.formModel.finId = finance.finId;
							this.formModel.month = finance.month;
							this.formModel.amount = finance.amount + '';
							this.formModel.belong = finance.belong + '';
							this.formModel.finType = finance.finType + '';
							this.formModel.inputDate = finance.inputDate + '';
							this.formModel.sort = finance.sort + '';
							this.formModel.sortDetail = finance.sortDetail + '';
							this.formModel.remark = finance.remark + '';




						})
						.catch((err) => {
							console.log(err)
							this.$toast.fail("请求异常,请稍后再试");
						})

			},
			onConfirm(value,index) {
				this.formModel.belong = value[0].attrId;
				this.formModel.finType = value[1].attrId;
				this.belongFinType = value[0].attrName + " " + value[1].attrName;
				this.showPicker = false;
			},

			onSortConfirm(value) {
				debugger
				let index = this.$refs.sortPicker.getIndexes()
				let sortIndex = index[0];
				let detailIndex = index[1];
				this.formModel.sort = this.sortAndDetails[sortIndex].attrId
				this.formModel.sortDetail = this.sortAndDetails[sortIndex].children[detailIndex].attrId
				this.sortAndDetail = value[0] + " " + value[1];
				this.showSortPicker = false;
			},
			onDateConfirm(value) {
				this.formModel.finDate = formatDate(value,'yyyy-MM-dd');
				this.formModel.month = formatDate(value,'yyyy-MM');
				this.showDatePicker = false;
			},
			onTimeConfirm(value) {
				this.formModel.finTime = value;
				this.showTimePicker = false;
			},
			submitForm() {
				this.isLoading = true
				// let params = this.model
				// thisVue.buttonDisabled = true
				//let toast = thisVue.showToast()

				let params = this.formModel
				this.$axios.post(MyApi.FINANCE_SAVE_URL,params/*,options*/)

				// 请求成功后
						.then((data) => {
							//let data = response.data;
							if('200' == data.code){
								if(this.month){
									this.$router.push({ name:'finList',params:{month:this.month} })
								}
								this.formModel.amount = ''
								this.formModel.remark = ''
								this.$toast.success(data.msg);
							}
							this.isLoading = false
						})
						.catch((err) => {
							this.$toast.fail("请求异常,请稍后再试");
						})
			},
			onClickLeft() {
				if(this.month){
					this.$router.push({ name:'finList',params:{month:this.month} })
				}else{
					history.back();
				}
			},
			goToFinReport(){
				this.$router.push({ path:'/finReport'  })

			}

		}

	};
</script>



<style>
	.fin-panel {
		min-width: 120px;
		font-size: 20px;
		line-height: 36px;

		margin-left: 15px;
		margin-right: 15px;

	}
</style>
