var consultDetailOperationController=angular.module('consultDetailOperationController', ['httpService','apiUrlService'])

consultDetailOperationController.controller('consultDetailOperationFormController', ['$scope','$modalInstance','$state','doPostRequest','doRequestUrl',function($scope,$modalInstance,$state,doPostRequest,doRequestUrl) {
    $scope.departmentId=sessionStorage.getItem('departmentId');

    $scope.query={
        entity:{
            
        }
    };

    //get consultDetail item from sessionStorage
    if(sessionStorage.getItem("consultDetailItem_operation")){
        $scope.entityItem=JSON.parse(sessionStorage.getItem("consultDetailItem_operation"));
    }
    
    //得到咨询详情
    var detailUrl=doRequestUrl.checkConsultDetail;
    var params={
        "id":$scope.entityItem.RequestId,
        "IsShopRead":"N",
        "Deptid":$scope.departmentId
    };
    doPostRequest.doPostRequest(detailUrl,params).success(function(data){
        $scope.query.entity=data.result;
        $scope.query.entity.request.RequestDate=new Date($scope.query.entity.request.RequestDate);
        
        //过滤未处理信息
        var newResponse=[];
        angular.forEach($scope.query.entity.response,function(item){
            if(item.ResponseStatusId==3){
                if(item.responseTime!=undefined&&item.responseTime!=null){
                    item.responseTime=new Date(item.responseTime);
                }
                
                newResponse.push(item);
            }
            
        });
        $scope.query.entity.response=newResponse;
        $scope.$apply();
    }).error(function(err){
        alert(err.responseText);
    });
     
     $scope.ok = function() {  
        $modalInstance.close($scope.selected);  

        // $state.go("consultList",{data:{result:"success"}});
    };  
    $scope.cancel = function() {  
        $modalInstance.dismiss('cancel');  
    };  

    
}]);
