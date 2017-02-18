angular.module('app')
    .controller('CreateProperty', function($scope, AmazonS3Service) {
        $scope.submitProperty = function() {
            if ($scope.property.photos) {
                $scope.property.photos = preparePhotos($scope.property.name, $scope.property.photos);
            }
            if ($scope.property.amenities) {
                $scope.property.amenities = prepareAmenities($scope.property.amenities);
            }

            console.log('Property after cleanse\n', $scope.property);
            // AmazonS3Service.convertImages($scope.property.name, $scope.property.photos)
            //     .then(function(res) {
            //         console.log(res);
            //     }, function(err) {
            //         console.log(err);
            //     })
            // AmazonS3Service.uploadPhotos($scope.property.photos);
        }
        $scope.fillFields = function() {
            $scope.property = {
                name: 'Belle Monet',
                rent: 1500,
                deposit: 1000,
                description: 'This is a great place. You\'ll love it!',
                address: {
                    street: '123 S 456 E',
                    city: 'Provo',
                    zip: '12345'
                },
                beds: 3,
                baths: 2
            };
        }

        function preparePhotos(name, photos) {
            var propertyName = name.replace(' ', '');
            for (var i = 0; i < photos.length; i++) {
                photos[i].imageName = propertyName + i;
            }
            return photos
        }

        function prepareAmenities(amenities) {
            var newArray = [];
            for (var key in amenities) {
                newArray.push(amenities[key]);
            }
            return newArray;
        }
    });
