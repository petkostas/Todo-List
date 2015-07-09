module app.users {
    'use strict';

    export class UserLogout {

        static $inject = [
            'userService'
        ];

        constructor(
            private userService: app.users.UserService
        ) {
        }

        logout() {
            this.userService.logout();
        }

        static directive(): ng.IDirective {
            return {
                restrict: 'E',
                templateUrl: 'users/UserLogout.tpl.html',
                replace: true,
                controller: UserLogout,
                controllerAs: 'logout',
                bindToController: true
            };
        }
    }
}
