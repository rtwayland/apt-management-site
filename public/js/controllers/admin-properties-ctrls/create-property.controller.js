angular.module('app')
    .controller('CreateProperty', function($scope, PropertyService, AmazonS3Service) {
        $scope.submitProperty = function() {
            cleanseData($scope.property.name, $scope.property.photos, $scope.property.amenities);
            console.log('Property after cleanse\n', $scope.property);
            AmazonS3Service.uploadPhotos($scope.property.photos)
                .then(function(res) {
                    console.log(res);
                    var photoLinksArray = angular.fromJson(res);
                    $scope.property.photos = photoLinksArray;
                    PropertyService.createProperty($scope.property)
                        .then(function(res) {
                            console.log(res);
                        }, function(err) {
                            console.log(err);
                        })
                }, function(err) {
                    console.log(err);
                });
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

        function cleanseData(name, photos, amenities) {
            if (photos) {
                $scope.property.photos = preparePhotos(name, photos);
            }
            if (amenities) {
                $scope.property.amenities = prepareAmenities(amenities);
            }
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
