/**
 * Created by liuzib on 7/27/16.
 */
angular.module('consultingService', [])

.service("issueDetailServiceProxy", function ($http) {
    var self = this;

    self.detailInfo = {};

    self.getDetailById = function (id) {
        //Get detail infomation via web api by id
        var data = {};
        data.departmentName = "资讯部";
        data.statusName = "处理中";
        data.content = "是否需要给门店一些更多的饮料和面包，每天的材料都不够。";
        data.picURLs = ["http://rescdn.qqmail.com/dyimg/20140409/72B8663B7F23.jpg", "http://e.hiphotos.baidu.com/image/h%3D200/sign=2cd05a8652e736d147138b08ab514ffc/94cad1c8a786c917ebe04663cf3d70cf3ac7578c.jpg"];
        data.createdDate = "2016年3月11日 上午11：51";

        self.detailInfo = data;
        return self.detailInfo;
    };
})

    .service("departmentServiceProxy", function () {
        var self = this;

        self.departments = [];

        self.addDepartment = function (departmentObj) {
            self.departments.push(departmentObj);
        };

        self.getDepartments = function () {
            return self.departments;
        };

        self.clearDepartments = function () {
            self.departments = [];
        };
    })
;