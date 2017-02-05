angular.module('sneakerBase').controller('singleShoeCtrl', function($scope, $state, mainSvc) {
    $scope.shoe = mainSvc.shoe;
    $scope.photos = mainSvc.shoe.photos
        // console.log($scope.photos);
    console.log($scope.shoe);
});