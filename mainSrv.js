angular.module('app').service('mainSrv', function ($http, Upload, $window) {
    this.serviceTest = 'service is connected'

    var vm = this

    vm.upload = function (file) {
        return Upload.upload({
            url: '/upload', //webAPI exposed to upload the file
            data:{file:file} //pass file as data, should be user ng-model
        }).then(function (resp) { //upload function returns a promise
            if(resp.data.error_code === 0){ //validate success
                $window.alert(`Success! ${resp.config.data.file.name} was uploaded successfully and can be accessed here: ${resp.data.url}`);
                return resp.data.url
            } else {
                $window.alert('an error occurred');
            }
        }, function (resp) { //catch error
            console.log('Error status: ' + resp.status);
            $window.alert('Error status: ' + resp.status);
        });
    };
    vm.item = obj => {
        console.log('got here')
        return obj
    }
})