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

var app = angular.module('pagingComponent2', []);

app.directive('paging2', function ($compile, $parse, $log, $timeout,PAGE_SIZE) {
    return {
        restrict: "A",
        templateUrl: "view/templs/paging2.html",
        link : function(scope, element, attrs, controller) {

            //juedge whether use use specificsize attribute
            if(attrs.specificsize2){
                var $size2 = new Number(attrs.specificsize2);
            }else{
                var $size2 = new Number(PAGE_SIZE);
            }

            var total2 = attrs.total2,index2 = attrs.index2, searcher2 = attrs.searcher2;
            var $index2 = $parse(index2)(scope), $searcher2 = $parse(searcher2)(scope);
            var $scope = element.scope();

            scope.$watch(total2, function() {
                var $total2 = $parse(total2)(scope);
                $scope.pages2 = [];
                for (var i = 0; i < Math.ceil($total2 / $size2); i++) {
                    $scope.pages2.push({
                        index2 : i + 1
                    })
                }
                $scope.total2 = $total2;
                $scope.pageCountArr2=[];
                $scope.pageCount2=Math.ceil($scope.total2/ $scope.size2);
                for(var i=0;i<$scope.pageCount2;i++){
                     $scope.pageCountArr2.push({"pageIndex2":(i+1)});
                }
           
              
            });
            $scope.$watch('selectedPage2',function(newValue,oldValue){
                if(newValue!=oldValue){
                     $scope.toPage2(newValue.pageIndex2);
                }
            });
            $scope.size2 = $size2.toString();
            // $scope.$watch("size2", function() {
            //     $scope.pages2 = [];
            //     for (var i = 0; i < Math.ceil($scope.total2 / parseInt($scope.size2)); i++) {
            //         $scope.pages2.push({
            //             index2 : i + 1
            //         })
            //     }
            //     $scope.index2 = 1;
            //     $scope.ceilingIndex2 = 5;
            //     $searcher2($scope.index2,$scope.size2);
               
            // });
            $scope.index2 = $index2;
            $scope.myIndex2 = 1;
            $scope.ceilingIndex2 = 5;
            $scope.toFirst2 = function() {
                $scope.index2 = 1;
                $scope.ceilingIndex2 = 5;
                $searcher2($scope.index2,$scope.size2);

                $scope.myIndex2=1;
               
            };
            $scope.toLast2 = function() {
                $scope.index2 = $scope.pages2.length;
                $scope.ceilingIndex2 = $scope.pages2.length;
                $searcher2($scope.index2,$scope.size2);

                $scope.myIndex2 = $scope.pages2.length;
               
            };

            $scope.searchPrevious2 = function() {
                if(($scope.ceilingIndex2 == $scope.index2 + 4) && ($scope.index2>1)){
                    $scope.ceilingIndex2--;
                }
                if ($scope.index2 > 1) {
                    --$scope.index2;
                    $searcher2($scope.index2,$scope.size2);
                }

                $scope.myIndex2 = $scope.index2;
               
                
            };

            $scope.searchNext2 = function() {
                if(($scope.ceilingIndex2 == $scope.index2) && ($scope.index2<$scope.pages2.length)){
                    $scope.ceilingIndex2++;
                }
                if ($scope.index2 < $scope.pages2.length) {
                    ++$scope.index2;
                    $searcher2($scope.index2,$scope.size2);
                }

                $scope.myIndex2 = $scope.index2;
              
            };

            $scope.searchIndex2 = function(index2) {
                $scope.index2 = index2;
                $searcher2($scope.index2,$scope.size2);

                $scope.myIndex2 = $scope.index2;
               
            };

            $scope.toPage2 = function(myIndex2){
                if(myIndex2>$scope.pages2.length){

                }else{
                    $scope.ceilingIndex2 = Math.min(Number(myIndex2)+4,$scope.pages2.length)
                    $scope.searchIndex2(myIndex2);
                }
              
            }
        }
    }
});

