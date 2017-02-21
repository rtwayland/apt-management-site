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
        getUnavailableProperties()
    });
