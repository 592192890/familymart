'use strict';
/*
*文件上传util,一次只上传一个,但没有转为base64
*
*/
function UploaderUtil() {};

UploaderUtil.create = function(FileUploader, options) {
	
	var _options = {
		autoUpload: false,
		withCredentials: true,
		onAfterAddingFile: function(item) {
			if (options.success) {
				item.onSuccess = options.success;
			}
			if (options.cancel) {
				item.onCancel = options.cancel;
			}
            if(options.error){
                item.onError=options.error;
            }
		}
	
	};
	angular.extend(_options, options);
	// _options.filters = filters;
	var uploader = new FileUploader(_options);
	return uploader;
};