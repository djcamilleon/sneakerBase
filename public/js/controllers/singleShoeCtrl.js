angular.module('sneakerBase').controller('singleShoeCtrl', function($scope, $state, mainSvc) {
    $scope.shoe = mainSvc.shoe;
    $scope.photos = mainSvc.shoe.photos
        // console.log($scope.photos);
    console.log($scope.shoe);

    $scope.slickConfig = {
        enabled: true,
        autoplay: false,
        draggable: true,
        infinite: true,
        method: {},
    }

    $scope.slickOn = false;
    $scope.init = function() {
        $scope.slickOn = true;
    }
});