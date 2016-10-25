var mainController=angular.module('mainController', [])

mainController.controller('mainFormController', ['$scope','$state',function($scope,$state) {
     $scope.query={
        entity:{
            
        }
    };
    //left bar
    var platfromNameArr=['interactive','satisfaction','dataReport'];
    $scope.goPlatform=function(platfromName){
        for(var i=0;i<platfromNameArr.length;i++){
            $("."+platfromNameArr[i]).removeClass('active');
        }

        $("."+platfromName).addClass("active");
        if(platfromName=='interactive'){
            sessionStorage.setItem('navButton','consultList');
            $state.go('consultList');
        }else if(platfromName=='satisfaction'){

        }else if(platfromName='dataReport'){

        }
        
    }

   
}]);

mainController.filter('lipsisFilter',function(){
    return function(input, maxLen) {
		if ('string' == (typeof input)) {
			if (input.length > maxLen) {
				return input.substring(0, maxLen) + '...';
			} else {
				return input;
			}
		} else {
			return '';
		}
	};
})
