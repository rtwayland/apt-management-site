angular.module('app')
    .controller('PropertyGallery', function($scope, PropertyService) {
        function getAvailableProperties() {
            PropertyService.getAvailableProperties()
                .then(function(res) {
                    $scope.properties = res;
                    console.log(res);
                }, function(err) {
                    console.log(err);
                });
        }


        getAvailableProperties()
    });
