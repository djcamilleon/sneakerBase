angular.module('sneakerBase')
  .controller('newShoeCtrl', function ($scope, mainSvc) {

    $scope.registerNewShoe = function (registerObj) {
      console.log(registerObj)
      mainSvc.registerNewShoe(registerObj).then(function (shoe_id) {
        // console.log(shoe_id)
        $scope.shoe_id = shoe_id.data[0].id;
      })

      $scope.registerNewShoeDetails = function(detailsObj) {
        // console.log('Same shoe_id', $scope.shoe_id)
      mainSvc.registerNewShoeDetails(detailsObj,$scope.shoe_id).then(function(detailsObj){
        // console.log('This should be the detailsObj from newShoeCtrl', detailsObj);
        // console.log('This is the shoe_id from newShoeCtrl.', $scope.shoe_id)
        console.log('Returned obj after post', detailsObj);
      })
    }

    };

    
})