"use strict";(self["webpackChunkadmin_pc"]=self["webpackChunkadmin_pc"]||[]).push([[4],{4:function(t,e,s){s.r(e),s.d(e,{default:function(){return c}});var o=function(){var t=this,e=t._self._c;return e("div",{staticClass:"contain_box"},[e("div",{staticClass:"btn_all"},[e("button",{on:{click:t.onClear}},[t._v("清除")]),e("button",{on:{click:t.onRotate}},[t._v("旋转")]),e("button",{on:{click:t.onDownload}},[t._v("下载")]),e("button",{on:{click:t.onSubmit}},[t._v("提交")]),e("input",{directives:[{name:"model",rawName:"v-model",value:t.strokeColor,expression:"strokeColor"}],attrs:{type:"color",id:"colorPicker"},domProps:{value:t.strokeColor},on:{input:function(e){e.target.composing||(t.strokeColor=e.target.value)}}})]),e("canvas",{ref:"cvs",attrs:{id:"cvs",width:"400",height:"300"}}),t.signatureData?e("img",{attrs:{id:"signatureImage",src:t.signatureData,alt:"Signature Image"}}):t._e()])},a=[],i={name:"index",components:{},data(){return{loading:!0,isDrawing:!1,strokeColor:"#000000",signatureData:""}},watch:{},created(){},mounted(){this.initCanvas()},watch:{strokeColor(t){const e=this.$refs.cvs.getContext("2d");e.strokeStyle=t}},methods:{initCanvas(){const t=this.$refs.cvs,e=t.getContext("2d");e.strokeStyle=this.strokeColor,e.fillStyle="#dddddd",e.fillRect(0,0,t.width,t.height),this.addEvents(t,"mousedown",(t=>this.startDrawing(t,e))),this.addEvents(t,"mousemove",(t=>this.draw(t,e))),this.addEvents(t,"mouseup",(()=>this.stopDrawing()))},addEvents(t,e,s){const o=navigator.userAgent.match(/Mobile/),a={mousedown:"touchstart",mousemove:"touchmove",mouseup:"touchend"};o?t.addEventListener(a[e],(t=>{s(t.touches[0])})):t.addEventListener(e,(t=>{s(t)}))},startDrawing(t,e){this.isDrawing=!0,e.beginPath(),e.moveTo(t.pageX-this.$refs.cvs.offsetLeft,t.pageY-this.$refs.cvs.offsetTop)},draw(t,e){this.isDrawing&&(e.lineWidth=5,e.lineTo(t.pageX-this.$refs.cvs.offsetLeft,t.pageY-this.$refs.cvs.offsetTop),e.strokeStyle=this.strokeColor,e.stroke())},stopDrawing(){this.isDrawing=!1},onClear(){const t=this.$refs.cvs,e=t.getContext("2d");e.clearRect(0,0,t.width,t.height),e.fillStyle="#dddddd",e.fillRect(0,0,t.width,t.height),this.signatureData=""},onRotate(){const t=this.$refs.cvs,e=t.getContext("2d"),s=new Image;s.src=t.toDataURL("image/png"),s.onload=()=>{const{width:o,height:a}=t;t.width=a,t.height=o,e.translate(t.width/2,t.height/2),e.rotate(Math.PI/2),e.drawImage(s,-a/2,-o/2),e.resetTransform()}},onDownload(){const t=this.$refs.cvs,e=document.createElement("a");e.setAttribute("download","signature.png"),e.href=t.toDataURL("image/png"),e.click()},onSubmit(){const t=this.$refs.cvs;this.signatureData=t.toDataURL("image/png")}}},n=i,r=s(1001),d=(0,r.Z)(n,o,a,!1,null,"528593e8",null),c=d.exports}}]);