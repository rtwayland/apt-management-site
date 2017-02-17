angular.module('app')
    .service('StripeService', function($http) {
        this.payApplicationFee = function(tokenId) {
            console.log('Token ID from Service\n', tokenId);
            var tokenObj = angular.toJson({
                stripeToken: tokenId
            });
            return $http.post('/application-fee-charge', tokenObj);
        }
    });
