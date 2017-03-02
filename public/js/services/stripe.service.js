angular.module('app')
    .service('StripeService', function($http) {
        this.chargeCard = function(source, amount, email) {
                let obj = {
                    stripeSource: source,
                    amount: amount,
                    email: email
                }
                return $http.post('/rent-charge-card', obj);
            },
            this.chargeBank = function(token, amount, email) {
                let obj = {
                    stripeToken: token,
                    amount: amount,
                    email: email
                }
                return $http.post('/rent-charge-bank', obj);
            }
    });
