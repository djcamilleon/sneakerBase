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
        return $http({
            method: "POST",
            url: "/api/newShoe",
            data: {
                brand: registerObj.brand, 
                model: registerObj.model, 
                nickname: registerObj.nickname, 
                colorway: registerObj.colorway, 
                primary_color: registerObj.primary_color, 
                style_code: registerObj.style_code, 
                size: registerObj.size, 
                details: registerObj.details, 
                release_date: registerObj.release_date, 
                price: registerObj.price, 
                associated_athlete: registerObj.associated_athlete, 
                forefoot_cushioning_technology: registerObj.forefoot_cushioning_technology,
                heel_cushioning_technology: registerObj.heel_cushioning_technology, 
                type: registerObj.type,
                user_id:  user[0].id
           }
        })
        .then (function(shoe_id){
            // console.log('This is the new ',shoe_id);
            return shoe_id;
        })

        
    }

    this.registerNewShoeDetails = function(detailsObj, shoe_id){
        // console.log('This is the detailsObj from mainSvc.', detailsObj);
        // console.log('This is the shoe_id from mainSvc.', shoe_id)
        return $http({
            method: "POST",
            url: "/api/newShoe/details",
            data: {
                shoe_id: shoe_id,
                feature: detailsObj.feature[0] + ' ' + detailsObj.feature[1] + ' ' + detailsObj.feature[2]
            } 
        })
        .then (function(detailsObj){
            return detailsObj;
        })
    }

})