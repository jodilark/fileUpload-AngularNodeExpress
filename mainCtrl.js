angular.module("app").controller('mainCtrl', function ($scope, mainSrv, Upload, $window) {
    $scope.controllerTest = "controller is connected"
    $scope.serviceTest = mainSrv.serviceTest

    var vm = this;
    vm.submit = function(){ //function to call on form submit
        if (vm.upload_form.file.$valid && vm.file) { //check if from is valid
            mainSrv.upload(vm.file).then(response => {
                //now send the other form data including the returned url
                mainSrv.item({"title": vm.text, "url": response})
                $scope.newImg = response
            }); //call upload function
        }        
    }

})