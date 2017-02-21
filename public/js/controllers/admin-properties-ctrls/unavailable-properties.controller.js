angular.module('app')
    .controller('UnavailableProperties', function($scope, PropertyService) {
        function getUnavailableProperties() {
            PropertyService.getUnavailableProperties()
                .then(function(res) {
                    $scope.unavailableProperties = res;
                }, function(err) {
                    console.log(err);
                });
        }

        $scope.makeAvailable = function(property) {
            PropertyService.updateStatus(property._id, 'available')
                .then(function(res) {
                    // Remove from available section
                    removeById(property._id);
                }, function(err) {
                    console.log(err);
                });
        }

        function removeById(id) {
            for (var i = 0; i < $scope.unavailableProperties.length; i++) {
                if ($scope.unavailableProperties[i]._id === id) {
                    $scope.unavailableProperties.splice(i, 1);
                    break;
                }
            }
        }

        getUnavailableProperties()
    });
