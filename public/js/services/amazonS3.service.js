angular.module('app')
    .service('AmazonS3Service', function($http) {
        this.uploadPhotos = function(photos) {
            console.log('From Service', angular.toJson(photos));
            return $http.post('/api/upload-photos', photos);
        }
    });
