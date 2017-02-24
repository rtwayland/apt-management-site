angular.module('app')
    .service('UserService', function($http) {
        this.createUser = function(application) {
            let userObj = angular.toJson({
                firstName: application.user.firstName,
                middleName: application.user.middleName,
                lastName: application.user.lastName,
                birthdate: application.user.birthdate,
                email: application.user.email,
                phone: application.user.phone,
                relations: application.user.relations,
                emergency: application.emergency,
                propertyid: '1',
                applicationid: application._id,
                userStatus: 'new',
                loginid: ''
            });

            return $http.post('/api/user', userObj)
                .then(function(res) {
                    return res.data;
                }, function(err) {
                    console.log(err);
                });
        }
    });
