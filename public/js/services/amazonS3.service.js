angular.module('app')
    .service('AmazonS3Service', function($http, $q) {
        this.uploadPhotos = function(propertyName, photos) {
            photos = preparePhotos(propertyName, photos);
            photos = angular.toJson(photos);
            return $http.post('/api/upload-photos', photos)
                .then(function(res) {
                    console.log(res);
                    return res.data;
                }, function(err) {
                    console.log(err);
                    return err;
                });

            /******************** PREPARE PHOTOS ********************/
            function preparePhotos(name, photos) {
                var propertyName = name.replace(' ', '');
                for (var i = 0; i < photos.length; i++) {
                    photos[i].imageName = propertyName + i;
                }
                return photos;
            }
        }
    });
