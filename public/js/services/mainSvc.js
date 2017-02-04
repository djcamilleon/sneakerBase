angular.module('sneakerBase').service('mainSvc', function( $http, $q){
var user;
    this.getUser = function(){
        var promise = $q.defer()
        $http.get('/api/getUser').then(function(result){
            user = result.data;
            console.log(result);
            promise.resolve(user);
        }).catch(function(err){
            console.log(err);
        })
        return promise.promise;
    }

    this.getAllData = function(){
        return $http({
            method: "GET",
            url: "/api/everything"
        })
    }
    this.shoe;
})