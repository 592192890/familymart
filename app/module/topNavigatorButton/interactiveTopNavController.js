var interactiveTopNavController=angular.module('interactiveTopNavController', ['httpService','apiUrlService'])

interactiveTopNavController.controller('interactiveTopNavController', ['$scope','$state','$stateParams',function($scope,$state,$stateParams) {
   //  var a=$stateParams.data
     //互动平台按钮
    var functionNameArr=['consultList','announcementList','submitSuggestionList'];
    $scope.goFunction=function(functionName){
        for(var i=0;i<functionNameArr.length;i++){
            $("."+functionNameArr[i]).removeClass('active');
        }
        // $("."+functionName).addClass('active');

        if(functionName=='consultList'){
            sessionStorage.setItem('navButton','');
             $state.go("consultList");
             
        }else if(functionName=='announcementList'){
            sessionStorage.setItem('navButton','announcementList');
            $state.go("announcementList");
        }else if(functionName='submitSuggestionList'){
            sessionStorage.setItem('navButton','submitSuggestionList');
            $state.go("submitSuggestionList");
        }
    }

    
    if(sessionStorage.getItem('navButton')){
        $("."+sessionStorage.getItem('navButton')).addClass('active');
    }else{
        //默认是互动处理选中
        $(".consultList").addClass('active');
    }
    
    

  
   
}]);
