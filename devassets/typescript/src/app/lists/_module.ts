module app.lists {
    'use strict';

    angular.module('app.lists', [
        'app.lists.tasks'
    ])
        .service('listsService', ListsService)
        .controller('listCntrl', ListCntrl)
        .directive('listItems', ListItems.directive)
        .directive('addList', AddList.directive)
        .directive('editList', EditList.directive)
    ;
}
