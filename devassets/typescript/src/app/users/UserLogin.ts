module app.users {
    'use strict';

    export interface LoginUser {
        id: number;
        username: string;
        email?: string;
    }

    export class UserLogin {

        user = <app.users.LoginUser>{};

        static $inject = [
            'userService'
        ];

        constructor(
            private userService: app.users.UserService
        ) {}

        login() {
            this.userService.logUser(this.user);
        }
    }
}
