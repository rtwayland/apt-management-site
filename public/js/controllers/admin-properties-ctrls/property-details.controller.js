angular.module('app')
    .controller('PropertyDetails', function($scope, $state, PropertyService, AmazonS3Service, property) {
        $scope.numAddAmenities = 0;
        $scope.property = property;

        /******************** UPDATE PROPERTY ********************/
        $scope.submit = function() {
            let combined = $scope.property.addedAmenities.concat($scope.property.evenMoreAmenities);
            $scope.property.addedAmenities = combined;
            if ($scope.newMainPhoto) {
                AmazonS3Service.uploadPhotos($scope.property.name, $scope.newMainPhoto)
                    .then(function(res) {
                        $scope.property.mainPhoto = res[0];
                        if ($scope.addedPhotos) {
                            AmazonS3Service.uploadPhotos($scope.property.name, $scope.addedPhotos)
                                .then(function(res) {
                                    let newlyAddedPhotos = res;
                                    let combined = $scope.property.photos.concat(newlyAddedPhotos);
                                    $scope.property.photos = combined;
                                    let temp = [];
                                    temp.push($scope.property.mainPhoto);
                                    temp = temp.concat($scope.property.photos);
                                    $scope.property.allPhotos = temp;
                                    updateProperty($scope.property._id, $scope.property);
                                }, function(err) {
                                    console.log(err);
                                });
                        } else {
                            let temp = [];
                            temp.push($scope.property.mainPhoto);
                            temp = temp.concat($scope.property.photos);
                            $scope.property.allPhotos = temp;
                            updateProperty($scope.property._id, $scope.property);
                        }
                    }, function(err) {
                        console.log(err);
                    })
            } else {
                if ($scope.addedPhotos) {
                    AmazonS3Service.uploadPhotos($scope.property.name, $scope.addedPhotos)
                        .then(function(res) {
                            let newlyAddedPhotos = res;
                            let combined = $scope.property.photos.concat(newlyAddedPhotos);
                            $scope.property.photos = combined;
                            var temp = [];
                            temp.push($scope.property.mainPhoto);
                            temp = temp.concat($scope.property.photos);
                            $scope.property.allPhotos = temp;
                            updateProperty($scope.property._id, $scope.property);
                        }, function(err) {
                            console.log(err);
                        });
                } else {
                    updateProperty($scope.property._id, $scope.property);
                }
            }
        }

        /******************** DELETE PROPERTY ********************/
        $scope.deleteProperty = function() {
            if (confirm('Are you sure you want to DELETE this property?')) {
                PropertyService.deleteProperty($scope.property._id)
                    .then(function(res) {
                        $state.go('properties');
                    }, function(err) {
                        console.log(err);
                    });
            }
        }
        /******************** DELETE IMAGE ********************/
        $scope.deleteImage = function(photo) {
            if (confirm('Are you sure you want to DELETE this photo?')) {
                for (var i = 0; i < $scope.property.photos.length; i++) {
                    if ($scope.property.photos[i] === photo) {
                        $scope.property.photos.splice(i, 1);
                        break;
                    }
                }
            }
        }
        /******************** ADD and DELETE AMENITIES ********************/
        $scope.addAmenity = function() {
            $scope.property.evenMoreAmenities.push({
                label: '',
                value: true
            });
            ++$scope.numAddAmenities;
        }
        $scope.deleteAmenity = function(item) {
            for (var i = 0; i < $scope.property.evenMoreAmenities.length; i++) {
                if ($scope.property.evenMoreAmenities[i] === item) {
                    $scope.property.evenMoreAmenities.splice(i, 1);
                    break;
                }
            }
            --$scope.numAddAmenities;
        }

        function updateProperty(id, property) {
            PropertyService.updateProperty(id, property)
                .then(function(res) {
                    console.log('Response from Update\n', res);
                    $state.go('properties');
                }, function(err) {
                    console.log(err);
                });
        }
    });
