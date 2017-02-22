angular.module('app')
    .controller('CreateProperty', function($scope, $state, PropertyService, AmazonS3Service) {
        //Predefined amenities array
        var amenitiesArray = [
            [{
                    label: 'Central Air Conditioning',
                    value: false
                },
                {
                    label: 'Dishwasher',
                    value: false
                },
                {
                    label: 'Washer / Dryer Hookups',
                    value: false
                },
                {
                    label: 'Microwave',
                    value: false
                }
            ],
            [{
                    label: 'Playground / Park',
                    value: false
                },
                {
                    label: 'Storage',
                    value: false
                },
                {
                    label: 'Covered Parking',
                    value: false
                },
                {
                    label: 'Internet',
                    value: false
                }
            ],
            [{
                    label: 'Cable',
                    value: false
                },
                {
                    label: 'Outdoor Pool',
                    value: false
                },
                {
                    label: 'Landscaping Maintenance',
                    value: false
                },
                {
                    label: 'Snow Removal',
                    value: false
                }
            ],
            [{
                    label: 'Fitness Center',
                    value: false
                },
                {
                    label: 'Water',
                    value: false
                },
                {
                    label: 'Sewage',
                    value: false
                },
                {
                    label: 'Garbage',
                    value: false
                }
            ]
        ];

        // Initialize Scope values
        $scope.property = {
            amenities: amenitiesArray,
            addedAmenities: []
        };
        $scope.numAddAmenities = 0;

        /******************** SUBMIT PROPERTY ********************/
        $scope.submitProperty = function() {
            // cleanseData($scope.property.name, $scope.property.photos);
            // If we have photos to upload, run AmazonS3Service
            console.log('The Property\n', $scope.property);
            if ($scope.property.photos) {
                AmazonS3Service.uploadPhotos($scope.property.name, $scope.property.photos)
                    .then(function(res) {
                        // Replace the current photos with the response array
                        var photoLinksArray = res;
                        $scope.property.photos = photoLinksArray;
                        // Upload the new property to the DB
                        createProperty($scope.property);
                    }, function(err) {
                        console.log(err);
                    });
            } else {
                // No photos to upload.
                // Simply upload the property to the DB
                createProperty($scope.property);
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
                baths: 2,
                amenities: amenitiesArray,
                addedAmenities: []
            };
        }

        /******************** ADD and DELETE AMENITIES ********************/
        $scope.addAmenity = function() {
            $scope.property.addedAmenities.push({
                label: '',
                value: true
            });
            ++$scope.numAddAmenities;
        }
        $scope.deleteAmenity = function(item) {
            for (var i = 0; i < $scope.property.addedAmenities.length; i++) {
                if ($scope.property.addedAmenities[i] === item) {
                    $scope.property.addedAmenities.splice(i, 1);
                    break;
                }
            }
            --$scope.numAddAmenities;
        }

        /******************** CREATE PROPERTY ********************/
        function createProperty(property) {
            PropertyService.createProperty(property)
                .then(function(res) {
                    console.log('Property Created\n', res);
                }, function(err) {
                    console.log(err);
                });
        }
        // /******************** CLEANSE DATA ********************/
        // function cleanseData(name, photos) {
        //     if (photos) {
        //         $scope.property.photos = preparePhotos(name, photos);
        //     }
        //     // if (amenities) {
        //     //     $scope.property.amenities = prepareAmenities(amenities);
        //     // }
        // }

        // /******************** PREPARE PHOTOS ********************/
        // function preparePhotos(name, photos) {
        //     var propertyName = name.replace(' ', '');
        //     for (var i = 0; i < photos.length; i++) {
        //         photos[i].imageName = propertyName + i;
        //     }
        //     return photos;
        // }

        // /******************** PREPARE AMENITIES ********************/
        // function prepareAmenities(amenities) {
        //     let newArray = [];
        //     for (var key in amenities) {
        //         let newObj = {
        //             name: key,
        //             value: amenities[key]
        //         }
        //         if (amenities[key]) {
        //             newArray.push(newObj);
        //         }
        //     }
        //     return newArray;
        // }

    });
