Ext.ns("FileAttachView");var FileAttachView=function(){return new Ext.Panel({id:"FileAttachView",title:"附件列表",iconCls:"menu-attachment",autoScroll:true,items:[new Ext.FormPanel({height:40,frame:false,border:false,id:"FileAttachSearchForm",layout:"hbox",layoutConfig:{padding:"5",align:"middle"},defaults:{xtype:"label",margins:{top:0,right:4,bottom:4,left:4}},items:[{text:"请输入查询条件:"},{text:"文件名"},{xtype:"textfield",width:80,name:"Q_fileName_S_LK"},{text:"创建时间"},{xtype:"textfield",width:80,name:"Q_createtime_S_LK"},{text:"扩展名"},{xtype:"textfield",width:60,name:"Q_ext_S_LK"},{text:"上传者"},{xtype:"textfield",width:80,name:"Q_creator_S_LK"},{xtype:"button",text:"查询",iconCls:"search",handler:function(){var a=Ext.getCmp("FileAttachSearchForm");var b=Ext.getCmp("FileAttachGrid");if(a.getForm().isValid()){a.getForm().submit({waitMsg:"正在提交查询",url:__ctxPath+"/system/listFileAttach.do",success:function(d,e){var c=Ext.util.JSON.decode(e.response.responseText);b.getStore().loadData(c);}});}}}]}),this.setup()]});};FileAttachView.prototype.setup=function(){return this.grid();};FileAttachView.prototype.grid=function(){var d=new Ext.grid.CheckboxSelectionModel();var a=new Ext.grid.ColumnModel({columns:[d,new Ext.grid.RowNumberer(),{header:"fileId",dataIndex:"fileId",hidden:true},{header:"文件名",dataIndex:"fileName"},{header:"文件路径",dataIndex:"filePath"},{header:"创建时间",dataIndex:"createtime"},{header:"扩展名",dataIndex:"ext"},{header:"附件类型",dataIndex:"type"},{header:"说明",dataIndex:"note"},{header:"上传者",dataIndex:"creator"},{header:"管理",dataIndex:"fileId",width:50,renderer:function(h,g,e,k,f){var j=e.data.fileId;var i="";if(isGranted("_FileAttachEdit")){i+='&nbsp;<button title="编辑" value=" " class="btn-edit" onclick="FileAttachDetail.show('+j+')"></button>';}return i;}}],defaults:{sortable:true,menuDisabled:false,width:100}});var b=this.store();b.load({params:{start:0,limit:25}});var c=new Ext.grid.GridPanel({id:"FileAttachGrid",tbar:this.topbar(),store:b,trackMouseOver:true,disableSelection:false,loadMask:true,autoHeight:true,cm:a,sm:d,viewConfig:{forceFit:true,enableRowBody:false,showPreview:false},bbar:new Ext.PagingToolbar({pageSize:25,store:b,displayInfo:true,displayMsg:"当前显示从{0}至{1}， 共{2}条记录",emptyMsg:"当前没有记录"})});c.addListener("rowdblclick",function(g,f,h){g.getSelectionModel().each(function(e){if(isGranted("_FileAttachEdit")){FileAttachDetail.show(e.data.fileId);}});});return c;};FileAttachView.prototype.store=function(){var a=new Ext.data.Store({proxy:new Ext.data.HttpProxy({url:__ctxPath+"/system/listFileAttach.do"}),reader:new Ext.data.JsonReader({root:"result",totalProperty:"totalCounts",id:"id",fields:[{name:"fileId",type:"int"},"fileName","filePath","createtime","ext","type","note","creator"]}),remoteSort:true});a.setDefaultSort("fileId","desc");return a;};FileAttachView.prototype.topbar=function(){var a=new Ext.Toolbar({id:"FileAttachFootBar",height:30,bodyStyle:"text-align:left",items:[]});return a;};FileAttachView.remove=function(b){var a=Ext.getCmp("FileAttachGrid");Ext.Msg.confirm("信息确认","您确认要删除该记录吗？",function(c){if(c=="yes"){Ext.Ajax.request({url:__ctxPath+"/system/multiDelFileAttach.do",params:{ids:b},method:"post",success:function(){Ext.ux.Toast.msg("信息提示","成功删除所选记录！");a.getStore().reload({params:{start:0,limit:25}});}});}});};FileAttachView.edit=function(a){new FileAttachForm(a);};