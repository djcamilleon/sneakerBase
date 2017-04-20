var express = require('express');
var bodyParser = require('body-parser');
var app = module.exports = express();
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var session = require('express-session');
var config = require('./config.js');
var massive = require('massive');
var app = module.exports = express();

app.use(bodyParser.json())

app.use(express.static(__dirname + '/public'))

// // My original database code
// // Help from Sterling
var connectionString = 'postgres://bpdsypig:V8QSTOxMX_9PhzJGMJSw5RS-SGYdNeDx@stampy.db.elephantsql.com:5432/bpdsypig'
// var connectionString = 'postgres://postgres:zo384602@localhost/sneakers'
var db = massive.connectSync({ connectionString: connectionString });
app.set('db', db);

app.use(session({
    secret: config.secret,
    resave: true,
    saveUninitialized: false,
    cookie: {
        maxAge: (1000 * 60 * 60 * 24 * 14) // 14 days
    }
}));

passport.use(new GoogleStrategy({
    clientID: config.clientID,
    clientSecret: config.clientSecret,
    callbackURL: config.callbackURL,
    scope: ['openid', 'email', 'https://www.googleapis.com/auth/calendar']
}, function(accessToken, refreshToken, profile, done) {
    db.get_user([profile.id], function(err, user) {
        if (!user.length) {

            db.create_user([profile.id, profile.name.givenName, profile.name.familyName, accessToken], function(err, new_user) {
                if (err) {
                    console.log(err)
                } else {
                    return done(err, new_user[0])
                }
            })
        } else {
            return done(err, user[0])
        }
    })
}))

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(id, done) {
    db.get_user([id.google_id], function(err, user) {
        done(err, user[0]);
    });
});

app.use(passport.initialize());
app.use(passport.session());

app.get('/auth/google', passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login', 'https://www.googleapis.com/auth/calendar'] }));
app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/' }), function(req, res) {
    res.redirect('/#!/profile');
    console.log(req.session)
});
app.get('/logout', function(req, res) {
    console.log('hello', res)
    req.session.destroy(function(err, data) {
        console.log(data)

        res.redirect('/')
    });
});

var serverCtrl = require('./serverCtrl.js')

app.post('/api/newshoe', function (req, res){
    console.log(req.body)
    db.create_shoe([req.body.brand, req.body.model, req.body.nickname, req.body.colorway, req.body.primary_color, req.body.style_code, req.body.size, req.body.details, req.body.release_date, req.body.price, req.body.associated_athlete, req.body.forefoot_cushioning_technology, req.body.heel_cushioning_technology, req.body.type, req.body.user_id], function(err, shoe_id){
        console.log('This is from server.js', shoe_id)
        res.status(200).send(shoe_id);
    })
})

// app.post('/api/shoes/:add_shoe', function(req, res) {
//     // console.log(req.body);
//     db.create_shoe([req.body.brand, req.body.model, req.body.nickname, req.body.colorway, req.body.primary_color, req.body.details, req.body.release_date, req.body.price, req.body.associated_athlete, req.body.forefoot_cushioning_technology, req.body.heel_cushioning_technology, req.body.type], function(err, shoe_id) {
//         if (err) {
//             res.status(500).json(err);
//         } else {
//             var id_shoe = shoe_id[0].id;
//             for (var i = 0; i < req.body.features.length; i++) {
//                 db.create_features([req.body.features[i], id_shoe], function(err, success) {
//                     if (err) {
//                         console.log(err)
//                         res.status(500).json(err);
//                     }
//                 })
//             }
//             for (var j = 0; j < req.body.urls.length; j++) {
//                 db.create_links([req.body.urls[j], shoe_id], function(err, success) {
//                     if (err) {
//                         console.log(err)
//                         res.status(500).json(err);
//                     }

//                 })
//             }
//             for (var k = 0; k < req.body.photo_urls.length; k++) {
//                 db.create_photos([req.body.photo_urls[k], shoe_id], function(err, success) {
//                     if (err) {
//                         console.log(err)
//                         res.status(500).json(err);
//                     }
//                 })
//             }
//             res.status(200).json('Successfully added!')
//         }
//     });
// });

// app.post('/api/shoes/:add_shoe', function(req, res){
//     // console.log(req.body);
//     db.create_shoe([req.body.brand, req.body.model, req.body.nickname, req.body.colorway, req.body.primary_color, req.body.details, req.body.release_date, req.body.price, req.body.associated_athlete, req.body.forefoot_cushioning_technology, req.body.heel_cushioning_technology, req.body.type], function(err, shoe_id){
//         if(err){
//             res.status(500).json(err);
//         }
//         else {
//             var id_shoe = shoe_id[0].id;
//             for(var i = 0; i < req.body.features.length; i++){
//                 db.create_features([req.body.features[i], id_shoe], function (err, success){
//                     if(err){
//                         console.log(err)
//                     res.status(500).json(err);
//                 }
//                 })
//             }
//             for(var j = 0; j < req.body.urls.length; j++){
//                 db.create_links([req.body.urls[j], id_shoe], function(err, success){
//                      if(err){
//                          console.log(err)
//                     res.status(500).json(err);
//                 }

//                 })
//             }
//                     res.status(200).json('Successfully added!')
//         }
//     });



// })

// app.post('/api/shoes/:shoe_id', function(req, res) {
//     req.body.shoe_id = `{${req.body.shoe_id}}`
//     db.add_shoe_to_user([req.body.user_id, req.body.shoe_id], function(err, success) {
//         if (err) {
//             res.status(500).json(err);
//         } else {
//             res.status(200).json('Successfully added to your Collection!')
//         }
//     })
// })

//This code below was graciuosly written and provided by Scott Gourley!!

app.get('/api/everything', serverCtrl.getShoes)

// app.put('/fill', function(req, res){
//     db.update_feature([2, req.body.features], function(err, s){

//     })
// })


app.put('/api/shoes/:id', function(req, res) {
    db.put_shoe([req.params.id, req.body.brand, req.body.model, req.body.nickname, req.body.colorway, req.body.primary_color, req.body.details, req.body.release_date, req.body.price, req.body.associated_athlete, req.body.forefoot_cushioning_technology, req.body.heel_cushioning_technology, req.body.feature_1, req.body.feature_2, req.body.type, req.body.url_1, req.body.url_2, req.body.url_3, req.body.user_id], function(err, success) {
        if (err) {
            res.status(500).json(err);
        } else {
            res.status(200).json('Successfully updated!');
        }
    })
})

app.delete('/api/shoes/delete/:shoe_id', function(req, res) {
    db.delete_shoe([req.params.id], function(err, success) {
        if (err) {
            res.status(500).json(err);
        } else {
            res.status(200).json('Successfully deleted.');
        }
    })
})


app.get('/api/getUser', function(req, res) {
    console.log('api/getuser',req.session);
    console.log('api/getuser',req.session.passport);
    if (req.session.passport.user) {
        db.get_user([req.session.passport.user.google_id], function(err, success) {
            if (err) {
                console.log('err',err)
                res.status(500).json(err);
            } else {
                res.status(200).send(success);
            }
        })
    }

})





var port = 3000;
app.listen(port, function() {
    console.log('Listening on port ' + port)
})