var request = require('request');

module.exports = function(app) {
  app.get('/api/v1/parking', function(req, res) {
    var limit = req.query.limit || 25;
    request.get({
      url: 'http://api.citysdk.waag.org/layers/parking.garage/objects?per_page=' + limit
    }, function(err, httpResponse, body) {
      console.log('/api/v1/parking response', body);
      console.log('/api/v1/parking error', err);
      if(err) {
        res.send(err);
      } else {
        res.send({
          status: 'ok',
          features: JSON.parse(body).features
        });
      }
    });
  });
};
