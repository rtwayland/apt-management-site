angular.module('app')
    .service('AmazonS3Service', function($http, $q) {
        // this.convertImages = function(propertyName, files) {
        //
        //         var loop = function() {
        //             var defer = $q.defer();
        //             var photoArray = [];
        //             for (var i = 0; i < files.length; i++) {
        //                 var reader = new FileReader();
        //
        //                 reader.onload = function(loadEvent) {
        //                     var imageData = loadEvent.target.result;
        //                     var imageExtension = imageData.split(';')[0].split('/')
        //                     imageExtension = imageExtension[imageExtension.length - 1];
        //                     var newImage = {
        //                         imageName: propertyName,
        //                         imageBody: imageData,
        //                         imageExtension: imageExtension
        //                     }
        //
        //                     photoArray.push(newImage);
        //                 };
        //
        //                 reader.readAsDataURL(files[i]);
        //                 defer.resolve(photoArray);
        //             }
        //
        //             return defer.promise;
        //         }
        //         loop().then(function(res) {
        //           console.log('Res from Service\n', res);
        //         }, function(err) {
        //           console.log('Err from Service', err);
        //         });
        //     },
            this.uploadPhotos = function(photos) {
                console.log('From Service', angular.toJson(photos));
                return $http.post('/api/upload-photos', photos);
            }
    });
