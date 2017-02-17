angular.module('app')
    .controller('CreateProperty', function($scope, AmazonS3Service) {
        $scope.submitProperty = function() {
            console.log('Property', $scope.property);
            AmazonS3Service.uploadPhotos($scope.property.photos);
        }
    });
