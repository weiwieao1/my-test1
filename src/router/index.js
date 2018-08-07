import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

//路由页面引入 路由懒加载+chunk拆分
const main = r => require.ensure([], () => r(require('@/components/main.vue')), 'components')
const test = r => require.ensure([], () => r(require('@/components/test.vue')), 'components')
const users = r => require.ensure([], () => r(require('@/components/users.vue')), 'components')
const xw = r => require.ensure([], () => r(require('@/components/xw.vue')), 'components')
const adit = r => require.ensure([], () => r(require('@/components/adit.vue')), 'components')
const aa = r => require.ensure([], () => r(require('@/components/aa.vue')), 'components')
const yy = r => require.ensure([], () => r(require('@/components/yy.vue')), 'components')
const weituisong = r => require.ensure([], () => r(require('@/components/weituisong.vue')), 'components')
//会员管理模块
const changePassword = r => require.ensure([], () => r(require('@/memberManagement/changePassword.vue')), 'memberManagement')
const memberList = r => require.ensure([], () => r(require('@/memberManagement/memberList.vue')), 'memberManagement')
const membershipReview = r => require.ensure([], () => r(require('@/memberManagement/membershipReview.vue')), 'memberManagement')
const realNameVertification = r => require.ensure([], () => r(require('@/memberManagement/realNameVertification.vue')), 'memberManagement')
const accountInquiry = r => require.ensure([], () => r(require('@/memberManagement/accountInquiry.vue')), 'memberManagement')
const teamList = r => require.ensure([], () => r(require('@/memberManagement/teamList.vue')), 'memberManagement')
const userInquiry = r => require.ensure([], () => r(require('@/memberManagement/userInquiry.vue')), 'memberManagement')
const shopMergeList = r => require.ensure([], () => r(require('@/memberManagement/shopMergeList.vue')), 'memberManagement')
const clientManagerAuditList = r => require.ensure([], () => r(require('@/memberManagement/clientManagerAuditList.vue')), 'memberManagement')
const dataAttribute = r => require.ensure([], () => r(require('@/memberManagement/dataAttribute.vue')), 'memberManagement')
const downGradeList = r => require.ensure([], () => r(require('@/memberManagement/downGradeList.vue')), 'memberManagement')
const blackList = r => require.ensure([], () => r(require('@/memberManagement/blackList.vue')), 'memberManagement12')
const physicalStore = r => require.ensure([], () => r(require('@/memberManagement/physicalStore.vue')), 'memberManagement')
const orderInquire = r => require.ensure([], () => r(require('@/memberManagement/orderInquire.vue')), 'memberManagement')
const shopNotice = r => require.ensure([], () => r(require('@/memberManagement/shopNotice.vue')), 'memberManagement')
//商城管理模块
const mallSetup = r => require.ensure([], () => r(require('@/mallManagement/mallSetup.vue')), 'mallManagement')
const qiqiaoPlateSetup = r => require.ensure([], () => r(require('@/mallManagement/qiqiaoPlateSetup.vue')), 'mallManagement')
const selfDefineProduct = r => require.ensure([], () => r(require('@/mallManagement/selfDefineProduct.vue')), 'mallManagement')
const joinCommodityActivityPage = r => require.ensure([], () => r(require('@/mallManagement/joinCommodityActivityPage.vue')), 'mallManagement')
const templateSet = r => require.ensure([], () => r(require('@/mallManagement/templateSet.vue')), 'mallManagement')
const secondPage = r => require.ensure([], () => r(require('@/mallManagement/secondPage.vue')), 'mallManagement')
const secondAdit = r => require.ensure([], () => r(require('@/mallManagement/secondAdit.vue')), 'mallManagement')
const secondAdit2 = r => require.ensure([], () => r(require('@/mallManagement/secondAdit2.vue')), 'mallManagement')
const firstPage = r => require.ensure([], () => r(require('@/mallManagement/firstPage.vue')), 'mallManagement')
const firstPageRunPics = r => require.ensure([], () => r(require('@/mallManagement/firstPageRunPics.vue')), 'mallManagement')
const TBBB = r => require.ensure([], () => r(require('@/mallManagement/TBBB.vue')), 'mallManagement')
const TAAA = r => require.ensure([], () => r(require('@/mallManagement/TAAA.vue')), 'mallManagement')
const joinActivityProducts = r => require.ensure([], () => r(require('@/mallManagement/joinActivityProducts.vue')), 'mallManagement')
const commodityList = r => require.ensure([], () => r(require('@/mallManagement/commodityList.vue')), 'mallManagement')
//仓库管理
const warehouseList = r => require.ensure([], () => r(require('@/warehouseManagement/warehouseList.vue')), 'warehouseManagement')
//商品管理
const synchronizeCommodityLibrary = r => require.ensure([], () => r(require('@/commodityManagement/synchronizeCommodityLibrary.vue')), 'commodityManagement')
const combinationCommodity = r => require.ensure([], () => r(require('@/commodityManagement/combinationCommodity.vue')), 'commodityManagement')
const frontModule = r => require.ensure([], () => r(require('@/commodityManagement/frontModule.vue')), 'commodityManagement')
const brand = r => require.ensure([], () => r(require('@/commodityManagement/brand.vue')), 'commodityManagement')
const commodity = r => require.ensure([], () => r(require('@/commodityManagement/commodity.vue')), 'commodityManagement')
const rebate = r => require.ensure([], () => r(require('@/commodityManagement/rebate.vue')), 'commodityManagement')
const label = r => require.ensure([], () => r(require('@/commodityManagement/label.vue')), 'commodityManagement')
const setSecond = r => require.ensure([], () => r(require('@/commodityManagement/setSecond.vue')), 'commodityManagement')
const inquirySpu = r => require.ensure([], () => r(require('@/commodityManagement/inquirySpu.vue')), 'commodityManagement')
const publish1 = r => require.ensure([], () => r(require('@/commodityManagement/publish1.vue')), 'commodityManagement')
const publish10 = r => require.ensure([], () => r(require('@/commodityManagement/publish10.vue')), 'commodityManagement')
const publish2 = r => require.ensure([], () => r(require('@/commodityManagement/publish2.vue')), 'commodityManagement')
const bindSpu = r => require.ensure([], () => r(require('@/commodityManagement/bindSpu.vue')), 'commodityManagement')
const FMadit = r => require.ensure([], () => r(require('@/commodityManagement/FMadit.vue')), 'commodityManagement')
const originPlace = r => require.ensure([], () => r(require('@/commodityManagement/originPlace.vue')), 'commodityManagement')
//营销活动
const couponsList = r => require.ensure([], () => r(require('@/marketActivities/couponsList.vue')), 'marketActivities')
const rushBuy = r => require.ensure([], () => r(require('@/marketActivities/rushBuy.vue')), 'marketActivities')
const shopJoinActivitiesGoods = r => require.ensure([], () => r(require('@/marketActivities/shopJoinActivitiesGoods.vue')), 'marketActivities')
const skuActivity = r => require.ensure([], () => r(require('@/marketActivities/skuActivity.vue')), 'marketActivities')
const activityList = r => require.ensure([], () => r(require('@/marketActivities/activityList.vue')), 'marketActivities')
const discount = r => require.ensure([], () => r(require('@/marketActivities/discount.vue')), 'marketActivities')
const createdActivity = r => require.ensure([], () => r(require('@/marketActivities/createdActivity.vue')), 'marketActivities')
const aditBindSpu = r => require.ensure([], () => r(require('@/marketActivities/aditBindSpu.vue')), 'marketActivities')
const aditBindSpu2 = r => require.ensure([], () => r(require('@/marketActivities/aditBindSpu2.vue')), 'marketActivities')
const addCouponPackage = r => require.ensure([], () => r(require('@/marketActivities/addCouponPackage.vue')), 'marketActivities')
const bindCoupon = r => require.ensure([], () => r(require('@/marketActivities/bindCoupon.vue')), 'marketActivities')
const activityOne = r => require.ensure([], () => r(require('@/marketActivities/activityOne.vue')), 'marketActivities')
const activityTwo = r => require.ensure([], () => r(require('@/marketActivities/activityTwo.vue')), 'marketActivities')
const activityThree = r => require.ensure([], () => r(require('@/marketActivities/activityThree.vue')), 'marketActivities')
const datas = r => require.ensure([], () => r(require('@/marketActivities/datas.vue')), 'marketActivities')
//订单管理
const commodityOrderInquiry = r => require.ensure([], () => r(require('@/orderManagement/commodityOrderInquiry.vue')), 'orderManagement')
const refundApplicationForm = r => require.ensure([], () => r(require('@/orderManagement/refundApplicationForm.vue')), 'orderManagement')
const notPushedOrderList = r => require.ensure([], () => r(require('@/orderManagement/notPushedOrderList.vue')), 'orderManagement')
const refound = r => require.ensure([], () => r(require('@/orderManagement/refound.vue')), 'orderManagement')
// 财务管理 financialManagement
const financialAudit = r => require.ensure([], () => r(require('@/financialManagement/financialAudit.vue')), 'financialManagement')
const cashRecordsList = r => require.ensure([], () => r(require('@/financialManagement/cashRecordsList.vue')), 'financialManagement')
const transactionCompletionReport = r => require.ensure([], () => r(require('@/financialManagement/transactionCompletionReport.vue')), 'financialManagement')
const transactionCompletedProductSummary = r => require.ensure([], () => r(require('@/financialManagement/transactionCompletedProductSummary.vue')), 'financialManagement')
const salaryManagement = r => require.ensure([], () => r(require('@/financialManagement/salaryManagement.vue')), 'financialManagement')
const monthDetails = r => require.ensure([], () => r(require('@/financialManagement/monthDetails.vue')), 'financialManagement')
const dayDetails = r => require.ensure([], () => r(require('@/financialManagement/dayDetails.vue')), 'financialManagement')
const financialReport = r => require.ensure([], () => r(require('@/financialManagement/financialReport.vue')), 'financialManagement')

//统计管理 statisticalManagement
const basicStatistics = r => require.ensure([], () => r(require('@/statisticalManagement/basicStatistics.vue')), 'statisticalManagement')
const shopList = r => require.ensure([], () => r(require('@/statisticalManagement/shopList.vue')), 'statisticalManagement')
const dataQuerySystem = r => require.ensure([], () => r(require('@/statisticalManagement/dataQuerySystem.vue')), 'statisticalManagement')
//微信设置
const automaticResponse = r => require.ensure([], () => r(require('@/WechatSet/automaticResponse.vue')), 'WechatSet')
//客服服务
const questionType = r => require.ensure([], () => r(require('@/customerService/questionType.vue')), 'customerService')
const questionList = r => require.ensure([], () => r(require('@/customerService/questionList.vue')), 'customerService')
//权限管理 authorityManagement
const departmentManagement = r => require.ensure([], () => r(require('@/authorityManagement/departmentManagement.vue')), 'authorityManagement')
const memberManagement = r => require.ensure([], () => r(require('@/authorityManagement/memberManagement.vue')), 'authorityManagement')
const moduleManagement = r => require.ensure([], () => r(require('@/authorityManagement/moduleManagement.vue')), 'authorityManagement')
const authoritySet = r => require.ensure([], () => r(require('@/authorityManagement/authoritySet.vue')), 'authorityManagement')
const memberAuthoritySet = r => require.ensure([], () => r(require('@/authorityManagement/memberAuthoritySet.vue')), 'authorityManagement')
//返利体系
const highRebate = r => require.ensure([], () => r(require('@/rebateSystem/highRebate.vue')), 'rebateSystem')
//金币管理 goldManagement
const goldPoolManagement = r => require.ensure([], () => r(require('@/goldManagement/goldPoolManagement.vue')), 'goldManagement')
const goldPayment = r => require.ensure([], () => r(require('@/goldManagement/goldPayment.vue')), 'goldManagement')
const goldDeduction = r => require.ensure([], () => r(require('@/goldManagement/goldDeduction.vue')), 'goldManagement')
const fillLog = r => require.ensure([], () => r(require('@/goldManagement/fillLog.vue')), 'goldManagement')
const viewGoldLog = r => require.ensure([], () => r(require('@/goldManagement/viewGoldLog.vue')), 'goldManagement')
const viewLog = r => require.ensure([], () => r(require('@/goldManagement/viewLog.vue')), 'goldManagement')

//发现
const runPics = r => require.ensure([], () => r(require('@/find/runPics.vue')), 'find')
const customizeTopic = r => require.ensure([], () => r(require('@/find/customizeTopic.vue')), 'find')
const materialManage = r => require.ensure([], () => r(require('@/find/materialManage.vue')), 'find')
const recycleBin = r => require.ensure([], () => r(require('@/find/recycleBin.vue')), 'find')
const aditFindMaterial = r => require.ensure([], () => r(require('@/find/aditFindMaterial.vue')), 'find')
//以下暂时无
const publishBox = r => require.ensure([], () => r(require('@/find/publishBox.vue')), 'find')
const draftBox = r => require.ensure([], () => r(require('@/find/draftBox.vue')), 'find')
const timingPublishBox = r => require.ensure([], () => r(require('@/find/timingPublishBox.vue')), 'find')
const findMaterial = r => require.ensure([], () => r(require('@/find/findMaterial.vue')), 'find')
const pics = r => require.ensure([], () => r(require('@/find/pics.vue')), 'find')

export default new Router({
  name: 'rout',
  mode: 'history',
  base: __dirname,
  routes: [
    {path: "/", component: main},
    {
      path: "/main", component: main,
      // children:[
      //   {path:'/news',component:news},
      //   {path:'/hd',component:hd}
      // ]
    },
    {path: '/adit', component: adit},
    {path: '/aa', component: aa},
    {path: "/test", component: test},
    {path: "/users", component: users},
    {path: "/xw", component: xw},
    {path: "/yy", component: yy},
    {path: "/weituisong", component: weituisong},
    //会员管理
    {path: "/changePassword", component: changePassword},
    {path: "/memberList", component: memberList},
    {path: "/teamList", component: teamList},
    {path: "/membershipReview", component: membershipReview},
    {path: "/realNameVertification", component: realNameVertification},
    {path: "/orderInquire", component: orderInquire},
    {path: "/shopNotice", component: shopNotice},
    {path: "/accountInquiry", component: accountInquiry},
    {path: "/userInquiry", component: userInquiry},
    {path: "/shopMergeList", component: shopMergeList},
    {path: "/clientManagerAuditList", component: clientManagerAuditList},
    {path: "/dataAttribute", component: dataAttribute},
    {path: "/downGradeList", component: downGradeList},
    {path: "/blackList", component: blackList},
    {path: "/physicalStore", component: physicalStore},
    //    商城管理
    {path: "/mallSetup", component: mallSetup},
    {path: "/qiqiaoPlateSetup", component: qiqiaoPlateSetup},
    {path: "/selfDefineProduct", component: selfDefineProduct},
    {path: "/joinCommodityActivityPage", component: joinCommodityActivityPage},
    {path: "/templateSet", component: templateSet},
    {path: "/secondPage", component: secondPage},
    {path: "/secondAdit", component: secondAdit},
    {path: "/secondAdit2", component: secondAdit2},
    {path: "/firstPage", component: firstPage},
    {path: "/firstPageRunPics", component: firstPageRunPics},
    {path: "/TBBB", component: TBBB},
    {path: "/TAAA", component: TAAA},
    {path: "/joinActivityProducts", component: joinActivityProducts},
    {path: "/commodityList", component: commodityList},
    //仓库管理
    {path: "/warehouseList", component: warehouseList},
    //    商品管理
    {path: "/synchronizeCommodityLibrary", component: synchronizeCommodityLibrary},
    {path: "/commodity", component: commodity, meta: {keepAlive: true}},
    {path: "/combinationCommodity", component: combinationCommodity},
    {path: "/frontModule", component: frontModule},//不能用class命名 特殊
    {path: "/brand", component: brand},
    {path: "/rebate", component: rebate},
    {path: "/label", component: label},
    {path: "/setSecond", component: setSecond},
    {path: "/inquirySpu", component: inquirySpu},
    {path: "/publish1", component: publish1},
    {path: "/publish10", component: publish10},
    {path: "/publish2", component: publish2},
    {path: "/bindSpu", component: bindSpu},
    {path: "/FMadit", component: FMadit},
    {path: "/originPlace", component: originPlace},
    //营销活动
    {path: "/couponsList", component: couponsList},
    {path: "/rushBuy", component: rushBuy},
    {path: "/shopJoinActivitiesGoods", component: shopJoinActivitiesGoods},
    {path: "/skuActivity", component: skuActivity},
    // {path:"/activityList",component:activityList,meta:{keepAlive:true}},//缓存页面
    {path: '/activityList', component: activityList, name: 'activityList'},
    {path: "/discount", component: discount},
    {path: "/createdActivity", component: createdActivity},
    {path: "/aditBindSpu", component: aditBindSpu, name: 'aditBindSpu'},
    {path: "/aditBindSpu2", component: aditBindSpu2},
    // { path: '/aditBindSpu',component:aditBindSpu, meta:{keepAlive:true}},//有的组件跳该组件时,页面不刷新
    {path: "/addCouponPackage", component: addCouponPackage},
    {path: "/bindCoupon", component: bindCoupon},
    {path: "/activityOne", component: activityOne},
    {path: "/activityTwo", component: activityTwo},
    {path: "/activityThree", component: activityThree},
    {path: "/datas", component: datas},

    //订单管理
    {path: "/commodityOrderInquiry", component: commodityOrderInquiry},
    {path: "/refundApplicationForm", component: refundApplicationForm},
    {path: "/notPushedOrderList", component: notPushedOrderList},
    {path: "/refound", component: refound},
    //财务管理
    {path: "/cashRecordsList", component: cashRecordsList},
    {path: "/financialAudit", component: financialAudit},
    {path: "/transactionCompletionReport", component: transactionCompletionReport},
    {path: "/transactionCompletedProductSummary", component: transactionCompletedProductSummary},
    {path: "/salaryManagement", component: salaryManagement},
    {path: "/monthDetails", component: monthDetails},
    {path: "/dayDetails", component: dayDetails},
    {path: "/financialReport", component: financialReport},
    //统计管理
    {path: "/basicStatistics", component: basicStatistics},
    {path: "/shopList", component: shopList},
    {path: "/dataQuerySystem", component: dataQuerySystem},
    //微信设置
    {path: "/automaticResponse", component: automaticResponse},
    //    客服服务
    {path: "/questionType", component: questionType},
    {path: "/questionList", component: questionList},
    //    权限管理
    {path: "/departmentManagement", component: departmentManagement},
    {path: "/memberManagement", component: memberManagement},
    {path: "/moduleManagement", component: moduleManagement},
    {path: "/authoritySet", component: authoritySet},
    {path: "/memberAuthoritySet", component: memberAuthoritySet},
    //返利体系
    {path: "/highRebate", component: highRebate},
    //发现
    {path: "/runPics", component: runPics},
    {path: "/customizeTopic", component: customizeTopic},
    {path: "/materialManage", component: materialManage},
    {path: "/recycleBin", component: recycleBin},
    {path: "/publishBox", component: publishBox},
    {path: "/draftBox", component: draftBox},
    {path: "/timingPublishBox", component: timingPublishBox},
    {path: "/findMaterial", component: findMaterial},
    {path: "/pics", component: pics},
    {path: "/aditFindMaterial", component: aditFindMaterial},
    //金币管理
    {path: "/goldPoolManagement", component: goldPoolManagement},
    {path: "/goldPayment", component: goldPayment},
    {path: "/goldDeduction", component: goldDeduction},
    {path: "/fillLog", component: fillLog},
    {path: "/viewGoldLog", component: viewGoldLog},
    {path: "/viewLog", component: viewLog},


  ]
})
