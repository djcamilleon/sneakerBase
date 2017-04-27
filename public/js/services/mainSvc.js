angular.module('sneakerBase').service('mainSvc', function( $http, $q){
    this.testUser = false;
var user;
    this.getUser = function(){
        // console.log('getting user');
        var promise = $q.defer()
        $http.get('/api/getUser').then(function(result){
            user = result.data;
            this.testUser = true;
            // console.log('mainSvc result', result);
            // console.log('mainSvc user', user[0].first_name);
            // console.log('testUser should be true: ', this.testUser)
            promise.resolve(user);
        }).catch(function(err){
            // console.log('err', err);
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

    this.registerNewShoe = function(registerObj){
        console.log(user)
        registerObj.user_id = user[0].id;
        return $http({
            method: "POST",
            url: "/api/newShoe",
            data: registerObj
        })
        .then (function(shoe_id){
            // console.log('This is the new ',shoe_id);
            return shoe_id;
        })

        
    }

    this.registerNewShoeDetails = function(detailsObj, shoe_id){
        return $http({
            method: "POST",
            url: "/api/newShoe/details",
            data: {
                shoe_id: shoe_id,
                feature: detailsObj
            } 
        })
        .then (function(detailsObj){
            return detailsObj;
        })
    }

    this.deleteShoe = function(shoe_id) {
        console.log('This is the shoe id from the MainSvc', shoe_id)
        return $http({
            method: "PUT",
            url: "/api/shoes/delete",
            data: {
                shoe_id: shoe_id
            }
        })
        .then (function(response){
            return response;
        })
    }

})