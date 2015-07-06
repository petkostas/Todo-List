module app.users {
    'use strict';

    export interface User {
        id: number;
        username: string;
        email?: string;
    }

    export class UserService {

        private _hasLogged: boolean = false;

        static $inject = [
            'urlService',
            '$http',
            '$cookies',
            '$location'
        ];

        constructor(
            private urlService: app.common.UrlService,
            private $http: ng.IHttpService,
            private $cookies: ng.cookies.ICookiesService,
            private $location: ng.ILocationService
        ) {
            this._loadInitial();
        }

        private _loadInitial() {
            if( this.User ) {
                this._hasLogged = true;
            }
        }

        get User(): any {
            if (!this.$cookies.get('userAccount')) {
                return;
            }
            return this.$cookies.getObject('userAccount');
        }

        set User(data: any) {
            this.$cookies.putObject('userAccount', data);
        }

        private resetUser() {
            this.$cookies.remove('userAccount');
        }

        logUser(user: app.users.LoginUser) {
            this.login(user).then( (result: any) => {
                this.User = result.data;
                this._hasLogged = true;
                this.$location.path('/');
            })
        }

        hasLogged(): boolean {
            return this._hasLogged;
        }

        login(user: app.users.LoginUser) {
            return this.$http.post(
                this.urlService.parseUrl('user.login'),
                user
            );
        }

        logout() {
            return this.$http.post(
                this.urlService.parseUrl('user.logout'),
                {}
            );
            this.resetUser();
        }

        checkIfLogged() {
            if( this.hasLogged() == false ) {
                this.$location.path('/users/login/');
            }
        }

        registerUser(user = {}) {
            return this.$http.post(
                this.urlService.parseUrl('user.register'),
                user
            )
        }
    }
}
