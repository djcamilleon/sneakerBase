angular.module('sneakerBase')
  .controller('newShoeCtrl', function ($scope, mainSvc) {

    $scope.newShoeFeatures = {
      features: [{ text: '' }],
      links: [{ text: '' }],
      photos: [{ text: '' }]
    };

    $scope.addFeature = function () {
      $scope.newShoeFeatures.features.push({ text: '' });
    };

    $scope.addLinks = function () {
      $scope.newShoeFeatures.links.push({ text: '' });
    };

    $scope.addPhotos = function () {
      $scope.newShoeFeatures.photos.push({ text: '' });
    };

    $scope.registerNewShoe = function (registerObj) {
      console.log($scope.newShoeFeatures);
      registerObj.features = $scope.newShoeFeatures;
      mainSvc.registerNewShoe(registerObj).then(function (shoe_id) {
        // console.log(shoe_id)
        $scope.shoe_id = shoe_id.data[0].id;
      })
    };
  })