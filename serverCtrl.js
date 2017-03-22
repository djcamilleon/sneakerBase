var app = require('./server.js')

var db = app.get('db')

module.exports = {
  getShoes: function (req, res) {
    db.get_shoes([req.user.id], function (err, shoes) {
      if (err) {
        console.log(err)
        res.status(500).json(err);
      } else {
        console.log('SHOES', shoes)
        db.get_features([], function (err, features) {
          if (err) {
            res.status(500).json(err)
          } else {
            db.get_links([], function (err, links) {
              if (err) {
                res.status(500).json(err)
              } else {
                db.get_photos([], function (err, photos) {
                  if (err) {
                    res.status(500).json(err)
                  } else {
                    var obj = {
                      shoes: shoes,
                      features: features,
                      links: links,
                      photos: photos
                    }
                    var arr = obj.features.concat(obj.links, obj.photos)
                    obj.shoes.forEach(function (val) {
                      val.features = []
                      val.links = []
                      val.photos = []
                      for (var i = 0; i < arr.length; i++) {
                        var v = arr[i]
                        if (v.feature && v.shoe_id === val.id) {
                          val.features.push(v.feature)
                        } else if (v.url_1 && v.shoe_id === val.id) {
                          val.links.push(v.url_1)
                        } else if (v.photo_url && v.shoe_id === val.id) {
                          val.photos.push(v.photo_url)
                        }
                      }

                    })
                    res.status(200).json(obj.shoes)
                  }
                })
              }
            })
          }
        })
      }
    })
  },



}