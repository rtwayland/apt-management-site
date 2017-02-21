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
        getAvailableProperties()
    });
