"use strict";(self["webpackChunkadmin_pc"]=self["webpackChunkadmin_pc"]||[]).push([[875],{4875:function(t,i,n){n.r(i),n.d(i,{default:function(){return m}});var e=function(){var t=this,i=t._self._c;return i("div",{staticClass:"contain_box"},[i("el-scrollbar",{ref:"",staticClass:"scrollbar_box"},[i("div",{staticStyle:{"text-align":"right"}},[i("el-button",{attrs:{type:"success",icon:"el-icon-edit",round:"",disabled:t.gonggaoFlag},on:{click:function(i){return t.openGongGao()}}},[t._v("打开公告"),i("i",{staticClass:"el-icon-upload el-icon--right"})])],1),i("div",{staticClass:"cardList_box"},t._l(t.linkList,(function(n,e){return i("div",{key:e,on:{click:function(i){return t.toLinkFn(n.linkstring)}}},[i("Card",{ref:"Card",refInFor:!0,attrs:{content:`${n.name}`,imgUrl:`${n.imgUrl}`,link:t.itemLink}})],1)})),0)]),i("div",{directives:[{name:"show",rawName:"v-show",value:t.gonggaoFlag,expression:"gonggaoFlag"}],staticClass:"DVD_box"},[i("div",{staticClass:"bg_img"}),i("div",{staticClass:"title"},[t._v("暂无新功能！")]),i("div",{staticStyle:{color:"blueviolet","font-size":"20px","font-weight":"900",cursor:"pointer"},on:{click:function(i){return t.closeGongGao()}}},[t._v(" X ")])])],1)},s=[],a=function(){var t=this,i=t._self._c;return i("div",{staticClass:"box"},[i("a",{attrs:{href:t.link,target:"_blank"}},[i("span",[t._v(t._s(t.content))]),i("img",{staticStyle:{width:"50px",height:"50px","object-fit":"cover","object-position":"left"},attrs:{src:t.imgUrl,alt:"图片"}})])])},o=[],l={props:{content:{type:String,default:"Hover Me"},imgUrl:{type:String,default:"#"},link:{type:String,default:"#"}},methods:{}},r=l,c=n(1001),g=(0,c.Z)(r,a,o,!1,null,"54d13329",null),h=g.exports,p={name:"index",components:{Card:h},data(){return{loading:!0,gonggaoFlag:!1,linkList:[{name:"不求人导航",linkstring:"https://www.bqrdh.com",imgUrl:"\thttps://tools.bqrdh.com/static/images/favicon_fox.png"},{name:"动画集合",linkstring:"https://uiverse.io/elements",imgUrl:"https://uiverse.io//favicon-32x32.png"},{name:"掘金",linkstring:"https://juejin.cn/",imgUrl:"https://lf-web-assets.juejin.cn/obj/juejin-web/xitu_juejin_web/static/favicons/apple-touch-icon.png"},{name:"echarts文档",linkstring:"https://echarts.apache.org/zh/cheat-sheet.html",imgUrl:"https://echarts.apache.org/zh/images/favicon.png"},{name:"echarts案例",linkstring:"https://madeapie.com/#/",imgUrl:"https://madeapie.com/favicon.ico"},{name:"three.js",linkstring:"https://www.three3d.cn/docs/index.html",imgUrl:"https://www.three3d.cn/files/favicon.ico"}],itemLink:""}},watch:{},created(){},methods:{closeGongGao(){this.gonggaoFlag=!1},openGongGao(){this.gonggaoFlag=!0},toLinkFn(t){this.itemLink=`${t}`}}},d=p,u=(0,c.Z)(d,e,s,!1,null,"4e1795d0",null),m=u.exports}}]);