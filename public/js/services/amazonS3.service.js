angular.module('app')
    .service('AmazonS3Service', function($http, $q) {
        this.uploadPhotos = function(photos) {
            photos = angular.toJson(photos);
            return $http.post('/api/upload-photos', photos)
                .then(function(res) {
                    console.log(res);
                }, function(err) {
                    console.log(err);
                });
        }
    });
