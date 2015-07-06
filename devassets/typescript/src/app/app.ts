module app {
    'use strict';

    angular.module('app', [
        'ui.router',
        'ngCookies',
        'app.templates',
        'app.common',
        'app.users',
        'app.lists'
    ])
        .constant('toDoUrls', {
            'lists': {
                'getall': '/rest/lists/',
                'create': '/rest/lists/create/',
                'destroy': '/rest/lists/destroy/<%= pk %>/',
                'update': '/rest/lists/update/<%= pk %>/',
                'get': '/rest/lists/view/<%= pk %>/'
            },
            'tasks': {
                'create': '/rest/lists/tasks/create/',
            },
            'user': {
                'login': '/rest/users/login/',
                'register': '/rest/users/create/',
                'logout': '/rest/users/logout/'
            }
        })
        .config(['$urlRouterProvider', '$stateProvider', routes])
        .config(['$httpProvider', function($httpProvider: ng.IHttpProvider) {
                $httpProvider.defaults.xsrfCookieName = 'csrftoken';
                $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
            }
        ])
    ;

    function routes(
        $urlRouterProvider: ng.ui.IUrlRouterProvider,
        $stateProvider: ng.ui.IStateProvider
    ) {
        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state(
                'home', {
                    url: '/',
                    templateUrl: 'lists/lists.tpl.html',
                    controller: 'listCntrl',
                    controllerAs: 'listcntrl'
                }
            )
            .state(
                'viewlist',{
                    url: '/lists/view/:listID',
                    templateUrl: 'lists/tasks/tasks.tpl.html',
                    controller: app.lists.tasks.TasksCntrl,
                    controllerAs: 'taskscntrl'
                }
            )
            .state(
                'login',{
                    url: '/users/login/',
                    templateUrl: 'users/UserLogin.tpl.html',
                    controller: app.users.UserLogin,
                    controllerAs: 'logincntrl'
            })
            .state(
                'register',{
                    url: '/users/register/',
                    templateUrl: 'users/UserRegister.tpl.html',
                    controller: app.users.UserRegister,
                    controllerAs: 'registercntrl'
            })
        ;
    }
}
