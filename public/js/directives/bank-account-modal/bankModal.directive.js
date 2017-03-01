angular.module('app')
    .directive('bankModal', function() {
        return {
            restrict: 'E',
            templateUrl: './js/directives/bank-account-modal/bank-modal.html',
            scope: {
                model: '=',
                payRent: '&'
            },
            link: function(scope, elem, attrs) {

            },
            controller: function($scope) {
                $scope.validateRouting = function(value) {
                    if (Stripe.bankAccount.validateRoutingNumber(value, 'US')) {
                        $scope.routingError = false;
                        $scope.bankInfoForm.routing.$setValidity("routing", true);
                    } else {
                        $scope.routingError = true;
                        $scope.bankInfoForm.routing.$setValidity("routing", false);
                    }
                }
                $scope.validateAccount = function(value) {
                    if (Stripe.bankAccount.validateAccountNumber(value, 'US')) {
                        $scope.accountError = false;
                        $scope.bankInfoForm.account.$setValidity("account", true);
                    } else {
                        $scope.accountError = true;
                        $scope.bankInfoForm.account.$setValidity("account", false);
                    }
                }
            }
        };
    });
