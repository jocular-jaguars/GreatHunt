.factory('photos') {

  // this isn't a properly setup factory, you'll have to copy it over and set it up

  // this needs to be implemented on the front end using photo uploader
  // and then set the chosen photo to photoFile.
  var photoFile = "some file" 
  

  // still need to setup and get the parse api keys


  // need to add '/api/keys' to routes on bakend to serve up the api keys for parse
  // they can be stored in env variables in Heroku so we don't commit them to git.
  var getPhotoAPIKeys = function() {
    return $http.get('/api/keys')
      .then(function(resp) {
        return resp.data;
      });
  };

  var uploadPhoto = function(file, callback) {
    // takes a File after upload and uploads it to Parse.
    // Sends Url of upload to callback function to use elsewhere in the app
    var serverUrl = 'https://api.parse.com/1/files/' + file.name;

    getPhotoAPIKeys().then(function(keys) {
      $http.post(serverUrl, photoFile, {
        headers: {
          'X-Parse-Application-Id': keys['X-Parse-Application-Id'],
          'X-Parse-REST-API-Key': keys['X-Parse-REST-API-Key'],
          'Content-Type': file.type
        }
      }).then(function(resp) {
        callback(resp.data.url);
      });
    });
  };
}