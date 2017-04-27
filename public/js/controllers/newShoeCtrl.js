angular.module('sneakerBase')
  .controller('newShoeCtrl', function ($scope, mainSvc) {
    
    $scope.newShoeFeatures = {
      features: [{text: ''}],
      links: [{text: ''}],
      photos: [{text: ''}]
    };
    
    $scope.addFeature = function() {
      $scope.newShoeFeatures.features.push({text: ''});
    };

    $scope.addLinks = function() {
      $scope.newShoeFeatures.links.push({text: ''});
    };

    $scope.addPhotos = function() {
      $scope.newShoeFeatures.photos.push({text: ''});
    };

    $scope.registerNewShoe = function (registerObj) {
      console.log($scope.newShoeFeatures);
      registerObj.features = $scope.newShoeFeatures;
      mainSvc.registerNewShoe(registerObj).then(function (shoe_id) {
        // console.log(shoe_id)
        $scope.shoe_id = shoe_id.data[0].id;
      })

      

    //   $scope.registerNewShoeDetails = function(f1, f2, f3) {
    //     var obj = {
    //       photos: [],
    //       features: [f1, f2, f3]
    //     }
    //     // console.log(obj);
    //     // console.log('Same shoe_id', $scope.shoe_id)
    //   mainSvc.registerNewShoeDetails(obj, $scope.shoe_id).then(function(obj){
    //     // console.log('This should be the detailsObj from newShoeCtrl', detailsObj);
    //     // console.log('This is the shoe_id from newShoeCtrl.', $scope.shoe_id)
    //     console.log('Returned obj after post', obj);
    //   })
    // }

    };
    
})