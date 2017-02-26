
$(document).ready(function(){
    TableInit();
    // $("#btn_add").on("click", addColum);
    $("#Contacts_add_d").on("click", function(){
        if($(".contact_text").length < 8){
            $("#contact_d").append('<br/><div class="col-sm-3"></div><div class="col-sm-9"><input type="text" class="form-control contact_text" placeholder="Contacts" name="People"></div>');
        }
        $(".contact_text").last().focus();
    })
    $("#btn_delete").on("click", function(){$("#del_alert").show()});

    $("#form_data").on("submit", function(evt){
        evt.preventDefault();
        var action = $(this).attr('action');
        var $container = $("#btn_edit");
        var oData = $(this).serialize();
        var tableData = $('#contacts').bootstrapTable('getData');
        var aModID = [];
        var count = "1";
        for(i=0; i<tableData.length; i++){
            aModID.push(tableData[i].ModID);
        }
        for(i=0; i<aModID.sort().length; i++){
            if(aModID[i] == count){
                count++;
                continue;
            }else{
                oData.ModID = count;
                break;
            }
        }
        if(count == aModID.length+1)
        oData = oData + "&ModID=" + count;
        $.ajax({
            url: action,
            type: 'POST',
            data: oData,
            success: function(data){
                $('#Module_add_dialog').modal('hide');
                for(var i in data){
                    $('#contacts').bootstrapTable('append',data[i]);
                }
            },
            error: function(){
            $container.html('There was a problem.');
            }
        });
    })

    // $('body').click(function (event) {
    //         var target = $(event.target);       // 判断自己当前点击的内容
    //         if (!target.hasClass('popover')
    //                 && !target.hasClass('pop')
    //                 && !target.hasClass('popover-content')
    //                 && !target.hasClass('popover-title')
    //                 && !target.hasClass('arrow')
    //                 && !target.hasClass('btn')) {
    //             $('.popover').popover('hide');      // 当点击body的非弹出框相关的内容的时候，关闭所有popover
    //         }
    //     });

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
        onPostBody:initDetail,
        columns: [{
            radio:true
        },
        {
            field: 'ModID',
            title: 'ModID',
            class: "hide"
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
                // var btn = '<button type="button" class="btn btn-default btn_add" data-container="body" data-toggle="popover" data-placement="top"><span class="glyphicon glyphicon-plus" aria-hidden="true"></span></button>';
                var addPeople = '<a href="#" class="addPeople" data-Module=></a>'
                content = '<span>'+value+'</span>';
                return addPeople + " " + content;
            } 
        }, {
            field: 'Leader',
            title: '老大',
            width: 200
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
function initDetail(e,args){
    /*
        $('.btn_add').popover({
            html: true,
            content:$("#add_btn_popover").html(),
            trigger: "click",
            template: '<div class="popover popover-wid" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
    });*/
    $('.addPeople').editable({
            type: "text",                //编辑框的类型。支持text|textarea|select|date|checklist等
            title: "新增负责人",              //编辑框的标题
            display:function(value, sourceData){
                $(this).html("Add");
            },
            mode: "popup",              //编辑框的模式：支持popup和inline两种模式，默认是popup
            validate: function (value) { //字段验证
                if (!$.trim(value)) {
                    return '不能为空';
                }
            },
            url:"/addPeople",
            pk : 1,
            name :"People",
            params: function(params){
                params.ModID = $('#contacts').bootstrapTable('getSelections')[0].ModID;
                return params;
            },
            success: addPeopleSuccess
        });
}
function getColumnInfo(){
    var value = $(this).serialize();
}

function closePopover(ele){
$(this).popover("toggle");
}

function addPeopleSuccess(){

}