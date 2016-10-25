var consultDetailOperationController=angular.module('consultDetailOperationController', ['httpService','apiUrlService'])

consultDetailOperationController.controller('consultDetailOperationFormController', ['$scope','$modalInstance','$state','doGetRequest','doRequestUrl',function($scope,$modalInstance,$state,doGetRequest,doRequestUrl) {
     $scope.query={
        entity:{
            
        }
    };

    //get consultDetail item from sessionStorage
    if(sessionStorage.getItem("consultDetailItem_unoperation")){
        $scope.entityItem=JSON.parse(sessionStorage.getItem("consultDetailItem_unoperation"));
    }
    
    //得到咨询详情
    var detailUrl=doRequestUrl.checkConsultDetail;
    doGetRequest.doGetRequest(detailUrl,{}).success(function(data){
        $scope.query.entity=data.result;
    }).error(function(err){
        alert(err);
    });
     
     $scope.ok = function() {  
        $modalInstance.close($scope.selected);  

        // $state.go("consultList",{data:{result:"success"}});
    };  
    $scope.cancel = function() {  
        $modalInstance.dismiss('cancel');  
    };  

    
}]);
