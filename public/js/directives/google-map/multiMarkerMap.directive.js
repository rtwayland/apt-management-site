angular.module('app')
    .directive('multiMarkerMap', function() {
        return {
            restrict: 'E',
            templateUrl: './js/directives/google-map/multi-marker-map.html',
            scope: {
                name: '=',
                zoom: '=',
                addresses: '='
            },
            link: function(scope, elem, attrs) {
                scope.name = scope.name.replace(/ /g, '');

                function initMap() {
                    var map = new google.maps.Map(document.getElementById(scope.name), {
                        zoom: scope.zoom,
                        center: {
                            lat: 111.8910,
                            lng: 40.7608
                        },
                        mapTypeControlOptions: {
                            style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
                            mapTypeIds: ['roadmap', 'terrain']
                        },
                        scrollwheel: false,
                        gestureHandling: 'cooperative',
                        fullscreenControl: true
                    });
                    var geocoder = new google.maps.Geocoder();
                    for (var i = 0; i < scope.addresses.length; i++) {
                        geocodeAddress(geocoder, map, scope.addresses[i]);
                    }
                }

                function geocodeAddress(geocoder, resultsMap, address) {
                    geocoder.geocode({
                        'address': address
                    }, function(results, status) {
                        if (status === 'OK') {
                            resultsMap.setCenter(results[0].geometry.location);
                            var marker = new google.maps.Marker({
                                map: resultsMap,
                                position: results[0].geometry.location
                            });
                        } else {
                            alert('Geocode was not successful for the following reason: ' + status);
                        }
                    });
                }

                setTimeout(function() {
                    initMap();
                }, 0);
            }
        };
    });
