var submitSuggestionListController=angular.module('submitSuggestionListController', ['httpService','apiUrlService'])

submitSuggestionListController.controller('submitSuggestionListFormController', ['PAGE_SIZE','$scope','$modal','$state','doGetRequest','doRequestUrl','doPostRequest',function(PAGE_SIZE,$scope,$modal,$state,doGetRequest,doRequestUrl,doPostRequest) {
    $scope.stateparams = {};
    // $scope.totalPages=1;
    //建议详情
    $scope.checkSubmitSuggestionDetail_operation=function(item){
        //判断是否为草稿
        if(item.status.id==1){
            //告知跳转页面，这个是从草稿跳转到了新建页面
            $scope.stateparams.isNew=false;
            sessionStorage.setItem("submitSuggestionDetailItem_operation",JSON.stringify(item));
            ModalUtil.createModal($modal,$scope,'submitSuggestionAddFormController','view/templs/submitSuggestionAddDialog.html');
            
        }else{
            sessionStorage.setItem("submitSuggestionDetailItem_operation",JSON.stringify(item));
            ModalUtil.createModal($modal,$scope,'submitSuggestionDetailFormController','view/templs/submitSuggestionDetailDialog.html');
        }
       
    }
	//新增建议
    $scope.checkSubmitSuggestionAdd=function(){
        //sessionStorage.setItem("submitSuggestionDetailItem_operation",JSON.stringify(item));
        // sessionStorage.setItem("submitSuggestionDetailItem_operation",JSON.stringify(item));
        $scope.stateparams.isNew=true;
        ModalUtil.createModal($modal,$scope,'submitSuggestionAddFormController','view/templs/submitSuggestionAddDialog.html');
    }

     //提交建议列表
    $scope.doPagingSearch_suggestion=function(index,pageSize){
         var curentpageSize=0;
         if(pageSize){
             curentpageSize=pageSize;
         }else{
             curentpageSize=$scope.PAGE_SIZE;
         }

         if(index){
             $scope.pageIndex=index;
         }else{
             $scope.pageIndex=$scope.pageIndex;
         }
        //保存当前页面，以防刷新页码消失
        //sessionStorage.setItem('pageIndex_submitSuggestion',$scope.pageIndex);

        var url=doRequestUrl.requestSuggestionList;
        var params={
            "type":"provider",
            "ProviderType":2,
            "Provider":sessionStorage.getItem('departmentId'),
            "pageIndex":$scope.pageIndex-1,
            "pageSize":curentpageSize,
            "keyWord":$scope.searchContext
        };
        doPostRequest.doPostRequest(url,params).success(function(data){
            $scope.query.entity.suggestionList=data.result;
            angular.forEach($scope.query.entity.suggestionList, function (item) {
                item.date=new Date(item.date);
            });
            $scope.totalPages=data.totalCount;
            $scope.$apply();
            //    $scope.totalPages_unoperation=
        }).error(function(err){
            alert(err.responseText);
        });
    }

    //搜索
    $scope.doSearch=function(){
        $scope.doPagingSearch_suggestion(1);
    }

    var init=function(){
        $scope.departmentId=sessionStorage.getItem('departmentId');
        $scope.query={
            entity:{
                
            }
        };

        $scope.totalPages_unoperation=0;
         //每页显示多少条数据
        $scope.PAGE_SIZE=PAGE_SIZE;

        //获得已处理当前页
        // if(sessionStorage.getItem('pageIndex_submitSuggestion')){
        //     $scope.pageIndex=sessionStorage.getItem('pageIndex_submitSuggestion');
        // }else{
        //     $scope.pageIndex=1;
        // }
        $scope.pageIndex=1;

        $scope.exportSubmitSuggestion=doRequestUrl.exportSuggestionExcel+"?dept_id="+$scope.departmentId+"&status=0&type=1";

        $scope.doPagingSearch_suggestion($scope.pageIndex,$scope.PAGE_SIZE);
    }
    init();
}]);