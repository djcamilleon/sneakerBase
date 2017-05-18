angular.module('sneakerBase')
    .controller('loginCtrl', function($scope){
        if ($scope.userId) {
            console.log('This is the userId from the loginCtrl', userId)
            $scope.loggedIn = true;
            // console.log('loggedIn from MainSvc', $scope.loggedIn)
        }
        else {
            $scope.loggedIn = false;
        }
})