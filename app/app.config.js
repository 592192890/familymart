'use strict';

var app = angular.module('FamilyMartApp');
app.config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
            // .state('suggestionList', {
            //     url: '/suggestionList',
            //     cache:false,
            //     templateUrl: 'view/suggestion/suggestion_list.html'
              
            // })
            .state('consultList', {
                url: '/consultList',
                cache:true,
                templateUrl: 'view/consult/consult_list.html'
              
            })
            .state('announcementList', {
                url: '/announcementList',
                cache:true,
                templateUrl: 'view/announcement/announcement_list.html'
              
            })
            .state('submitSuggestionList', {
                url: '/submitSuggestionList',
                cache:true,
                templateUrl: 'view/suggestion/submitSuggestion_list.html'
              
            });
        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/consultList');
    });
app.run(['$rootScope','$interval','$location','$state','$stateParams',function($rootScope,$interval,$location,$state, $stateParams){
    //轮询查询是否有新的记录
    $rootScope.newRecords_interactive=0;
    $interval(function(){
       
        $rootScope.newRecords_interactive++;
    },3000);
}]);
