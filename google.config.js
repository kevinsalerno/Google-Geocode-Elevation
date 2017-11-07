module.exports.geocode = {
    provider: 'google',
   
    // Optional depending on the providers
    httpAdapter: 'https', // Default
    apiKey: 'AIzaSyAAXSaX4Lp4cXieZJkVckDQfbNzxZmLOhI', // for Mapquest, OpenCage, Google Premier
    formatter: null         // 'gpx', 'string', ...
  };

  module.exports.elevation = {
      apiKey: 'AIzaSyDkzAuJyiqfsBXIBE9_MPYs9snFwCOJn6Y',
      url: 'https://maps.googleapis.com/maps/api/elevation/json'
  }