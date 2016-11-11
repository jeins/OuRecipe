angular
    .module('app.shared')
    .factory('UploadService', UploadService);

UploadService.$inject = ['$log', 'Upload'];
function UploadService($log, Upload) {
    var vm = this;
    vm.url = ""; vm.imageName = "";

    return{
        setUploadUrl: setUploadUrl,
        uploadImage: uploadImage,
        getGeneratedImgName: getGeneratedImgName
    };

    function setUploadUrl(url){
        vm.url = url;
    }

    function uploadImage(file){
        if(_isImgMimeTypeAllow(file.name) && !file.$error){
            file = Upload.rename(file, _generateName(file.name));

            Upload.upload({
                url: vm.url,
                data: {file: file}
            }).then(function(response){
            });
        }
    }

    function getGeneratedImgName(){
        return vm.imageName;
    }

    function _isImgMimeTypeAllow(name){
        var res = name.toLowerCase().split('.');
        return !!(res[res.length - 1] == 'jpg' || res[res.length - 1] == 'png' || res[res.length - 1] == 'jpeg');
    }

    function _generateName(name){
        var tmpName = name.toLowerCase().split('.');
        vm.imageName = _generateHash(name) + "." + tmpName[tmpName.length-1];
        return vm.imageName;
    }

    function _generateHash(str)
    {
        var x = (str.charCodeAt(0) * 719) % 1138;
        var hash = 837;
        var i;
        for (i = 1; i <= str.length; i++){
            hash = (hash * i + 5 + (str.charCodeAt(i - 1) - 64) * x) % 98503;
        }
        return hash.toString();
    }
}