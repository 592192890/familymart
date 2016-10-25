var app = angular.module('directives', []);

app.directive('restaurantTab', function () {
    return {
        restrict: "E",
        scope: {
            state: "=",
            restaurant: "="
        },
        templateUrl: "app/component/commonView/tabs.html",
        link: function (scope, element, attrs) {
            scope.tabs = [{
                name: "已回复",
                state: "Yes"
            }, {
                name: "未回复",
                state: "No"
            }];
            scope.changeState = function (scope, element, attrs) {
                // todo
            };
        }
    };
});

app.directive('list', function () {
    return {
        restrict: "E",
        template: '<span>Hi there</span>',
        replace: 'true'
    };
});