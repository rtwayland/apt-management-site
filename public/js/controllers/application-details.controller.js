angular.module('app')
    .controller('ApplicationDetails', function($scope, ApplicationService, $state) {
      function getApplication() {
            ApplicationService.getApplicationById($state.params.id)
                .then(function(res) {
                  console.log('From Ctrl\n', res);
                  $scope.application = res;
                }, function(err) {
                    console.log(err);
                });
        }
        getApplication();
    });
