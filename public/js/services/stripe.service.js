angular.module('app')
    .service('StripeService', function($http) {
        this.payApplicationFee = function(tokenId) {
                console.log('Token ID from Service\n', tokenId);
                var tokenObj = angular.toJson({
                    stripeToken: tokenId
                });
                return $http.post('/application-fee-charge', tokenObj);
            },
            this.payRent = function(public_token, account_id, rentAmount) {
                let plaidObj = {
                    public_token: public_token,
                    account_id: account_id,
                    amount: rentAmount
                }
                return $http.post('/rent-charge', plaidObj);
            },
            this.chargeBank = function(token, amount) {
                let obj = {
                    stripeToken: token,
                    amount: amount
                }
                return $http.post('/rent-charge', obj);
            }
    });
