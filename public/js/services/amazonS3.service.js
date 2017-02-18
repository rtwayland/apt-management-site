angular.module('app')
    .service('AmazonS3Service', function($http, $q) {
        this.uploadPhotos = function(photos) {
            photos = angular.toJson(photos);
            console.log('From Service', photos);
            return $http.post('/api/upload-photos', photos);
        }
    });
