angular.module('app')
    .service('AmazonS3Service', function($http, $q) {
        this.uploadPhotos = function(photos) {
            let defer = $q.defer();
            photos = angular.toJson(photos);
            $http.post('/api/upload-photos', photos)
                .then(function(res) {
                    console.log(res);
                    defer.resolve(res.data);
                }, function(err) {
                    console.log(err);
                });
            return defer.promise;
        }
    });
