(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["params"],{"22b6":function(e,t,n){"use strict";function a(e){var t=e,n=t.appContext.config.globalProperties.$http;return n}n.d(t,"a",(function(){return a}))},"2be9":function(e,t,n){"use strict";n("dcaf")},"9fd9":function(e,t,n){"use strict";n.r(t);var a=n("7a23"),c={class:""},l=Object(a["m"])("首页"),r=Object(a["m"])("商品管理"),u=Object(a["m"])("分类参数"),o=Object(a["m"])("选择商品分类: "),i=Object(a["m"])("添加参数"),b=Object(a["m"])("+ New Tag"),d=Object(a["m"])("添加属性"),s=Object(a["m"])("+ New Tag"),j={class:"dialog-footer"},O=Object(a["m"])("取 消"),m=Object(a["m"])("确 定"),f={class:"dialog-footer"},p=Object(a["m"])("取 消"),_=Object(a["m"])("确 定");function g(e,t,n,g,w,h){var y=Object(a["N"])("el-breadcrumb-item"),v=Object(a["N"])("el-breadcrumb"),C=Object(a["N"])("el-alert"),V=Object(a["N"])("el-cascader"),k=Object(a["N"])("el-col"),I=Object(a["N"])("el-row"),N=Object(a["N"])("el-button"),D=Object(a["N"])("el-tag"),F=Object(a["N"])("el-input"),x=Object(a["N"])("el-table-column"),E=Object(a["N"])("el-tooltip"),$=Object(a["N"])("el-table"),S=Object(a["N"])("el-tab-pane"),z=Object(a["N"])("el-tabs"),R=Object(a["N"])("el-card"),U=Object(a["N"])("el-form-item"),J=Object(a["N"])("el-form"),A=Object(a["N"])("el-dialog");return Object(a["E"])(),Object(a["j"])("div",c,[Object(a["n"])(v,{"separator-class":"el-icon-arrow-right"},{default:Object(a["cb"])((function(){return[Object(a["n"])(y,{to:{path:"/home"}},{default:Object(a["cb"])((function(){return[l]})),_:1}),Object(a["n"])(y,null,{default:Object(a["cb"])((function(){return[r]})),_:1}),Object(a["n"])(y,null,{default:Object(a["cb"])((function(){return[u]})),_:1})]})),_:1}),Object(a["n"])(R,null,{default:Object(a["cb"])((function(){return[Object(a["n"])(C,{title:"注意:只允许为第三级分类设置相关参数",type:"warning","show-icon":""}),Object(a["n"])(I,null,{default:Object(a["cb"])((function(){return[Object(a["n"])(k,null,{default:Object(a["cb"])((function(){return[Object(a["n"])("span",null,[o,Object(a["n"])(V,{options:e.state.cateList,props:e.props,onChange:e.handleChange,modelValue:e.state.selectedID,"onUpdate:modelValue":t[1]||(t[1]=function(t){return e.state.selectedID=t}),"expand-trigger":"hover",placeholder:"请选择"},null,8,["options","props","onChange","modelValue"])])]})),_:1})]})),_:1}),Object(a["n"])(z,{modelValue:e.activeName,"onUpdate:modelValue":t[2]||(t[2]=function(t){return e.activeName=t}),onTabClick:e.handleClick},{default:Object(a["cb"])((function(){return[Object(a["n"])(S,{label:"动态参数",name:"many"},{default:Object(a["cb"])((function(){return[Object(a["n"])(N,{type:"primary",size:"mini",disabled:e.isBtnsDisabled,onClick:e.add},{default:Object(a["cb"])((function(){return[i]})),_:1},8,["disabled","onClick"]),Object(a["db"])(Object(a["n"])($,{data:e.state.manyData,style:{width:"100%"},border:"",stripe:"",fit:""},{default:Object(a["cb"])((function(){return[Object(a["n"])(x,{type:"expand"},{default:Object(a["cb"])((function(t){return[(Object(a["E"])(!0),Object(a["j"])(a["b"],null,Object(a["L"])(t.row.attr_vals,(function(n,c){return Object(a["E"])(),Object(a["j"])(D,{key:c,closable:"",onClose:function(n){return e.handleClose(c,t.row)}},{default:Object(a["cb"])((function(){return[Object(a["m"])(Object(a["R"])(n),1)]})),_:2},1032,["onClose"])})),128)),t.row.inputVisible?(Object(a["E"])(),Object(a["j"])(F,{key:0,class:"input-new-tag",modelValue:t.row.inputValue,"onUpdate:modelValue":function(e){return t.row.inputValue=e},ref:"TagInput",size:"small",onKeyup:Object(a["eb"])((function(n){return e.handleInputConfirm(t.row)}),["enter"])},null,8,["modelValue","onUpdate:modelValue","onKeyup"])):(Object(a["E"])(),Object(a["j"])(N,{key:1,class:"button-new-tag",size:"small",onClick:function(n){return e.showInput(t.row)}},{default:Object(a["cb"])((function(){return[b]})),_:2},1032,["onClick"]))]})),_:1}),Object(a["n"])(x,{type:"index"}),Object(a["n"])(x,{prop:"attr_name",label:"参数名称"}),Object(a["n"])(x,{label:"操作"},{default:Object(a["cb"])((function(t){return[Object(a["n"])(E,{class:"item",effect:"dark",content:"编辑",placement:"top",enterable:!1},{default:Object(a["cb"])((function(){return[Object(a["n"])(N,{type:"primary",icon:"el-icon-edit",size:"mini",onClick:function(n){return e.editor(t.row)}},null,8,["onClick"])]})),_:2},1024),Object(a["n"])(E,{class:"item",effect:"dark",content:"删除",placement:"top",enterable:!1},{default:Object(a["cb"])((function(){return[Object(a["n"])(N,{type:"danger",icon:"el-icon-delete",size:"mini"})]})),_:1})]})),_:1})]})),_:1},8,["data"]),[[a["Z"],e.isShow]])]})),_:1}),Object(a["n"])(S,{label:"静态属性",name:"only"},{default:Object(a["cb"])((function(){return[Object(a["n"])(N,{type:"primary",size:"mini",disabled:e.isBtnsDisabled,onClick:e.add},{default:Object(a["cb"])((function(){return[d]})),_:1},8,["disabled","onClick"]),Object(a["db"])(Object(a["n"])($,{data:e.state.onlyData,style:{width:"100%"},border:"",stripe:"",fit:""},{default:Object(a["cb"])((function(){return[Object(a["n"])(x,{type:"expand"},{default:Object(a["cb"])((function(t){return[(Object(a["E"])(!0),Object(a["j"])(a["b"],null,Object(a["L"])(t.row.attr_vals,(function(n,c){return Object(a["E"])(),Object(a["j"])(D,{key:c,closable:"",onClose:function(n){return e.handleClose(c,t.row)}},{default:Object(a["cb"])((function(){return[Object(a["m"])(Object(a["R"])(n),1)]})),_:2},1032,["onClose"])})),128)),t.row.inputVisible?(Object(a["E"])(),Object(a["j"])(F,{key:0,class:"input-new-tag",modelValue:t.row.inputValue,"onUpdate:modelValue":function(e){return t.row.inputValue=e},ref:"TagInput",size:"small",onKeyup:Object(a["eb"])((function(n){return e.handleInputConfirm(t.row)}),["enter"])},null,8,["modelValue","onUpdate:modelValue","onKeyup"])):(Object(a["E"])(),Object(a["j"])(N,{key:1,class:"button-new-tag",size:"small",onClick:function(n){return e.showInput(t.row)}},{default:Object(a["cb"])((function(){return[s]})),_:2},1032,["onClick"]))]})),_:1}),Object(a["n"])(x,{type:"index"}),Object(a["n"])(x,{prop:"attr_name",label:"属性名称"}),Object(a["n"])(x,{label:"操作"},{default:Object(a["cb"])((function(t){return[Object(a["n"])(E,{class:"item",effect:"dark",content:"编辑",placement:"top",enterable:!1},{default:Object(a["cb"])((function(){return[Object(a["n"])(N,{type:"primary",icon:"el-icon-edit",size:"mini",onClick:function(n){return e.editor(t.row)}},null,8,["onClick"])]})),_:2},1024),Object(a["n"])(E,{class:"item",effect:"dark",content:"删除",placement:"top",enterable:!1},{default:Object(a["cb"])((function(){return[Object(a["n"])(N,{type:"danger",icon:"el-icon-delete",size:"mini"})]})),_:1})]})),_:1})]})),_:1},8,["data"]),[[a["Z"],e.isShow]])]})),_:1})]})),_:1},8,["modelValue","onTabClick"])]})),_:1}),Object(a["n"])(A,{title:"添加"+e.title,modelValue:e.Show,"onUpdate:modelValue":t[5]||(t[5]=function(t){return e.Show=t}),width:"30%",onClose:e.addDialogClosed},{footer:Object(a["cb"])((function(){return[Object(a["n"])("span",j,[Object(a["n"])(N,{onClick:t[4]||(t[4]=function(t){return e.Show=!1})},{default:Object(a["cb"])((function(){return[O]})),_:1}),Object(a["n"])(N,{type:"primary",onClick:e.commitAddForm},{default:Object(a["cb"])((function(){return[m]})),_:1},8,["onClick"])])]})),default:Object(a["cb"])((function(){return[Object(a["n"])(J,{model:e.addForm,rules:e.addRules,ref:"addFormRef","label-width":"100px",class:"demo-ruleForm"},{default:Object(a["cb"])((function(){return[Object(a["n"])(U,{label:e.title,prop:"isAdd"},{default:Object(a["cb"])((function(){return[Object(a["n"])(F,{modelValue:e.addForm.isAdd,"onUpdate:modelValue":t[3]||(t[3]=function(t){return e.addForm.isAdd=t})},null,8,["modelValue"])]})),_:1},8,["label"])]})),_:1},8,["model","rules"])]})),_:1},8,["title","modelValue","onClose"]),Object(a["n"])(A,{title:"修改"+e.title,modelValue:e.editShow,"onUpdate:modelValue":t[8]||(t[8]=function(t){return e.editShow=t}),width:"30%",onClose:e.editDialogClosed},{footer:Object(a["cb"])((function(){return[Object(a["n"])("span",f,[Object(a["n"])(N,{onClick:t[7]||(t[7]=function(t){return e.editShow=!1})},{default:Object(a["cb"])((function(){return[p]})),_:1}),Object(a["n"])(N,{type:"primary",onClick:e.commitEdit},{default:Object(a["cb"])((function(){return[_]})),_:1},8,["onClick"])])]})),default:Object(a["cb"])((function(){return[Object(a["n"])(J,{model:e.state.editForm,rules:e.editRules,ref:"editFormRef","label-width":"100px",class:"demo-ruleForm"},{default:Object(a["cb"])((function(){return[Object(a["n"])(U,{label:e.title,prop:"attr_name"},{default:Object(a["cb"])((function(){return[Object(a["n"])(F,{modelValue:e.state.editForm.attr_name,"onUpdate:modelValue":t[6]||(t[6]=function(t){return e.state.editForm.attr_name=t})},null,8,["modelValue"])]})),_:1},8,["label"])]})),_:1},8,["model","rules"])]})),_:1},8,["title","modelValue","onClose"])])}var w=n("22b6"),h=n("f930"),y=Object(a["o"])({name:"",components:{},setup(){const e=Object(a["p"])(),t=Object(a["I"])({cateList:[],selectedID:[],manyData:[],onlyData:[],currentParams:"",editForm:{},inputValue:"",inputVisible:!1}),n=async()=>{const{data:n}=await Object(w["a"])(e).get("categories");if(200!==n.meta.status)return Object(h["a"])(e).error("获取分类列表失败");t.cateList=n.data};n();const c=Object(a["I"])({value:"cat_id",label:"cat_name",children:"children",expandTrigger:"hover"}),l=async()=>{if(3!==t.selectedID.length)return void(t.selectedID=[]);const{data:n}=await Object(w["a"])(e).get(`categories/${s.value}/attributes`,{params:{sel:u.value}});if(200!==n.meta.status)return Object(h["a"])(e).error("请求params失败");n.data.forEach(e=>{e.attr_vals=e.attr_vals?e.attr_vals.split(" "):[],e.inputVisible=t.inputVisible,e.inputValue=t.inputValue}),"many"===u.value?t.manyData=n.data:t.onlyData=n.data},r=async()=>{l()};let u=Object(a["J"])("many");const o=Object(a["J"])(!1),i=()=>{o.value=!0},b=()=>{l()},d=Object(a["J"])(!1),s=Object(a["h"])(()=>3===t.selectedID.length?(d.value=!0,t.selectedID[2]):null),j=Object(a["h"])(()=>3!==t.selectedID.length),O=Object(a["h"])(()=>"many"===u.value?"动态参数":"静态属性"),m=Object(a["J"])(null),f=Object(a["I"])({isAdd:""}),p=async()=>{null!==m.value&&m.value.validate(async t=>{if(!t)return;const{data:n}=await Object(w["a"])(e).post(`categories/${s.value}/attributes`,{attr_name:f.isAdd,attr_sel:u.value});if(201!==n.meta.status)return Object(h["a"])(e).error("添加params失败");o.value=!1,l()})},_=Object(a["I"])({isAdd:[{type:"string",required:!0,message:"请输入参数名称",trigger:"blur"},{min:2,max:8,message:"长度在 2  到 8 个字符",trigger:"blur"}]}),g=Object(a["I"])({attr_name:[{type:"string",required:!0,message:"请修改参数名称",trigger:"blur"},{min:2,max:8,message:"长度在 2  到 8 个字符",trigger:"blur"}]}),y=()=>{null!==m.value&&m.value.resetFields()},v=Object(a["J"])(!1),C=Object(a["J"])(null),V=async n=>{const{data:a}=await Object(w["a"])(e).get(`categories/${s.value}/attributes/${n.attr_id}`,{attr_sel:u.value});if(200!==a.meta.status)return Object(h["a"])(e).error("查询params失败");t.editForm=a.data,v.value=!0},k=()=>{null!==C.value&&C.value.resetFields()},I=()=>{null!==C.value&&C.value.validate(async n=>{if(!n)return;const{data:a}=await Object(w["a"])(e).put(`categories/${s.value}/attributes/${t.editForm.attr_id}}`,{attr_name:t.editForm.attr_name,attr_sel:u.value});if(200!==a.meta.status)return Object(h["a"])(e).error("提交params失败");v.value=!1,l()})};let N=Object(a["J"])(null);const D=e=>{e.inputVisible=!0,F()},F=()=>{Object(a["v"])(()=>{N.value})},x=async t=>{t.inputVisible=!1,t.attr_vals.push(t.inputValue.trim()),t.inputValue="";const{data:n}=await Object(w["a"])(e).put(`categories/${s.value}/attributes/${t.attr_id}`,{attr_name:t.attr_name,attr_sel:t.attr_sel,attr_vals:t.attr_vals.join(" ")});200!==n.meta.status&&Object(h["a"])(e).error("更新失败"),Object(h["a"])(e).success("更新成功")};async function E(t,n){n.inputVisible=!1,n.attr_vals.splice(t,1);const{data:a}=await Object(w["a"])(e).delete(`categories/${s.value}/attributes/${n.attr_id}`);200!==a.meta.status&&Object(h["a"])(e).error("删除失败"),Object(h["a"])(e).success("删除成功")}return Object(a["B"])(()=>{F()}),{state:t,props:c,handleChange:r,activeName:u,handleClick:b,isBtnsDisabled:j,cateId:s,isShow:d,title:O,Show:o,add:i,addForm:f,addFormRef:m,commitAddForm:p,addRules:_,addDialogClosed:y,editShow:v,editor:V,editFormRef:C,editRules:g,editDialogClosed:k,commitEdit:I,handleInputConfirm:x,showInput:D,TagInput:N,handleClose:E}}});n("2be9");y.render=g;t["default"]=y},dcaf:function(e,t,n){},f930:function(e,t,n){"use strict";function a(e){var t=e,n=t.appContext.config.globalProperties.$message;return n}n.d(t,"a",(function(){return a}))}}]);
//# sourceMappingURL=params.b1ecac2c.js.map