angular.module('sneakerBase').controller('singleShoeCtrl', function ($scope, $state, mainSvc) {
    $scope.shoe = mainSvc.shoe;
    $scope.photos = mainSvc.shoe.photos
    // console.log($scope.photos);
    console.log($scope.shoe);

    $scope.slickConfig = {
        enabled: true,
        autoplay: false,
        draggable: false,
        infinite: true,
        adaptiveHeight: true,
        method: {},
    }

    $scope.slickOn = false;
    $scope.init = function () {
        $scope.slickOn = true;
    }
    // $('.init').on('reInit', function(slick){
    //     console.log('This should reinitialize the carousel... I think...')
    // })

    $scope.deleteShoeFromUser = function (id) {
        //  console.log('this is the id from the singleShoeCtrl', id)
        mainSvc.deleteShoe(id).then(function (response) {
            console.log('Successfully removed from user_id.')
        })
    }
});