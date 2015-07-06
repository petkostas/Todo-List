module app.users {

    export interface RegisterUser {
        username: string;
        password: string;
        confirm_password: string;
    }

    export class UserRegister {

        user = <RegisterUser>{};
        error_message: string = '';

        static $inject = [
            'userService',
            '$location'
        ];
        constructor(
            private userService: app.users.UserService,
            private $location: ng.ILocationService
        ) {}

        private _reset() {
            this.user = <app.users.RegisterUser>{};
        }

        register() {
            var password: string = _.get(
                this.user, 'password').toString();
            var confirm_password: string = _.get(
                this.user, 'confirm_password').toString();
            if ( password != confirm_password ) {
                this._reset();
                return false;
            }
            this.userService.registerUser(this.user).success((data) => {
                this.$location.path('/');
            }).error(() => {
                this.error_message = 'Could not register, please try again'
            });
        }
    }
}
