module app.users {
    'use strict';

    angular.module('app.users', [])
        .service('userService', UserService)
        .directive('userLogout', UserLogout.directive)
    ;
}
