angular.module('sneakerBase').controller('userPageCtrl', function ($scope, mainSvc, $state) {
    $scope.loggedIn = false;
    mainSvc.getUser().then(function (result) {
        $scope.user = result;
        console.log('result from MainSvc.getUser', $scope.user)
        $scope.userId = result[0].id;
        if ($scope.userId) {
            $scope.loggedIn = true;
            // console.log('loggedIn from MainSvc', $scope.loggedIn)
            $scope.resetPage;
        }
    });

    var getAllData = function () {
        // console.log('loggedIn from homeCtrl', $scope.loggedIn)
        if ($scope.loggedIn) {
            //pass into function $scope.userid => service => server => getshoes.db
            mainSvc.getAllData().then(function (response) {
                $scope.shoes = response.data
                var shoes = response.data
                // console.log('from getAllData', $scope.shoes);

                var sum = 0;
                for (var i = 0; i < shoes.length; i++) {
                    var priceAsNumbers = shoes[i].price.replace("$", "").replace(".00", "")
                    // console.log(priceAsNumbers);
                    sum += Number(priceAsNumbers);
                }
                $scope.value = sum.toLocaleString();
            })
        } else {
            // console.log('not logged in')
            // console.log('There is no user data')
        }
    }
    setTimeout(function () {
        // console.log('running getAllData')
        getAllData();
    }, 1000);
       $scope.resetPage = function () {
        // console.log('reset')
        $scope.filter1 = "";
        $scope.filter2 = "";
        $scope.filter3 = "";
        $scope.filter4 = "";
        $scope.filter5 = "";
    }
    // var checkLoggedIn = $interval(function () {
    //     if ($scope.loggedIn === true) {
    //         console.log('running getAllData');
    //         $interval.cancel(checkLoggedIn)
    //         getAllData();
    //         $scope.resetPage();
    //     }
    //     else {
    //         console.log('Not yet!');
    //     }
    // }, 50);

    // checkLoggedIn();






    $scope.singleShoeView = function (oneShoeObject) {

        mainSvc.shoe = oneShoeObject
        $state.go('singleShoe')
    }

 
})

// controller: function($state, $rootScope){
//       $(document).ready(function(){
//         $('.nav').removeClass('sticky-nav');
//         var scroll_pos = 0;
//         $(document).scroll(function() {
//             scroll_pos = $(this).scrollTop();
//             if(scroll_pos > 20) {
//               $('.nav').addClass('sticky-nav');
//             } else {
//               $('.nav').removeClass('sticky-nav');
//             }
//         };