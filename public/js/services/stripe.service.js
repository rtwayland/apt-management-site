angular.module('app')
    .service('StripeService', function($http) {
        this.payApplicationFee = function(tokenId) {
          console.log('Token ID from Service\n', tokenId);
            return $http.post('/application-fee-charge', tokenId);
        }
    });
