var consultDetailUnOperationController=angular.module('consultDetailUnOperationController', ['httpService','apiUrlService'])

consultDetailUnOperationController.controller('consultDetailUnOperationFormController', ['$scope','$modalInstance','$state','doGetRequest','doPostRequest','doRequestUrl','$timeout',function($scope,$modalInstance,$state,doGetRequest,doPostRequest,doRequestUrl,$timeout) {

    //监听大类的改变
    $scope.$watch("query.entity.bigType",function(newValue){
         var selectedId=newValue;
         for(var i=0;i<$scope.typeList.length;i++){
             if($scope.typeList[i].categoryCode==selectedId){
                 $scope.subType=$scope.typeList[i].sub;
             }
         }
    });
    
     
    $scope.ok = function(isValid) {  
        $scope.sumbmited=true;
         if(isValid){
              //判断是否转移
            if($scope.isMigrate){
                
                var url=doRequestUrl.changeDepartment;
                var params={
                    responseId:$scope.entityItem.ResponseId,
                    requestId:$scope.entityItem.RequestId,
                    priorDepartmentId:$scope.departmentId,
                    departmentId:$scope.query.entity.dep
                };
                doPostRequest.doPostRequest(url,params).success(function(data){
                    //重置filePath为空
                    sessionStorage.setItem('filePath','');
                    if(data.response==1){
                        $state.go("consultList",{},{reload:true});
                    
                        $modalInstance.close($scope.selected);
                    }else{
                        alert(data.error);
                    }
                }).error(function(err){
                    alert(err.responseText);
                });
            }else{
            
                var url=doRequestUrl.operateConsult;
                var params={
                    "responseId":$scope.entityItem.ResponseId,
                    "categoryCode":$scope.query.entity.subType,
                    "content":$scope.query.entity.feedbackContent,
                    "responseStatus":'3',
                    "filepath":sessionStorage.getItem('filePath')
                };
                doPostRequest.doPostRequest(url,params).success(function(data){
                    //重置filePath为空
                    sessionStorage.setItem('filePath','');
                    if(data.response==1){
                        $state.go('consultList',{},{reload:true});
                        $modalInstance.close($scope.selected);
                    }else if(data.response==0){
                        //技术错误 catch里面的错误（正式版本需要用户体验，改变输出语句）
                        alert(data.error);
                    }else{
                        //-1业务错误
                        alert(data.error);
                    }
                }).error(function(err){
                    alert(err.responseText);
                });
            }
         }else{
            
        }
        
          

        // $state.go("consultList",{data:{result:"success"}});
    };  

    $scope.save=function(isValid){
        $scope.sumbmited=true;
        if(isValid){
            var url=doRequestUrl.operateConsult;
            var params={
                "responseId":$scope.entityItem.ResponseId,
                "categoryCode":$scope.query.entity.subType,
                "content":$scope.query.entity.feedbackContent,
                "responseStatus":'2',
                "filepath":sessionStorage.getItem('filePath')
            };
            doPostRequest.doPostRequest(url,params).success(function(data){
                //重置filePath为空
                sessionStorage.setItem('filePath','');
                if(data.response==1){
                    
                    $state.go('consultList',{},{reload:true});
                    
                    $modalInstance.close($scope.selected);  
                }else{
                        alert(data.error);
                }
            }).error(function(err){
                alert("处理失败");
            });
        
        }
        
        
    }
    $scope.cancel = function() {  
        //重置filePath为空
        sessionStorage.setItem('filePath','');
        $state.go('consultList',{},{reload:true});
        $modalInstance.dismiss('cancel');  
    };  

    var init=function(){
        $scope.query={
            entity:{
                
            }
        };

        $scope.departmentId=sessionStorage.getItem('departmentId');
        $scope.isMigrate=false;

        //get consultDetail item from sessionStorage
        if(sessionStorage.getItem("consultDetailItem_unoperation")){
            $scope.entityItem=JSON.parse(sessionStorage.getItem("consultDetailItem_unoperation"));
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
            if($scope.entityItem.isDraft){
                angular.forEach($scope.query.entity.response,function(item){
                    if(item.DepartmentId==sessionStorage.getItem('departmentId')){
                        $scope.query.entity.dep=item.DepartmentId;
                        $scope.query.entity.bigType=item.ParentCategoryCode;
                        $scope.query.entity.subType=item.CategoryCode;
                        $scope.query.entity.feedbackContent=item.Content;
                        $scope.query.entity.request.Attachments=item.Attachments;
                    
                    }
                });
            }
            //得到转移信息
            //过滤未处理的response
            var newResponse=[];
            angular.forEach($scope.query.entity.response,function(item){
                //已回复
                if(item.ResponseStatusId==3){
                    newResponse.push(item);
                }

                if(item.DepartmentId==sessionStorage.getItem('departmentId')){
                    if(item.transferHistory&&item.transferHistory.length>0){
                         $scope.transferHistory=item.transferHistory[0]+"转移给"+item.transferHistory[1];
                    }

                    //得到responseId，去传递给文件上传的后端
                    sessionStorage.setItem('postData',item.ResponseId);
                   
                }
            });
            $scope.query.entity.response=newResponse;

            $scope.$apply();
        }).error(function(err){
            alert(err.responseText);
        });

        
        //获得部门
        var depUrl=doRequestUrl.department;
        doGetRequest.doGetRequest(depUrl,{}).success(function(data){
            $scope.depList=data.result;
            $scope.$apply();
        }).error(function(err){
            alert(err);
        });
        //获得大类和子类
        var typeUrl=doRequestUrl.categoryList+"?sourceTypeId=1";
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
            alert(err.responseText);
        });
    }
    init();
}]);
