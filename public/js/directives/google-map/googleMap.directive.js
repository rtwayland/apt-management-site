angular.module('app')
    .directive('googleMap', function($rootScope) {
        return {
            restrict: 'E',
            templateUrl: './js/directives/google-map/google-map.html',
            scope: {
                propId: '=',
                name: '=',
                zoom: '=',
                street: '=',
                city: '=',
                state: '=',
                zip: '='
            },
            link: function(scope, elem, attrs) {
                scope.name = scope.name.replace(/ /g, '');

                function initMap() {
                    var map = new google.maps.Map(document.getElementById(scope.name), {
                        zoom: scope.zoom,
                        center: {
                            lat: -34.397,
                            lng: 150.644
                        },
                        mapTypeControlOptions: {
                            style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
                            mapTypeIds: ['roadmap', 'terrain']
                        },
                        scrollwheel: false,
                        gestureHandling: 'cooperative',
                        fullscreenControl: true
                    });

                    if ($rootScope.showModal === scope.propId) {
                        var geocoder = new google.maps.Geocoder();
                        geocodeAddress(geocoder, map);
                    }
                }

                function geocodeAddress(geocoder, resultsMap) {
                    var address = scope.street + ', ' + scope.city + ', ' + scope.state + ' '
                    scope.zip;
                    geocoder.geocode({
                        'address': address
                    }, function(results, status) {
                        if (status === 'OK') {
                            resultsMap.setCenter(results[0].geometry.location);
                            var marker = new google.maps.Marker({
                                map: resultsMap,
                                position: results[0].geometry.location
                            });
                        } else if (status === google.maps.GeocoderStatus.OVER_QUERY_LIMIT) {
                            setTimeout(function() {
                                Geocode(address);
                            }, 200);
                        } else {
                            alert('Geocode was not successful for the following reason: ' + status);
                        }
                    });
                }
                $rootScope.$watch('showModal', function() {
                    setTimeout(function() {
                        initMap();
                    }, 0);
                });

            }
        };
    });
