angular.module('app')
    .service('UserService', function($http, PropertyService) {
        this.getUserById = function(id) {
                return $http.get('/api/user?id=' + id)
                    .then(function(res) {
                        return res.data;
                    });
            },
            this.createUser = function(application) {
                return PropertyService.getPropertyById(application.propertyId)
                    .then(function(res) {
                        console.log('Res from propserv', res);

                        function getDueDate() {
                            let now = new Date();
                            if (now.getMonth() == 11) {
                                return new Date(now.getFullYear() + 1, 0, 1);
                            } else {
                                return new Date(now.getFullYear(), now.getMonth() + 1, 1);
                            }
                        }

                        let userObj = {
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
                            userStatus: 'active',
                            rentPaid: false,
                            rentDueDate: getDueDate(),
                            rentAmount: res.rent * 1,
                            loginid: ''
                        };

                        return $http.post('/api/user', userObj)
                            .then(function(res) {
                                return res.data;
                            }, function(err) {
                                console.log(err);
                            });

                    }, function(err) {
                        console.log(err);
                    })
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
                return $http.get('/api/user?status=active')
                    .then(function(res) {
                        return res.data;
                    }, function(err) {
                        console.log(err);
                        return err;
                    })
            },
            this.updateUser = function(id, user) {
                return $http.put('/api/user/' + id, user);
            },
            this.payRent = function(id, payment) {
                return $http.put('/api/user/payment/' + id, payment)
                    .then(function(res) {
                        return res.data;
                    }, function(err) {
                        console.log(err);
                    })
            }
    });
