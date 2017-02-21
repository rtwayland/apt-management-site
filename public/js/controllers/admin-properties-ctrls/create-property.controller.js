angular.module('app')
    .controller('CreateProperty', function($scope, $state, PropertyService, AmazonS3Service) {
        /******************** SUBMIT PROPERTY ********************/
        $scope.submitProperty = function() {
            cleanseData($scope.property.name, $scope.property.photos, $scope.property.amenities);
            // If we have photos to upload, run AmazonS3Service
            if ($scope.property.photos) {
                AmazonS3Service.uploadPhotos($scope.property.photos)
                    .then(function(res) {
                        // Replace the current photos with the response array
                        var photoLinksArray = angular.fromJson(res);
                        $scope.property.photos = photoLinksArray;
                        // Upload the new property to the DB
                        PropertyService.createProperty($scope.property)
                            .then(function(res) {
                                console.log('Property Created\n', res);
                                $state.go('properties');
                            }, function(err) {
                                console.log(err);
                            });
                    }, function(err) {
                        console.log(err);
                    });
            } else {
                // No photos to upload.
                // Simply upload the property to the DB
                PropertyService.createProperty($scope.property)
                    .then(function(res) {
                        console.log('Property Created\n', res);
                    }, function(err) {
                        console.log(err);
                    });
            }
        }

        /******************** DEV FUNC fill fields ********************/
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

        /******************** CLEANSE DATA ********************/
        function cleanseData(name, photos, amenities) {
            if (photos) {
                $scope.property.photos = preparePhotos(name, photos);
            }
            if (amenities) {
                $scope.property.amenities = prepareAmenities(amenities);
            }
        }

        /******************** PREPARE PHOTOS ********************/
        function preparePhotos(name, photos) {
            var propertyName = name.replace(' ', '');
            for (var i = 0; i < photos.length; i++) {
                photos[i].imageName = propertyName + i;
            }
            return photos
        }

        /******************** PREPARE AMENITIES ********************/
        function prepareAmenities(amenities) {
            var newArray = [];
            for (var key in amenities) {
                if (amenities[key]) {
                    newArray.push(amenities[key]);
                }
            }
            return newArray;
        }
    });
