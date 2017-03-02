angular.module('app')
    .directive('creditCardModal', function() {
        return {
            restrict: 'E',
            templateUrl: './js/directives/credit-card-modal/credit-card-modal.html',
            scope: {
                model: '=',
                payRent: '&',
                chargeAmount: '='
            },
            link: function(scope, elem, attrs) {

            },
            controller: function($scope) {
                $scope.$watch('chargeAmount', function() {
                    $scope.fee = ($scope.chargeAmount * 0.029) + 0.3;
                    $scope.totalCharge = $scope.fee + $scope.chargeAmount;
                });

                $scope.validateNumber = function(value) {
                    if (value) {
                        if (Stripe.card.validateCardNumber(value)) {
                            $scope.numberError = false;
                            $scope.cardInfoForm.number.$setValidity("number", true);
                            $scope.cardType = Stripe.card.cardType(value);
                        } else {
                            $scope.numberError = true;
                            $scope.cardInfoForm.number.$setValidity("number", false);
                        }
                    }
                }
                $scope.validateExpiry = function(month, year) {
                    if (month && year) {
                        let exp = month + ' ' + year;
                        if (Stripe.card.validateExpiry(exp)) {
                            $scope.expiryError = false;
                            $scope.cardInfoForm.month.$setValidity("month", true);
                        } else {
                            $scope.expiryError = true;
                            $scope.cardInfoForm.month.$setValidity("month", false);
                        }
                    }
                }
                $scope.validateCVC = function(value) {
                    if (value) {
                        if (Stripe.card.validateCVC(value)) {
                            $scope.cvcError = false;
                            $scope.cardInfoForm.cvc.$setValidity("cvc", true);
                        } else {
                            $scope.cvcError = true;
                            $scope.cardInfoForm.cvc.$setValidity("cvc", false);
                        }
                    }
                }
            }
        };
    });
