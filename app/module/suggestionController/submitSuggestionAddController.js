var submitSuggestionAddController=angular.module('submitSuggestionAddController', ['httpService','apiUrlService']);

submitSuggestionAddController.controller('submitSuggestionAddFormController', ['$scope','$modalInstance','$state','doGetRequest','doPostRequest','doRequestUrl','$timeout',
    function($scope,$modalInstance,$state,doGetRequest,doPostRequest,doRequestUrl,$timeout) {
        
        
        $scope.ok = function(isValid){
            $scope.sumbmited=true;
            if(isValid){
                var url =doRequestUrl.addSuggestion;
                if($modalInstance.stateparams.isNew){
                     var params ={
                        "provider_type": 2,
                        "provider_id": sessionStorage.getItem('departmentId'),
                        "content": $scope.model.content,
                        "file_path": "",
                        "dept_id": $scope.model.dept,
                        "status": 2
                    };  
                }else{
                    //从草稿页面跳转到该页面，所以提交按钮是更新，而不是新增
                     var params ={
                        "suggestion_id": $scope.entityItem.id,
                        "provider_type": 2,
                        "provider_id": sessionStorage.getItem('departmentId'),
                        "content": $scope.model.content,
                        "file_path": "",
                        "dept_id": $scope.model.dept,
                        "status": 2
                    };  
                }
               
                doPostRequest.doPostRequest(url, params).success(function (data) {
                
                    if (data.response === 1) {
                        //$state.go('shop-suggestion-responsedlist');
                        $state.go('submitSuggestionList',{},{reload:true});
                        $modalInstance.close($scope.selected);
                    }
                }).error(function (err) {
                        alert(err.responseText);
                });
            }else{

            }
                    
        }
        $scope.save=function(isValid){
            $scope.sumbmited=true;
            if(isValid){
                var url =doRequestUrl.addSuggestion;
                if($modalInstance.stateparams.isNew){
                    var params ={
                        "provider_type": 2,
                        "provider_id": sessionStorage.getItem('departmentId'),
                        "content": $scope.model.content,
                        "file_path": "",
                        "dept_id": $scope.model.dept,
                        "status": 1
                    };
                }else{
                    var params ={
                        "suggestion_id": $scope.entityItem.id,
                        "provider_type": 2,
                        "provider_id": sessionStorage.getItem('departmentId'),
                        "content": $scope.model.content,
                        "file_path": "",
                        "dept_id": $scope.model.dept,
                        "status": 1
                    };
                }
                
                doPostRequest.doPostRequest(url, params).success(function (data) {
                
                    if (data.response === 1) {
                        //$state.go('shop-suggestion-responsedlist');
                        $state.go('submitSuggestionList',{},{reload:true});
                        $modalInstance.close($scope.selected);
                    }
                }).error(function (err) {
                        alert(err.responseText);
                });
            }
           
        }
        $scope.cancel = function() {  
            $modalInstance.dismiss('cancel');  
        };  

        var init=function(){
            $scope.model = []; //初始化请求的model
      
            $scope.departmentId = sessionStorage.getItem('departmentId'); //PC端默认为总部部门,获取当前部门ID
        

            //get suggestionDetail item from sessionStorage
            if(sessionStorage.getItem("submitSuggestionDetailItem_operation")){
                $scope.entityItem=JSON.parse(sessionStorage.getItem("submitSuggestionDetailItem_operation"));
            }

            //判断是新建还是草稿
            if($modalInstance.stateparams.isNew==false){
                var url = doRequestUrl.checkSuggestionDetail;
                var params =  {
                    "type":"Provider",
                    "id":$scope.entityItem.id
                };
                doPostRequest.doPostRequest(url, params).success(function (data) {
                    console.log(data);
                    $scope.$apply(function(){
                        if(data.response===1){
                            $scope.model.content = data.result.content;
                            $scope.model.dept = data.result.departmentId;
                        
                            $scope.model.attachments = data.result.attachments;//todo 取出附件
                        }
                    });
                }).error(function (err) {
                    alert(err.responseText);
                });
            }
            
       
        
            //获得部门
            var depUrl=doRequestUrl.department;
            doGetRequest.doGetRequest(depUrl,{}).success(function(data){
                $scope.depList=data.result;
            
                $scope.$apply();
            }).error(function(err){
                alert(err.responseText);
            });
        }
        init();

}]);
