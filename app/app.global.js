var app=angular.module('FamilyMartApp');
//api url config
//app.value("baseApiUrl","http://familymart-api.azurewebsites.net");
// app.value("baseApiUrl","http://localhost:63342");

app.value("baseApiUrl","http://15.114.119.82");
app.value("FileUploaderServerForVideo","http://15.107.30.98/Uploader/Uploader/MergeFiles.ashx");
app.value("FileUploaderServerForPicture","http://15.107.30.98/Uploader/Uploader/fileupload.ashx");
app.value("PAGE_SIZE",5);