var suggestiontListController=angular.module('suggestiontListController', ['httpService','apiUrlService'])

suggestiontListController.controller('suggestiontListFormController', ['baseApiUrl','$scope','$modal','$state','doGetRequest','doRequestUrl','doPostRequest','PAGE_SIZE',function(baseApiUrl,$scope,$modal,$state,doGetRequest,doRequestUrl,doPostRequest,PAGE_SIZE) {
  
    $scope.departmentId=sessionStorage.getItem('departmentId');
    $scope.goSuggestion=function(){
        $state.go("suggestionList");
        
    }
    $scope.goConsult=function(){
        $state.go("consultList");
        
    }

        
    $scope.checkSuggestionDetail_unoperation=function(item){
        if(item.status.id ==1)
        {//如果是草稿

        }
        sessionStorage.setItem("suggestionDetailItem_unoperation",JSON.stringify(item));
        ModalUtil.createModal($modal,$scope,"suggestionDetailUnOperationFormController",'view/templs/suggestionProcessDialog.html');
    }

        
    $scope.checkSuggestionDetail_operation=function(item){
        sessionStorage.setItem("suggestionDetailItem_operation",JSON.stringify(item));
        ModalUtil.createModal($modal,$scope,'suggestionDetailOperationFormController','view/templs/suggestionFeedbackDialog.html');
        //ModalUtil.createModal($modal,$scope,$scope.ModalInstanceCtrl_opration,'view/templs/consultFeedbackDialog.html');
    }

    

     //未处理建议
    $scope.doPagingSearch_unoperation=function(index,pageSize){
        var curentpageSize=0;
         if(pageSize){
             curentpageSize=pageSize;
         }else{
             curentpageSize=$scope.PAGE_SIZE;
         }

         if(index){
             $scope.pageIndex_unoperation=index;
         }else{
             $scope.pageIndex_unoperation=$scope.pageIndex_unoperation;
         }
        //保存当前页面，以防刷新页码消失
        sessionStorage.setItem('pageIndex_unoperation_suggestion',$scope.pageIndex_unoperation);

        var url=doRequestUrl.requestSuggestionList;
        var params={
            "type":"dept",
            "deptId":$scope.departmentId,
            "pageIndex":$scope.pageIndex_unoperation-1,
            "pageSize":curentpageSize,
            'status':1,
            'keyWord':$scope.searchUnOperationContext
        };
        doPostRequest.doPostRequest(url,params).success(function(data){
            $scope.query.entity.unsuggestionList=data.result;
            angular.forEach($scope.query.entity.unsuggestionList, function (item) {
                item.date=new Date(item.date);
            });
            $scope.totalPages_unoperation=data.totalCount;
            $scope.$apply();
            //    $scope.totalPages_unoperation=
        }).error(function(err){
            alert(err.responseText);
        });

    }
    //已处理建议
     $scope.doPagingSearch_operation=function(index,pageSize){
          var curentpageSize=0;
         if(pageSize){
             curentpageSize=pageSize;
         }else{
             curentpageSize=$scope.PAGE_SIZE;
         }
         
         if(index){
             $scope.pageIndex_operation=index;
         }else{
             $scope.pageIndex_operation=$scope.pageIndex_operation;
         }
        //保存当前页面，以防刷新页码消失
        sessionStorage.setItem('pageIndex_operation_suggestion',$scope.pageIndex_operation);

        var url=doRequestUrl.requestSuggestionList;
        var params={
            "type":"dept",
            "deptId":$scope.departmentId,
            "pageIndex":$scope.pageIndex_unoperation-1,
            "pageSize":curentpageSize,
            'status':2,
            'keyWord':$scope.searchOperationContext
        };
        doPostRequest.doPostRequest(url,params).success(function(data){
            $scope.query.entity.suggestionList=data.result;
            angular.forEach($scope.query.entity.suggestionList, function (item) {
                item.date=new Date(item.date);
            });
            $scope.totalPages_operation=data.totalCount;
            $scope.$apply();
            //    $scope.totalPages_unoperation=
        }).error(function(err){
            alert(err.responseText);
        });


    }

    //搜索
    $scope.doSearchUnOperation=function(){
        $scope.doPagingSearch_unoperation(1);
    }

    $scope.doSearchOperation=function(){
        $scope.doPagingSearch_operation(1);

    }


    //初始化
    var init=function(){
        $scope.departmentId=sessionStorage.getItem('departmentId');
     
        $scope.totalPages_unoperation=0;
        $scope.totalPages_operation=0;

         //每页显示多少条数据
        $scope.PAGE_SIZE=PAGE_SIZE;

        //获得已处理当前页
        if(sessionStorage.getItem('pageIndex_operation_suggestion')){
            $scope.pageIndex_operation=sessionStorage.getItem('pageIndex_operation_suggestion');
        }else{
            $scope.pageIndex_operation=1;
        }
        
        //获得待处理当前页
        if(sessionStorage.getItem('pageIndex_unoperation_suggestion')){
            $scope.pageIndex_unoperation=sessionStorage.getItem('pageIndex_unoperation_suggestion');
        }else{
            $scope.pageIndex_unoperation=1;
        }

        $scope.query={
            entity:{
                
            }
        };
         //导出数据url
        $scope.unOperationSuggestionExport=doRequestUrl.exportSuggestionExcel+"?dept_id="+ $scope.departmentId+"&status=1&type=2";
        $scope.operationSuggestionExport=doRequestUrl.exportSuggestionExcel+"?dept_id="+ $scope.departmentId+"&status=2&type=2";

        //让咨询和建议按钮变化
        $(".suggestion").addClass("active");
        $(".consult").removeClass("active");

        $scope.doPagingSearch_unoperation($scope.pageIndex_unoperation,$scope.PAGE_SIZE);
        $scope.doPagingSearch_operation($scope.pageIndex_operation,$scope.PAGE_SIZE);
    }
    init();
}]);
