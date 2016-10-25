var submitSuggestionDetailController=angular.module('submitSuggestionDetailController', ['httpService','apiUrlService'])

submitSuggestionDetailController.controller('submitSuggestionDetailFormController', ['$scope','$modalInstance','$state','doPostRequest','doRequestUrl','$timeout',function($scope,$modalInstance,$state,doPostRequest,doRequestUrl,$timeout) {
     $scope.query={
        entity:{
            
        }
    };

    //$scope.isMigrate=false;

    //get suggestionDetail item from sessionStorage
    if(sessionStorage.getItem("submitSuggestionDetailItem_operation")){
        $scope.entityItem=JSON.parse(sessionStorage.getItem("submitSuggestionDetailItem_operation"));
    }
    
    //得到建议详情
    var detailUrl=doRequestUrl.checkSuggestionDetail;
    var params={
        "id":$scope.entityItem.id,
        "type":'Provider'
    }
    doPostRequest.doPostRequest(detailUrl,params).success(function(data){
        $scope.query.entity=data.result;
        angular.forEach( $scope.query.entity,function(item){
            item.date=new Date(item.date);
        });
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
