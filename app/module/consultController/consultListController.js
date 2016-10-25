var consultListController=angular.module('consultListController', ['httpService','apiUrlService'])

consultListController.controller('consultListFormController', ['$scope','$modal','$state','$stateParams','doGetRequest','doRequestUrl','doPostRequest','PAGE_SIZE',function($scope,$modal,$state,$stateParams,doGetRequest,doRequestUrl,doPostRequest,PAGE_SIZE) {
    
    $scope.goUnSuggestion=function(){

        //按钮颜色变化
        $(".unSuggestion").addClass("active");
        $(".unConsult").removeClass("active");
        //内容隐藏和显示
        $("#unsuggestion").show();
        $("#unconsult").hide();

        //搜索内容和函数的变化
        $scope.search_operation_unoperation=$scope.doSearchUnOperationSuggestion;
        
        //导出url
        $scope.unOperationUrl=$scope.unOperationSuggestionExport;
    }
    $scope.goUnConsult=function(){
        $(".unConsult").addClass("active");
        $(".unSuggestion").removeClass("active");

        $("#unconsult").show();
        $("#unsuggestion").hide();

       $scope.search_operation_unoperation=$scope.search_operation_unoperationConsult;

       $scope.unOperationUrl=$scope.unOperationConsultUrl;
    }
    $scope.goSuggestion=function(){
        $(".suggestion").addClass("active");
        $(".consult").removeClass("active");

        $("#suggestion_operation").show();
        $("#consult_operation").hide();

        $scope.search_operation=$scope.doSearchOperationSuggestion;

        $scope.operationUrl=$scope.operationSuggestionExport;
        
    }
    $scope.goConsult=function(){
        $(".consult").addClass("active");
        $(".suggestion").removeClass("active");

        $("#consult_operation").show();
        $("#suggestion_operation").hide();

        $scope.search_operation=$scope.search_operationConsult;

        $scope.operationUrl=$scope.operationConsultUrl;
    }

    $scope.stateparams = {};
    //未处理咨询弹出框 
    $scope.checkConsultDetail_unoperationConsult=function(item){
        //判断是否为草稿
        if(item.ResponseStatusID==2){
            item.isDraft=true;
        }else{
            item.isDraft=false;
        }
       sessionStorage.setItem("consultDetailItem_unoperation",JSON.stringify(item));

       ModalUtil.createModal($modal,$scope,"consultDetailUnOperationFormController",'view/templs/consultProcessDialog.html');
    }
    //已处理咨询弹出框
    $scope.checkConsultDetail_operationConsult=function(item){
        sessionStorage.setItem("consultDetailItem_operation",JSON.stringify(item));
        ModalUtil.createModal($modal,$scope,'consultDetailOperationFormController','view/templs/consultFeedbackDialog.html');
    }
    //未处理建议弹出框 
    $scope.checkSuggestionDetail_unoperationSuggestion=function(item){
        if(item.status.id ==1)
        {//如果是草稿

        }
        sessionStorage.setItem("suggestionDetailItem_unoperation",JSON.stringify(item));
        ModalUtil.createModal($modal,$scope,"suggestionDetailUnOperationFormController",'view/templs/suggestionProcessDialog.html');
    }
    //已处理建议弹出框
    $scope.checkSuggestionDetail_operationSuggestion=function(item){
        sessionStorage.setItem("suggestionDetailItem_operation",JSON.stringify(item));
        ModalUtil.createModal($modal,$scope,'suggestionDetailOperationFormController','view/templs/suggestionFeedbackDialog.html');
        //ModalUtil.createModal($modal,$scope,$scope.ModalInstanceCtrl_opration,'view/templs/consultFeedbackDialog.html');
    }

    //查询待处理咨询内容
    $scope.doPagingSearch_unoperationConsult=function(index,pageSize){
         var curentpageSize=0;
         if(pageSize){
             curentpageSize=pageSize;
         }else{
             curentpageSize=$scope.PAGE_SIZE;
         }

         if(index){
             $scope.pageIndex_unoperationConsult=index;
         }else{
             $scope.pageIndex_unoperationConsult=$scope.pageIndex_unoperationConsult;
         }
        //保存当前页面，以防刷新页码消失
        //sessionStorage.setItem('pageIndex_unoperation_consult',$scope.pageIndex_unoperationConsult);
        var url=doRequestUrl.requestConsultList;
        var params={
            pageIndex:$scope.pageIndex_unoperationConsult-1,
            pageSize:curentpageSize,
            keyWord:$scope.searchContent_unoperation,
            depID:sessionStorage.getItem('departmentId'),
            responseStatus:0
        };
        doPostRequest.doPostRequest(url,params).success(function(data){
            $scope.query.entity.unconsultList=data.result;
            angular.forEach($scope.query.entity.unconsultList, function (item) {
                item.RequestDate=new Date(item.RequestDate);
            });
            $scope.totalPages_unoperationConsult=data.totalCount;
            $scope.$apply();
            //    $scope.totalPages_unoperation=
        }).error(function(err){
            alert(err.responseText);
        });
    }

    //查询已处理咨询内容
    $scope.doPagingSearch_operationConsult=function(index,pageSize){
         var curentpageSize=0;
         if(pageSize){
             curentpageSize=pageSize;
         }else{
             curentpageSize=$scope.PAGE_SIZE;
         }
         
         if(index){
             $scope.pageIndex_operationConsult=index;
         }else{
             $scope.pageIndex_operationConsult=$scope.pageIndex_operation;
         }
        //保存当前页面，以防刷新页码消失
        //sessionStorage.setItem('pageIndex_operation_consult',$scope.pageIndex_operation);
        var url=doRequestUrl.requestConsultList;
        var params={
            "pageIndex":$scope.pageIndex_operationConsult-1,
            "pageSize":curentpageSize,
            "keyWord":$scope.searchContent_operation,
            "depID":sessionStorage.getItem('departmentId'),
            "responseStatus":1
        };
        doPostRequest.doPostRequest(url,params).success(function(data){
            $scope.query.entity.consultList=data.result;
            angular.forEach($scope.query.entity.consultList, function (item) {
                item.RequestDate=new Date(item.RequestDate);
            });
            $scope.totalPages_operationConsult=data.totalCount;
            $scope.$apply();
            //    $scope.totalPages_unoperation=
        }).error(function(err){
            alert(err.responseText);
        });
    }

    //未处理建议
    $scope.doPagingSearch_unoperationSuggestion=function(index,pageSize){
        var curentpageSize=0;
         if(pageSize){
             curentpageSize=pageSize;
         }else{
             curentpageSize=$scope.PAGE_SIZE;
         }

         if(index){
             $scope.pageIndex_unoperationSuggestion=index;
         }else{
             $scope.pageIndex_unoperationSuggestion=$scope.pageIndex_unoperationSuggestion;
         }
        //保存当前页面，以防刷新页码消失
        //sessionStorage.setItem('pageIndex_unoperation_suggestion',$scope.pageIndex_unoperationSuggestion);

        var url=doRequestUrl.requestSuggestionList;
        var params={
            "type":"dept",
            "deptId":$scope.departmentId,
            "pageIndex":$scope.pageIndex_unoperationSuggestion-1,
            "pageSize":curentpageSize,
            'status':1,
            'keyWord':$scope.searchContent_unoperation
        };
        doPostRequest.doPostRequest(url,params).success(function(data){
            $scope.query.entity.unsuggestionList=data.result;
            angular.forEach($scope.query.entity.unsuggestionList, function (item) {
                item.date=new Date(item.date);
            });
            $scope.totalPages_unoperationSuggestion=data.totalCount;
            $scope.$apply();
            //    $scope.totalPages_unoperation=
        }).error(function(err){
            alert(err.responseText);
        });

    }
    //已处理建议
    $scope.doPagingSearch_operationSuggestion=function(index,pageSize){
          var curentpageSize=0;
         if(pageSize){
             curentpageSize=pageSize;
         }else{
             curentpageSize=$scope.PAGE_SIZE;
         }
         
         if(index){
             $scope.pageIndex_operationSuggestion=index;
         }else{
             $scope.pageIndex_operationSuggestion=$scope.pageIndex_operationSuggestion;
         }
        //保存当前页面，以防刷新页码消失
        //sessionStorage.setItem('pageIndex_operation_suggestion',$scope.pageIndex_operationSuggestion);

        var url=doRequestUrl.requestSuggestionList;
        var params={
            "type":"dept",
            "deptId":$scope.departmentId,
            "pageIndex":$scope.pageIndex_operationSuggestion-1,
            "pageSize":curentpageSize,
            'status':2,
            'keyWord':$scope.searchContent_operation
        };
        doPostRequest.doPostRequest(url,params).success(function(data){
            $scope.query.entity.suggestionList=data.result;
            angular.forEach($scope.query.entity.suggestionList, function (item) {
                item.date=new Date(item.date);
            });
            $scope.totalPages_operationSuggestion=data.totalCount;
            $scope.$apply();
            //    $scope.totalPages_unoperation=
        }).error(function(err){
            alert(err.responseText);
        });


    }
    //搜索建议
    $scope.doSearchUnOperationSuggestion=function(){
        $scope.doPagingSearch_unoperationSuggestion(1);
    }

    $scope.doSearchOperationSuggestion=function(){
        $scope.doPagingSearch_operationSuggestion(1);

    }
  
    //搜索咨询
    $scope.search_operationConsult=function(index,pageSize){
        // $scope.doPagingSearch_operation(1);
        var curentpageSize=0;
         if(pageSize){
             curentpageSize=pageSize;
         }else{
             curentpageSize=$scope.PAGE_SIZE;
         }
      
        var url=doRequestUrl.searchConsult;
        var params={
            "pageIndex":0,
            "pageSize":curentpageSize,
            "keyWord":$scope.searchContent_operation,
            "depID":sessionStorage.getItem('departmentId'),
            "responseStatus":1
        };
        doPostRequest.doPostRequest(url,params).success(function(data){
            $scope.query.entity.consultList=data.result;
            angular.forEach($scope.query.entity.consultList, function (item) {
                item.RequestDate=new Date(item.RequestDate);
            });
            $scope.totalPages_operationConsult=data.totalCount;
            $scope.$apply();
            //    $scope.totalPages_unoperation=
        }).error(function(err){
            alert(err.responseText);
        });
    }
    $scope.search_operation_unoperationConsult=function(index,pageSize){
        // $scope.doPagingSearch_unoperation(1);
        var curentpageSize=0;
         if(pageSize){
             curentpageSize=pageSize;
         }else{
             curentpageSize=$scope.PAGE_SIZE;
         }
        
        var url=doRequestUrl.searchConsult;
        var params={
            pageIndex:0,
            pageSize:curentpageSize,
            keyWord:$scope.searchContent_unoperation,
            depID:sessionStorage.getItem('departmentId'),
            responseStatus:0
        };
        doPostRequest.doPostRequest(url,params).success(function(data){
            $scope.query.entity.unconsultList=data.result;
            angular.forEach($scope.query.entity.unconsultList, function (item) {
                item.RequestDate=new Date(item.RequestDate);
            });
            $scope.totalPages_unoperationConsult=data.totalCount;
            $scope.$apply();
            //    $scope.totalPages_unoperation=
        }).error(function(err){
            alert(err.responseText);
        });
    }

    //初始化
    var init=function(){
         //临时增加一段代码模拟获得department id
        if(sessionStorage.getItem('departmentId')){
            var departmentId=window.location.hash.split("id=")[1];
            if(departmentId==undefined){
                
            }else{
                sessionStorage.setItem('departmentId', departmentId);
            }
            
        }else{
            var departmentId=window.location.hash.split("id=")[1];
            if(departmentId==undefined){
                alert("请在url上输入id");
                return;
            }
            sessionStorage.setItem('departmentId',departmentId);
        }
        $scope.departmentId=sessionStorage.getItem('departmentId');
        ////////////////////////////////////
        
        $scope.query={
            entity:{
                
            }
        };
         //每页显示多少条数据
        $scope.PAGE_SIZE=PAGE_SIZE;

        //获得已处理当前页
        $scope.pageIndex_operationConsult=1;
        //获得待处理当前页
        $scope.pageIndex_unoperationConsult=1;
         //获得已处理建议当前页
        $scope.pageIndex_operationSuggestion=1;
        //获得待处理建议当前页
        $scope.pageIndex_unoperationSuggestion=1;

        //导出咨询数据url
        $scope.unOperationConsultUrl=doRequestUrl.exportConsuleExcel+"?deptId="+ $scope.departmentId+"&responseStatusId=1";
        $scope.operationConsultUrl=doRequestUrl.exportConsuleExcel+"?deptId="+ $scope.departmentId+"&responseStatusId=2";

         //导出建议数据url
        $scope.unOperationSuggestionExport=doRequestUrl.exportSuggestionExcel+"?dept_id="+ $scope.departmentId+"&status=1&type=2";
        $scope.operationSuggestionExport=doRequestUrl.exportSuggestionExcel+"?dept_id="+ $scope.departmentId+"&status=2&type=2";

        //默认的导出url
        $scope.unOperationUrl=$scope.unOperationConsultUrl;
        $scope.operationUrl=$scope.operationConsultUrl;

        //默认的搜索函数
        $scope.search_operation_unoperation=$scope.search_operation_unoperationConsult;
        $scope.search_operation=$scope.search_operationConsult;

        //总共的total pages
        $scope.totalPages_unoperationConsult=0;
        $scope.totalPages_operationConsult=0;

        $scope.totalPages_unoperationSuggestion=0;
        $scope.totalPages_operationSuggestion=0;
        
        //让咨询和建议按钮变化,已经隐藏和显示
        $(".unConsult").addClass("active");
        $(".unSuggestion").removeClass("active");

        $(".consult").addClass("active");
        $(".suggestion").removeClass("active");

        $("#unconsult").show();
        $("#unsuggestion").hide();

        $("#consult_operation").show();
        $("#suggestion_operation").hide();
        //判断显示的tab
        if(sessionStorage.getItem('isShowSuggestion')=="1"){
            $(".unSuggestion").addClass("active");
            $(".unConsult").removeClass("active");

            $("#unsuggestion").show();
            $("#unconsult").hide();
            
            sessionStorage.removeItem('isShowSuggestion');
        }
        $scope.doPagingSearch_unoperationConsult($scope.pageIndex_unoperationConsult,$scope.PAGE_SIZE);
        $scope.doPagingSearch_operationConsult($scope.pageIndex_operationConsult,$scope.PAGE_SIZE);

        $scope.doPagingSearch_unoperationSuggestion($scope.pageIndex_unoperationSuggestion,$scope.PAGE_SIZE);
        $scope.doPagingSearch_operationSuggestion($scope.pageIndex_operationSuggestion,$scope.PAGE_SIZE);
    };
     
    //启动
    init();

}]);