angular.module('app')
    .controller('PropertyDetails', function($scope, $state, PropertyService) {
      function getProperty() {
            PropertyService.getPropertyById($state.params.id)
                .then(function(res) {
                  $scope.property = res;
                }, function(err) {
                    console.log(err);
                });
        }
        getProperty();
    });
