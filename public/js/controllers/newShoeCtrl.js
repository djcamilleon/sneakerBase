angular.module('sneakerBase')
.controller('newShoeCtrl', function($scope, mainSvc){

  $scope.registerNewShoe = function(registerObj) {
    console.log(registerObj)
    mainSvc.registerNewShoe(registerObj).then(function(shoe_id){
console.log(shoe_id)
      $scope.shoe_id = shoe_id;
      
    })
  }


  
})