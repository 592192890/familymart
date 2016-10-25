'use strict';
/***********************************************************************
 * 描述：分页组件<br>
 * -----------------------------------------------------------------<br>
 * 变更序号：<br>
 * 修改日期：<br>
 * 修改人员：<br>
 * 修改原因：<br>
 * **********************************************************************
 */

var app = angular.module('pagingComponent4', []);

app.directive('paging4', function ($compile, $parse, $log, $timeout,PAGE_SIZE) {
    return {
        restrict: "A",
        templateUrl: "view/templs/paging4.html",
        link : function(scope, element, attrs, controller) {

            //juedge whether use use specificsize attribute
            if(attrs.specificsize4){
                var $size4 = new Number(attrs.specificsize4);
            }else{
                var $size4 = new Number(PAGE_SIZE);
            }

            var total4 = attrs.total4,index4 = attrs.index4, searcher4 = attrs.searcher4;
            var $index4 = $parse(index4)(scope), $searcher4 = $parse(searcher4)(scope);
            var $scope = element.scope();

            scope.$watch(total4, function() {
                var $total4 = $parse(total4)(scope);
                $scope.pages4 = [];
                for (var i = 0; i < Math.ceil($total4 / $size4); i++) {
                    $scope.pages4.push({
                        index4 : i + 1
                    })
                }
                $scope.total4 = $total4;
                $scope.pageCountArr4=[];
                $scope.pageCount4=Math.ceil($scope.total4/ $scope.size4);
                for(var i=0;i<$scope.pageCount4;i++){
                     $scope.pageCountArr4.push({"pageIndex4":(i+1)});
                }
           
              
            });
            $scope.$watch('selectedPage4',function(newValue,oldValue){
                if(newValue!=oldValue){
                     $scope.toPage4(newValue.pageIndex4);
                }
            });
            $scope.size4 = $size4.toString();
            // $scope.$watch("size4", function() {
            //     $scope.pages4 = [];
            //     for (var i = 0; i < Math.ceil($scope.total4 / parseInt($scope.size4)); i++) {
            //         $scope.pages4.push({
            //             index4 : i + 1
            //         })
            //     }
            //     $scope.index4 = 1;
            //     $scope.ceilingIndex4 = 5;
            //     $searcher4($scope.index4,$scope.size4);
               
            // });
            $scope.index4 = $index4;
            $scope.myIndex4 = 1;
            $scope.ceilingIndex4 = 5;
            $scope.toFirst4 = function() {
                $scope.index4 = 1;
                $scope.ceilingIndex4 = 5;
                $searcher4($scope.index4,$scope.size4);

                $scope.myIndex4=1;
               
            };
            $scope.toLast4 = function() {
                $scope.index4 = $scope.pages4.length;
                $scope.ceilingIndex4 = $scope.pages4.length;
                $searcher4($scope.index4,$scope.size4);

                $scope.myIndex4 = $scope.pages4.length;
               
            };

            $scope.searchPrevious4 = function() {
                if(($scope.ceilingIndex4 == $scope.index4 + 4) && ($scope.index4>1)){
                    $scope.ceilingIndex4--;
                }
                if ($scope.index4 > 1) {
                    --$scope.index4;
                    $searcher4($scope.index4,$scope.size4);
                }

                $scope.myIndex4 = $scope.index4;
               
                
            };

            $scope.searchNext4 = function() {
                if(($scope.ceilingIndex4 == $scope.index4) && ($scope.index4<$scope.pages4.length)){
                    $scope.ceilingIndex4++;
                }
                if ($scope.index4 < $scope.pages4.length) {
                    ++$scope.index4;
                    $searcher4($scope.index4,$scope.size4);
                }

                $scope.myIndex4 = $scope.index4;
              
            };

            $scope.searchIndex4 = function(index4) {
                $scope.index4 = index4;
                $searcher4($scope.index4,$scope.size4);

                $scope.myIndex4 = $scope.index4;
               
            };

            $scope.toPage4 = function(myIndex4){
                if(myIndex4>$scope.pages4.length){

                }else{
                    $scope.ceilingIndex4 = Math.min(Number(myIndex4)+4,$scope.pages4.length)
                    $scope.searchIndex4(myIndex4);
                }
              
            }
        }
    }
});

