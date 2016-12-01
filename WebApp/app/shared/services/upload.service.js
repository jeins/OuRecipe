angular
    .module('app.shared')
    .factory('UploadService', UploadService);

UploadService.$inject = ['$log', 'Upload'];
function UploadService($log, Upload) {
    let vm = this;
    vm.url = ""; vm.imageName = "";

    return{
        setUploadUrl: setUploadUrl,
        uploadImage: uploadImage,
        getGeneratedImgName: getGeneratedImgName
    };

    function setUploadUrl(url){
        vm.url = url;
    }

    function uploadImage(file, cb){
        if(_isImgMimeTypeAllow(file.name) && !file.$error){
            file = Upload.rename(file, _generateName(file.name));

            Upload.upload({
                url: vm.url,
                data: {file: file}
            }).then(function(response){
                cb(response);
            });
        }
    }

    function getGeneratedImgName(){
        return vm.imageName;
    }

    function _isImgMimeTypeAllow(name){
        let res = name.toLowerCase().split('.');
        return res[res.length - 1] == 'jpg' || res[res.length - 1] == 'png' || res[res.length - 1] == 'jpeg';
    }

    function _generateName(name){
        let tmpName = name.toLowerCase().split('.');
        vm.imageName = _generateHash(name + Date.now()) + "." + tmpName[tmpName.length-1];
        return vm.imageName;
    }

    function _generateHash(str)
    {
        let x = (str.charCodeAt(0) * 719) % 1138;
        let hash = 837;
        let i;
        for (i = 1; i <= str.length; i++){
            hash = (hash * i + 5 + (str.charCodeAt(i - 1) - 64) * x) % 98503;
        }
        return hash.toString();
    }
}