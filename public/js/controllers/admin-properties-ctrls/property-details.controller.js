angular.module('app')
    .controller('PropertyDetails', function($scope, $state, PropertyService, AmazonS3Service) {
        $scope.numAddAmenities = 0;

        /******************** GET PROPERTY ********************/
        function init() {
            PropertyService.getPropertyById($state.params.id)
                .then(function(res) {
                    let tempProperty = res;
                    tempProperty.rent *= 1;
                    tempProperty.deposit *= 1;
                    tempProperty.beds *= 1;
                    tempProperty.baths *= 1;
                    tempProperty.year *= 1;
                    tempProperty.sqfeet *= 1;
                    tempProperty.acres *= 1;
                    $scope.property = tempProperty;
                    $scope.property.evenMoreAmenities = [];
                }, function(err) {
                    console.log(err);
                });
        }

        /******************** UPDATE PROPERTY ********************/
        $scope.submit = function() {
            var combined = $scope.property.addedAmenities.concat($scope.property.evenMoreAmenities);
            $scope.property.addedAmenities = combined;
            if ($scope.addedPhotos) {
                AmazonS3Service.uploadPhotos($scope.property.name, $scope.addedPhotos)
                    .then(function(res) {
                        let newlyAddedPhotos = res;
                        var combined = $scope.property.photos.concat(newlyAddedPhotos);
                        $scope.property.photos = combined;
                        updateProperty($scope.property._id, $scope.property);
                    }, function(err) {
                        console.log(err);
                    });
            } else {
                updateProperty($scope.property._id, $scope.property);
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
        // Init function
        init();
    });
