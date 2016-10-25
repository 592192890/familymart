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

var app = angular.module('pagingComponent3', []);

app.directive('paging3', function ($compile, $parse, $log, $timeout,PAGE_SIZE) {
    return {
        restrict: "A",
        templateUrl: "view/templs/paging3.html",
        link : function(scope, element, attrs, controller) {

            //juedge whether use use specificsize attribute
            if(attrs.specificsize3){
                var $size3 = new Number(attrs.specificsize3);
            }else{
                var $size3 = new Number(PAGE_SIZE);
            }

            var total3 = attrs.total3,index3 = attrs.index3, searcher3 = attrs.searcher3;
            var $index3 = $parse(index3)(scope), $searcher3 = $parse(searcher3)(scope);
            var $scope = element.scope();

            scope.$watch(total3, function() {
                var $total3 = $parse(total3)(scope);
                $scope.pages3 = [];
                for (var i = 0; i < Math.ceil($total3 / $size3); i++) {
                    $scope.pages3.push({
                        index3 : i + 1
                    })
                }
                $scope.total3 = $total3;
                $scope.pageCountArr3=[];
                $scope.pageCount3=Math.ceil($scope.total3/ $scope.size3);
                for(var i=0;i<$scope.pageCount3;i++){
                     $scope.pageCountArr3.push({"pageIndex3":(i+1)});
                }
           
              
            });
            $scope.$watch('selectedPage3',function(newValue,oldValue){
                if(newValue!=oldValue){
                     $scope.toPage3(newValue.pageIndex3);
                }
            });
            $scope.size3 = $size3.toString();
            // $scope.$watch("size3", function() {
            //     $scope.pages3 = [];
            //     for (var i = 0; i < Math.ceil($scope.total3 / parseInt($scope.size3)); i++) {
            //         $scope.pages3.push({
            //             index3 : i + 1
            //         })
            //     }
            //     $scope.index3 = 1;
            //     $scope.ceilingIndex3 = 5;
            //     $searcher3($scope.index3,$scope.size3);
               
            // });
            $scope.index3 = $index3;
            $scope.myIndex3 = 1;
            $scope.ceilingIndex3 = 5;
            $scope.toFirst3 = function() {
                $scope.index3 = 1;
                $scope.ceilingIndex3 = 5;
                $searcher3($scope.index3,$scope.size3);

                $scope.myIndex3=1;
               
            };
            $scope.toLast3 = function() {
                $scope.index3 = $scope.pages3.length;
                $scope.ceilingIndex3 = $scope.pages3.length;
                $searcher3($scope.index3,$scope.size3);

                $scope.myIndex3 = $scope.pages3.length;
               
            };

            $scope.searchPrevious3 = function() {
                if(($scope.ceilingIndex3 == $scope.index3 + 4) && ($scope.index3>1)){
                    $scope.ceilingIndex3--;
                }
                if ($scope.index3 > 1) {
                    --$scope.index3;
                    $searcher3($scope.index3,$scope.size3);
                }

                $scope.myIndex3 = $scope.index3;
               
                
            };

            $scope.searchNext3 = function() {
                if(($scope.ceilingIndex3 == $scope.index3) && ($scope.index3<$scope.pages3.length)){
                    $scope.ceilingIndex3++;
                }
                if ($scope.index3 < $scope.pages3.length) {
                    ++$scope.index3;
                    $searcher3($scope.index3,$scope.size3);
                }

                $scope.myIndex3 = $scope.index3;
              
            };

            $scope.searchIndex3 = function(index3) {
                $scope.index3 = index3;
                $searcher3($scope.index3,$scope.size3);

                $scope.myIndex3 = $scope.index3;
               
            };

            $scope.toPage3 = function(myIndex3){
                if(myIndex3>$scope.pages3.length){

                }else{
                    $scope.ceilingIndex3 = Math.min(Number(myIndex3)+4,$scope.pages3.length)
                    $scope.searchIndex3(myIndex3);
                }
              
            }
        }
    }
});

