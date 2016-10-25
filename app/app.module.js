'use strict';

var app=angular.module('FamilyMartApp', [
    'ui.router',
    // 'ngAnimate',
    
    // 'angularFileUpload',
    'mainController',
    'consultListController', 
    // 'suggestiontListController',
    'consultDetailOperationController',
    'consultDetailUnOperationController',
    'announcementListController',
    'submitSuggestionListController',

    "submitSuggestionDetailController",
    "suggestionDetailUnOperationController",
    "suggestionDetailOperationController",
	"submitSuggestionAddController",

    'interactiveTopNavController',
    'webUploaderController',
    'httpService',
    'apiUrlService',
    'pagingComponent',
    'pagingComponent2',
    'pagingComponent3',
    'pagingComponent4',
    'webUploaderComponent',
    'ui.bootstrap'
]);