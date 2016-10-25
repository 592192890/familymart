'use strict';
/* httpService 
*
* baseApiUrl：server ip:port
*
*
*/

var httpService = angular.module("httpService",[]);

//do get 
httpService.factory("doGetRequest",["baseApiUrl","$http",function(baseApiUrl,$http){
										 
        var doGetRequest = function(url,data){
            //url = baseApiUrl + url;
            url = url;
            if(url == null||url == "undefined"){
                console.log("url can't be null ");
                return;
                }
            if(data == null || data==="undefined"){
                data = {};
                console.log("you request is no params");
            }
            
            var req = {
                type:"GET",
                url:url,
                data:data,
				crossDomain: true
            };
            return $.ajax(req);
        };
        return {
            doGetRequest:function(url,data){
                return doGetRequest(url,data);
            }
        };	
    }
]);

//do post
httpService.factory("doPostRequest",["baseApiUrl","$http",function(baseApiUrl,$http){
													  
            var doPostRequest = function(url,data){
               //url = baseApiUrl + url;
               url = url;                
               if(url == null||url == "undefined"){
                    console.log("url can't be null ");
                    return;
                }
                if(data == null || data==="undefined"){
                    data = {};
                    console.log("you request is no params");
                }
                var req = {
                    type:"POST",
                    url:url,
                    data:data,
					crossDomain: true
                };
                return $.ajax(req);
            };

            return {
                doPostRequest:function(url,data){
                    return doPostRequest(url,data);
                }
            };	
        }
    ]);
									