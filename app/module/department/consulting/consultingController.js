angular.module('consultingController', ['pagingComponent','ckEditorComponent','angularFileUpload'])

.controller('homeCtrl', ['$scope','baseApiUrl','FileUploader','$modal',function($scope,baseApiUrl,FileUploader,$modal) {
     $scope.query={
        entity:{
            
        }
    };

    $scope.test=function(){
        console.log($scope.query);
    }

    // $scope.file = {};

    $scope.ModalInstanceCtrl = function($scope, $modalInstance) {  
      
        $scope.ok = function() {  
            $modalInstance.close($scope.selected);  
        };  
        $scope.cancel = function() {  
            $modalInstance.dismiss('cancel');  
        };  
    };  
        
    $scope.open=function(){
        ModalUtil.createModal($modal,$scope,$scope.ModalInstanceCtrl);
    }

    $scope.uploader = UploaderUtil.create(
			FileUploader,
			{
				url : 'http://localhost:3000/',
				formData : [ {
				} ],
				alias : 'file',
				autoUpload : true,
				success : function(result) {
					// if ('1' == result.code) {
						alert('图片上传成功', 'success');
						
						
					// }
					// else {
					// 	alert("图片上传失败");
					// }
				},
                error:function(err){
                    alert("err");
                }
			});



    $scope.totalPages=0;

    $scope.doPagingSearch=function(index,pageSize){

    }
}])

.controller('issueListCtrl', function($scope,$state,$q) {
        $scope.changeState = function (scope, element, attrs) {
            // todo
        };
        $scope.tabs = [{
            name: "已回复",
            state: "Yes"
        }, {
            name: "未回复",
            state: "No"
        }];

        $scope.state = "Yes";

      $scope.playlists = [
        { departments: '资讯部', createDate:'7/9/2016', id: 1 , content:'是否需要给门店一些更多的饮料和面包，每天的材料都不够。'},
        { departments: '资讯部', createDate:'7/8/2016',id: 2 , content:'是否需要给门店一些更多的饮料和面包，每天的材料都不够。' },
        { departments: '资讯部', createDate:'7/7/2016',id: 3  , content:'是否需要给门店一些更多的饮料和面包，每天的材料都不够。'},
        { departments: '资讯部', createDate:'7/6/2016',id: 4  , content:'是否需要给门店一些更多的饮料和面包，每天的材料都不够。'},
        { departments: '资讯部', createDate:'7/5/2016',id: 5  , content:'是否需要给门店一些更多的饮料和面包，每天的材料都不够。'},
        { departments: '资讯部', createDate:'7/4/2016',id: 6  , content:'是否需要给门店一些更多的饮料和面包，每天的材料都不够。'}
      ];

      $scope.statego = function (id) {
          $state.go('consulting-list-view', { listId: id });
      };

        var items_per_page = 10;
        var scroll_in_progress = false;
        var myScroll;

        load_content = function(refresh, next_page) {

            // This is a DEMO function which generates DEMO content into the scroller.
            // Here you should place your AJAX request to fetch the relevant content (e.g. $.post(...))

            console.log(refresh, next_page);
            setTimeout(function() { // This immitates the CALLBACK of your AJAX function
                if (!refresh) {
                    // Loading the initial content
                    $('#wrapper > #scroller > ul').append('<li>Pretty row initial content</li>');
                    $('#wrapper > #scroller > ul').append('<li>Pretty row initial content</li>');
                    $('#wrapper > #scroller > ul').append('<li>Pretty row initial content</li>');
                    $('#wrapper > #scroller > ul').append('<li>Pretty row initial content</li>');
                    $('#wrapper > #scroller > ul').append('<li>Pretty row initial content</li>');
                    $('#wrapper > #scroller > ul').append('<li>Pretty row initial content</li>');
                    $('#wrapper > #scroller > ul').append('<li>Pretty row initial content</li>');
                    $('#wrapper > #scroller > ul').append('<li>Pretty row initial content</li>');
                    $('#wrapper > #scroller > ul').append('<li>Pretty row initial content</li>');
                    $('#wrapper > #scroller > ul').append('<li>Pretty row initial content</li>');
                } else if (refresh && !next_page) {
                    // Refreshing the content
                    $('#wrapper > #scroller > ul').html('');
                    $('#wrapper > #scroller > ul').append('<li>Pretty row Refreshed</li>');
                    $('#wrapper > #scroller > ul').append('<li>Pretty row Refreshed</li>');
                    $('#wrapper > #scroller > ul').append('<li>Pretty row Refreshed</li>');
                    $('#wrapper > #scroller > ul').append('<li>Pretty row Refreshed</li>');
                    $('#wrapper > #scroller > ul').append('<li>Pretty row Refreshed</li>');
                    $('#wrapper > #scroller > ul').append('<li>Pretty row Refreshed</li>');
                    $('#wrapper > #scroller > ul').append('<li>Pretty row Refreshed</li>');
                    $('#wrapper > #scroller > ul').append('<li>Pretty row Refreshed</li>');
                    $('#wrapper > #scroller > ul').append('<li>Pretty row Refreshed</li>');
                    $('#wrapper > #scroller > ul').append('<li>Pretty row Refreshed</li>');
                    $('#wrapper > #scroller > ul').append('<li>Pretty row Refreshed</li>');
                    $('#wrapper > #scroller > ul').append('<li>Pretty row Refreshed</li>');
                    $('#wrapper > #scroller > ul').append('<li>Pretty row Refreshed</li>');
                    $('#wrapper > #scroller > ul').append('<li>Pretty row Refreshed</li>');
                } else if (refresh && next_page) {
                    // Loading the next-page content and refreshing
                    $('#wrapper > #scroller > ul').append('<li>Pretty row X</li>');
                    $('#wrapper > #scroller > ul').append('<li>Pretty row X</li>');
                    $('#wrapper > #scroller > ul').append('<li>Pretty row X</li>');
                    $('#wrapper > #scroller > ul').append('<li>Pretty row X</li>');
                    $('#wrapper > #scroller > ul').append('<li>Pretty row X</li>');
                    $('#wrapper > #scroller > ul').append('<li>Pretty row X</li>');
                    $('#wrapper > #scroller > ul').append('<li>Pretty row X</li>');
                    $('#wrapper > #scroller > ul').append('<li>Pretty row X</li>');
                    $('#wrapper > #scroller > ul').append('<li>Pretty row X</li>');
                    $('#wrapper > #scroller > ul').append('<li>Pretty row X</li>');
                    $('#wrapper > #scroller > ul').append('<li>Pretty row X</li>');
                    $('#wrapper > #scroller > ul').append('<li>Pretty row X</li>');
                }

                if (refresh) {

                    myScroll.refresh();
                    pullActionCallback();

                } else {

                    if (myScroll) {
                        myScroll.destroy();
                        $(myScroll.scroller).attr('style', ''); // Required since the styles applied by IScroll might conflict with transitions of parent layers.
                        myScroll = null;
                    }
                    trigger_myScroll();

                }
            }, 1000);

        };

        function pullDownAction() {
            load_content('refresh');
            $('#wrapper > #scroller > ul').data('page', 1);

            // Since "topOffset" is not supported with iscroll-5
            $('#wrapper > .scroller').css({top:0});

        }
        function pullUpAction(callback) {
            if ($('#wrapper > #scroller > ul').data('page')) {
                var next_page = parseInt($('#wrapper > #scroller > ul').data('page'), 10) + 1;
            } else {
                var next_page = 2;
            }
            load_content('refresh', next_page);
            $('#wrapper > #scroller > ul').data('page', next_page);

            if (callback) {
                callback();
            }
        }
        function pullActionCallback() {
            if (pullDownEl && pullDownEl.className.match('loading')) {

                pullDownEl.className = 'pullDown';
                pullDownEl.querySelector('.pullDownLabel').innerHTML = '下拉刷新';

                myScroll.scrollTo(0, parseInt(pullUpOffset)*(-1), 200);

            } else if (pullUpEl && pullUpEl.className.match('loading')) {

                $('.pullUp').removeClass('loading').html('');

            }
        }

        var pullActionDetect = {
            count:0,
            limit:10,
            check:function(count) {
                if (count) {
                    pullActionDetect.count = 0;
                }
                // Detects whether the momentum has stopped, and if it has reached the end - 200px of the scroller - it trigger the pullUpAction
                setTimeout(function() {
                    if (myScroll.y <= (myScroll.maxScrollY + 200) && pullUpEl && !pullUpEl.className.match('loading')) {
                        $('.pullUp').addClass('loading').html('<span class="pullUpIcon">&nbsp;</span><span class="pullUpLabel">加载中...</span>');
                        pullUpAction();
                    } else if (pullActionDetect.count < pullActionDetect.limit) {
                        pullActionDetect.check();
                        pullActionDetect.count++;
                    }
                }, 200);
            }
        }

        function trigger_myScroll(offset) {
            pullDownEl = document.querySelector('#wrapper .pullDown');
            if (pullDownEl) {
                pullDownOffset = pullDownEl.offsetHeight;
            } else {
                pullDownOffset = 0;
            }
            pullUpEl = document.querySelector('#wrapper .pullUp');
            if (pullUpEl) {
                pullUpOffset = pullUpEl.offsetHeight;
            } else {
                pullUpOffset = 0;
            }

            if ($('#wrapper ul > li').length < items_per_page) {
                // If we have only 1 page of result - we hide the pullup and pulldown indicators.
                $('#wrapper .pullDown').hide();
                $('#wrapper .pullUp span').hide();
                offset = 0;
            } else if (!offset) {
                // If we have more than 1 page of results and offset is not manually defined - we set it to be the pullUpOffset.
                offset = pullUpOffset;
            }

            myScroll = new IScroll('#wrapper', {
                probeType:1, tap:true, click:false, preventDefaultException:{tagName:/.*/}, mouseWheel:true, scrollbars:true, fadeScrollbars:true, interactiveScrollbars:false, keyBindings:false,
                deceleration:0.0002,
                startY:(parseInt(offset)*(-1))
            });

            myScroll.on('scrollStart', function () {
                scroll_in_progress = true;
            });
            myScroll.on('scroll', function () {

                scroll_in_progress = true;

                if ($('#wrapper ul > li').length >= items_per_page) {
                    if (this.y >= 5 && pullDownEl && !pullDownEl.className.match('flip')) {
                        pullDownEl.className = 'pullDown flip';
                        pullDownEl.querySelector('.pullDownLabel').innerHTML = '松开刷新';
                        this.minScrollY = 0;
                    } else if (this.y <= 5 && pullDownEl && pullDownEl.className.match('flip')) {
                        pullDownEl.className = 'pullDown';
                        pullDownEl.querySelector('.pullDownLabel').innerHTML = '下拉刷新';
                        this.minScrollY = -pullDownOffset;
                    }

                    console.log(this.y);
                    pullActionDetect.check(0);

                }
            });
            myScroll.on('scrollEnd', function () {
                console.log('scroll ended');
                setTimeout(function() {
                    scroll_in_progress = false;
                }, 100);
                if ($('#wrapper ul > li').length >= items_per_page) {
                    if (pullDownEl && pullDownEl.className.match('flip')) {
                        pullDownEl.className = 'pullDown loading';
                        pullDownEl.querySelector('.pullDownLabel').innerHTML = '刷新中...';
                        pullDownAction();
                    }
                    // We let the momentum scroll finish, and if reached the end - loading the next page
                    pullActionDetect.check(0);
                }
            });

            // In order to prevent seeing the "pull down to refresh" before the iScoll is trigger - the wrapper is located at left:-9999px and returned to left:0 after the iScoll is initiated
            setTimeout(function() {
                $('#wrapper').css({left:0});
            }, 100);
        }

        /*function loaded() {

            load_content();

        }*/

        angular.element(document).ready(function(){
            setTimeout(function() {
                load_content();
            }, 200);
        });

        document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
    })

.controller('issueDetailCtrl', function($scope, $stateParams,issueDetailServiceProxy) {
        $scope.playlistId = $stateParams.playlistId;

        var data = issueDetailServiceProxy.getDetailById(1);
        $scope.departmentName = data.departmentName;
        $scope.statusName = data.statusName;
        $scope.content = data.content;
        $scope.picURLs = data.picURLs;
        $scope.createdDate = data.createdDate;

})

.controller('browseCtrl', function($scope,departmentServiceProxy) {
    var selectedDepartment = departmentServiceProxy.getDepartments();
        var choseDepartments = '';
        angular.forEach(selectedDepartment,function(value,key){
            if(value.checked === true){
                choseDepartments += value.departmentName + ',';
            }
        });
    $scope.choseDepartments = choseDepartments;
})

.controller('selectDepartmentCtrl', function($scope,$rootScope,$window,$location,departmentServiceProxy) {
    $scope.departmentLists = [
        { id: 1 , departmentName: '资讯部', checked:false },
        { id: 2 , departmentName: '建设部', checked:false },
        { id: 3 , departmentName: '物流部', checked:false },
        { id: 4 , departmentName: '营业推进部', checked:false }
    ];

    $scope.chooseDepartment = function () {
        var list = $scope.departmentLists;
        departmentServiceProxy.clearDepartments();

        angular.forEach(list, function (value, key) {
            departmentServiceProxy.addDepartment(value);
        });
        $location.url("/app/browse");
    };
})
;
