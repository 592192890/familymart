'use strict';
/* httpService 
*
* baseApiUrl：server ip:port
*
*
*/

var apiUrlService = angular.module("apiUrlService",[]);

//do get 
apiUrlService.factory("doRequestUrl",function(){
		var apiUrl={};
        apiUrl.requestConsultList="/api/ResponseList";		
        apiUrl.checkConsultDetail="/api/Request";
        apiUrl.operateConsult='/api/ResponseRequest';

        apiUrl.searchConsult="/api/SearchRequest";
        
        apiUrl.requestSuggestionList="/api/suggestionlist";
        apiUrl.requestSuggestionOperation="/app/json/suggestionList_forDept.json";
        apiUrl.checkSuggestionDetail="/api/suggestion";
        apiUrl.addSuggestion="/api/addsuggestion";
        apiUrl.solveSuggestion="/api/solvesuggestion";
		
        
        apiUrl.changeDepartment="/api/TransferRequest";

        apiUrl.exportConsuleExcel="/api/exportrequest";
        apiUrl.exportSuggestionExcel="/api/exportsuggestion";

        //下拉框
        apiUrl.department="/api/departmentList";
        apiUrl.categoryList="/api/categorylist";

        return apiUrl;
    }
);


									