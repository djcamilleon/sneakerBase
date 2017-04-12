angular.module('sneakerBase')
    .controller('homeCtrl', function($scope){
        if($scope.userId != true) {
            console.log('not logged in')
        }
    })