angular.module('sneakerBase')
    .controller('loginCtrl', function($scope){
        
app.get('/api/getUser', function(req, res) {
    console.log(req.session);
    if (req.user) {
        return res.status(200).send(req.user)
    }
    res.status(404).send('User not found')
})


})