angular.module('sneakerBase').controller('userPageCtrl', function($scope, mainSvc, $state){
    mainSvc.getUser().then(function(result){
        console.log(result);
    });
    var getAllData = function(){
        mainSvc.getAllData().then(function(response){      
            $scope.shoes = response.data
            console.log($scope.shoes);
            
        })
    }
    getAllData();
 $scope.singleShoeView = function (oneShoeObject) {
   
        mainSvc.shoe = oneShoeObject
        $state.go('singleShoe')
    }

    $scope.reset = function() {
        $scope.filter1= "";
        $scope.filter2= "";
        $scope.filter3= "";
    }
})