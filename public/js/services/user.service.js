angular.module('app')
    .service('UserService', function($http) {
        this.getUserById = function(id) {
                return $http.get('/api/user?id=' + id)
                    .then(function(res) {
                        return res.data;
                    });
            },
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
                    propertyName: application.propertyName,
                    propertyid: application.propertyId,
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
            },
            this.createAdmin = function(admin) {
                return $http.post('/api/user', admin)
                    .then(function(res) {
                        return res.data;
                    }, function(err) {
                        console.log(err);
                    });
            },
            this.getUsers = function() {
                return $http.get('/api/user')
                    .then(function(res) {
                        return res.data;
                    }, function(err) {
                        console.log(err);
                        return err;
                    })
            },
            this.updateUser = function(id, user) {
                // user = angular.toJson(user);
                return $http.put('/api/user/' + id, user);
            }
    });
