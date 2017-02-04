angular.module('sneakerBase').controller('navCtrl', function($scope, mainSvc){

    mainSvc.getUser().then(function(result){
        $scope.loggedIn = true;
    })
    .catch(function(err){
        $scope.loggedIn = false;
    })

   
});