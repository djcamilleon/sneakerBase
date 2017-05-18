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
}, function (accessToken, refreshToken, profile, done) {
    db.get_user([profile.id], function (err, user) {
        if (!user.length) {

            db.create_user([profile.id, profile.name.givenName, profile.name.familyName, accessToken], function (err, new_user) {
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

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (id, done) {
    db.get_user([id.google_id], function (err, user) {
        done(err, user[0]);
    });
});

app.use(passport.initialize());
app.use(passport.session());

app.get('/auth/google', passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login', 'https://www.googleapis.com/auth/calendar'] }));
app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/' }), function (req, res) {
    res.redirect('/#!/profile');
    console.log(req.session)
});
app.get('/logout', function (req, res) {
    console.log('hello', res)
    req.session.destroy(function (err, data) {
        console.log(data)

        res.redirect('/')
    });
});

var serverCtrl = require('./serverCtrl.js')

app.post('/api/newShoe', function (req, res) {
    console.log(req.body)
    db.create_shoe([req.body.brand, req.body.model, req.body.nickname, req.body.colorway, req.body.primary_color, req.body.style_code, req.body.size, req.body.details, req.body.release_date, req.body.price, req.body.associated_athlete, req.body.forefoot_cushioning_technology, req.body.heel_cushioning_technology, req.body.type, req.body.user_id], function (err, shoe) {
        shoe = shoe[0];
        console.log('This is from server.js', shoe)

        var details = req.body.features;
        console.log('This is the details obj from server.js', details);

        var features = details.features.map(function (val) {
            return { shoe_id: shoe.id, feature: val.text };
        });
        var links = details.links.map(function (val) {
            return { shoe_id: shoe.id, url_1: val.text };
        });
        var photos = details.features.map(function (val) {
            return { shoe_id: shoe.id, photo_url: val.text };
        });
        console.log(links, photos);
        db.features.insert(features, function (err, result) {
            if (err) {
                return next(err)
            }
            db.links.insert(links, function (err, result) {
                if (err) {
                    return next(err);
                }
                db.photos.insert(photos, function (err, result) {
                    if (err) {
                        return next(err)
                    }
                    res.status(200).send("Shoe added successfully!");
                })
            })
        })
    })
})

app.post('/api/newShoe/details', function (req, res, next) {
    var obj = req.body.feature.features;
    var features = [];
    for (var i = 0; i < obj.length; i++) {
        if (obj[i]) {
            features.push({ shoe_id: req.body.shoe_id, feature: obj[i] });
        }
    }
    console.log('features obj from server.js', features, obj)
    db.features.insert(features, function (err, result) {
        if (err) {
            return next(err)
        }



        console.log("result: ", result[0]);
        res.status(200).json('Successfully added Features!');
    })
});

app.get('/api/everything', serverCtrl.getShoes)

app.put('/api/shoes/delete/', function (req, res) {
    console.log(req.body.shoe_id)
    db.delete_shoe([req.body.shoe_id], function (err, success) {
        if (err) {
            res.status(500).json(err);
        } else {
            res.status(200).json('Successfully removed from user_id.');
        }
    })
})


app.get('/api/getUser', function (req, res) {
    console.log('api/getuser', req.session);
    console.log('api/getuser', req.session.passport);
    if (req.session.passport.user) {
        db.get_user([req.session.passport.user.google_id], function (err, success) {
            if (err) {
                console.log('err', err)
                res.status(500).json(err);
            } else {
                res.status(200).send(success);
            }
        })
    }

})





var port = 3000;
app.listen(port, function () {
    console.log('Listening on port ' + port)
})