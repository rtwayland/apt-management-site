angular.module('app')
    .controller('AvailableProperties', function($scope, PropertyService) {
        function getAvailableProperties() {
            PropertyService.getAvailableProperties()
                .then(function(res) {
                    $scope.availableProperties = res;
                }, function(err) {
                    console.log(err);
                });
        }

        $scope.makeUnavailable = function(property) {
            PropertyService.updateStatus(property._id, 'unavailable')
                .then(function(res) {
                    // Remove from available section
                    removeById(property._id);
                }, function(err) {
                    console.log(err);
                });
        }

        function removeById(id) {
            for (var i = 0; i < $scope.availableProperties.length; i++) {
                if ($scope.availableProperties[i]._id === id) {
                    $scope.availableProperties.splice(i, 1);
                    break;
                }
            }
        }
        getAvailableProperties()
    });
