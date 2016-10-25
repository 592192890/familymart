var suggestionDetailOperationController=angular.module('suggestionDetailOperationController', ['httpService','apiUrlService'])

suggestionDetailOperationController.controller('suggestionDetailOperationFormController', ['$scope','$modalInstance','$state','doGetRequest','doPostRequest','doRequestUrl','$timeout',function($scope,$modalInstance,$state,doGetRequest,doPostRequest,doRequestUrl,$timeout) {
     $scope.query={
        entity:{
            
        }
    };

    $scope.isMigrate=false;

    //get suggestionDetail item from sessionStorage
    if(sessionStorage.getItem("suggestionDetailItem_operation")){
        $scope.entityItem=JSON.parse(sessionStorage.getItem("suggestionDetailItem_operation"));
    }
    
    //得到建议详情
    var detailUrl=doRequestUrl.checkSuggestionDetail;
    var params={
        "id":$scope.entityItem.response_id,
        "type":'Dept'
    }
    doPostRequest.doPostRequest(detailUrl,params).success(function(data){
        $scope.query.entity=data.result;
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
