angular.module('app')
    .service('AmazonS3Service', function($http, $q) {
        this.uploadPhotos = function(photos) {
            // var photoLinksArray = [];
            // var defer = $q.defer();
            console.log('Photos in Service', photos);
            photos = angular.toJson(photos);
            return $http.post('/api/upload-photos', photos)
                .then(function(res) {
                    console.log(res);
                }, function(err) {
                    console.log(err);
                });
            // for (var i = 0; i < photos.length; i++) {
            //   var singlePhoto = angular.toJson(photos[i]);
            //   $http.post('/api/upload-photos', singlePhoto)
            //   .then(function(res) {
            //       console.log(res);
            //       photoLinksArray.push('res');
            //   }, function(err) {
            //       console.log(err);
            //   })
            // }
            //
            // defer.resolve(photoLinksArray);
            // return defer.promise;
            // photos = angular.toJson(photos[0]);
            // console.log('From Service', photos);
            // return $http.post('/api/upload-photos', photos);
        }
    });
