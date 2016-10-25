'use strict';
/***********************************************************************
 * 描述：富文本组件<br>
 * -----------------------------------------------------------------<br>
 * 变更序号：<br>
 * 修改日期：<br>
 * 修改人员：<br>
 * 修改原因：<br>
 * **********************************************************************
 */

var app = angular.module('ckEditorComponent', []);

app.directive('ckEditor', function ($compile, $parse, $log, $timeout) {
    return {
        restrict: "A",
        
        require: 'ngModel',
        link : function(scope, element, attrs, ngModel) {
            var setter = $parse(attrs.ngModel).assign;
            var $scope = element.scope();
            var height = attrs.height || '300px';  
            var width = attrs.width || '950px';

            var ckeditor = CKEDITOR.replace(element[0], {filebrowserImageUploadUrl : 'http://localhost:3000/',height:height, width:width,removePlugins:'elementspath' });
            if (!ngModel) {
                return;
            }
            ckeditor.on('instanceReady', function() {
                ckeditor.setData(ngModel.$viewValue);
            });
            ckeditor.on('pasteState', function() {
                scope.$apply(function() {
                    ngModel.$setViewValue(ckeditor.getData());
                });
            });

            ngModel.$render = function(value) {
                ckeditor.setData(ngModel.$viewValue);
            };


        }
    }

});