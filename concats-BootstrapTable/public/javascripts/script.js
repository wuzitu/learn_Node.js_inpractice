
$(document).ready(function(){
    var oTable = new TableInit();
    $("#btn_add").on("click", addColum);
});

var TableInit  = function(){
    $('#contacts').bootstrapTable({
        url: '/contacts/Table',         //请求后台的URL（*）
        method: 'post',                      //请求方式（*）
        toolbar: '#toolbar',                //工具按钮用哪个容器
        striped: true,                      //是否显示行间隔色
        cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
        pagination: false,                   //是否显示分页（*）
        sortable: true,                     //是否启用排序
        sortOrder: "asc",                   //排序方式
        strictSearch: true,
        clickToSelect: true,                //是否启用点击选中行
        //height: 460,                        //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
        uniqueId: "Module",                     //每一行的唯一标识，一般为主键列
        cardView: false,                    //是否显示详细视图
        detailView: false,                   //是否显示父子表
        checkboxHeader: true,
        search: true,  //搜索框
        strictSearch: false,  //全匹配搜索
        searchOnEnterKey: false, //回车键搜索，false是自动搜索。
        showRefresh:  true, //刷新按钮
        showToggle: true,  //切换试图（table/card）按钮
        showColumns: true, //显示所有列&可选按钮
        minimumCountColumns: 2,  //最小显示列
        // detailView :true,  //下拉详细按钮
        // detailFormatter :showDetail,
        columns: [{
            checkbox:true
        },
        {
            field: 'Module',
            title: '模块',
            width: 100,
            sortable :true,
        }, {
            field: 'People',
            title: '负责人',
            formatter: function(value,row,index){
                var btn = '<button id="btn_add" type="button" class="btn btn-default"><span class="glyphicon glyphicon-plus" aria-hidden="true"></span></button>';
                content = '<a href = "#">'+value+'</a>';
                return btn + " " + content;
            } 
        }, {
            field: 'Leader',
            title: '老大',
            width: 100
        }, {
            field: 'Remarks',
            title: '备注'
        },{
            field: 'UpdateTime',
            title: '更新日期',
            width: 10,
            sortable :true
        }]
        
    });
}

function addColum(){
    $('#contacts').bootstrapTable('append',
    [{
      Module: "Apmgr",
      People: "wulei",
      Leader: "wulei2"}
    ]);
}
// function showDetail(value,row,index){
//     return row.People.split(";").join(" ");
// }