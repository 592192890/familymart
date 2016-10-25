var suggestionDetailUnOperationController=angular.module('suggestionDetailUnOperationController', ['httpService','apiUrlService'])

suggestionDetailUnOperationController.controller('suggestionDetailUnOperationFormController', ['$scope','$modalInstance','$state','doGetRequest','doPostRequest','doRequestUrl',function($scope,$modalInstance,$state,doGetRequest,doPostRequest,doRequestUrl) {
     $scope.query={
        entity:{
            
        }
    };
    var departmentId=sessionStorage.getItem('departmentId');

    $scope.isMigrate=false;

    //get suggestionDetail item from sessionStorage
    if(sessionStorage.getItem("suggestionDetailItem_unoperation")){
        $scope.entityItem=JSON.parse(sessionStorage.getItem("suggestionDetailItem_unoperation"));
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
        alert(err);
    });

    //监听大类的改变
    $scope.$watch("query.entity.bigType",function(newValue){
         var selectedId=newValue;
         for(var i=0;i<$scope.typeList.length;i++){
             if($scope.typeList[i].categoryCode==selectedId){
                 $scope.subType=$scope.typeList[i].sub;
             }
         }
    });
    //获得部门
    /* var depUrl=doRequestUrl.department;
    doGetRequest.doGetRequest(depUrl,{}).success(function(data){
        $scope.depList=data.result;
    }).error(function(err){
        alert(err);
    });*/
    //获得大类和子类
    var typeUrl=doRequestUrl.categoryList+"?sourceTypeId=2";
    doGetRequest.doGetRequest(typeUrl,{}).success(function(data){
        $scope.typeList=data.result;
        $scope.bigType=[];
        $scope.subType=[];
        for(var i=0;i<$scope.typeList.length;i++){
            $scope.bigType.push({categoryCode:$scope.typeList[i].categoryCode,name:$scope.typeList[i].name});

            for(var j=0;j<$scope.typeList[i].sub.length;j++){
                //判断子类是否已经存在
                var currentId=$scope.typeList[i].sub[j].categoryCode;

                if($scope.subType.length>0){
                    var mark=0;
                    for(var k=0;k<$scope.subType.length;k++){
                        mark++;
                        if($scope.subType[k].categoryCode==currentId){
                            break;
                        }

                        if(mark==$scope.subType.length){
                            $scope.subType.push({categoryCode:$scope.typeList[i].sub[j].categoryCode,name:$scope.typeList[i].sub[j].name});
                        }
                    }
                }else{
                    $scope.subType.push({categoryCode:$scope.typeList[i].sub[j].categoryCode,name:$scope.typeList[i].sub[j].name});
                }
                
                
            }
        }
         $scope.$apply();
        
        
    }).error(function(err){
        alert(err);
    });
     
     $scope.ok = function(isValid) {  
         $scope.sumbmited=true;
         if(isValid){
              
            var url=doRequestUrl.solveSuggestion;
            var params={
                "response_id":$scope.entityItem.response_id,
                "category_code":$scope.query.entity.subType
            }
            doPostRequest.doPostRequest(url,params).success(function(data){
                if(data.response==1){
                    sessionStorage.setItem('isShowSuggestion',"1");
                    $state.go("consultList",{},{reload:true});
                    $modalInstance.close($scope.selected);     
                }
            }).error(function(err){
                alert(err.responseText);
            });
        }
             
       
        

        // $state.go("suggestionList",{data:{result:"success"}});
    };  
 
    $scope.cancel = function() {  
        sessionStorage.setItem('isShowSuggestion',"1");
        $state.go("consultList",{},{reload:true});
        $modalInstance.dismiss('cancel');  
    };  
}]);
