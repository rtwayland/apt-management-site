angular.module('app')
    .directive('s3file', function() {
        return {
            restrict: 'A',
            scope: {
                files: '='
            },
            link: function(scope, el, attrs) {
                el.bind('change', function(event) {
                    var photoArray = [];
                    var files = event.target.files;

                    for (var i = 0; i < files.length; i++) {
                        var reader = new FileReader();

                        reader.onload = function(loadEvent) {
                                var imageData = loadEvent.target.result;
                                var imageExtension = imageData.split(';')[0].split('/')
                                imageExtension = imageExtension[imageExtension.length - 1];
                                // var fileName = files[i].name;
                                var newImage = {
                                    imageName: 'fileName',
                                    imageBody: imageData,
                                    imageExtension: imageExtension
                                }

                                photoArray.push(newImage);
                                scope.files = photoArray;
                                scope.$parent.files = photoArray;
                                scope.$apply();
                        };

                        reader.readAsDataURL(files[i]);
                    }
                });
            }
        };
    });
