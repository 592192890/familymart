var announcementListController=angular.module('announcementListController', ['httpService','apiUrlService'])

announcementListController.controller('announcementListFormController', ['$scope','$modal','$state',function($scope,$modal,$state) {
   //  var a=$stateParams.data
     $scope.query={
        entity:{
            
        }
    };

  
     $scope.totalPages=1;

   

     $scope.doPagingSearch=function(index,pageSize){

    }
}]);
