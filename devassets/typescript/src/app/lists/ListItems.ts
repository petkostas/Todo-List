module app.lists {
    'use strict';

    export interface ListItem {
        id: number;
        title: string;
        description: string;
        status: boolean;
    }

    export class ListItems {

        lists: app.lists.ListItem[] = [];

        static $inject = [
            'listsService'
        ];

        constructor(
            private listsService: app.lists.ListsService
        ) {
        }

        toggleList(list: app.lists.ListItem) {
            list.status = !list.status;
            this.listsService.toggleList(list.id, list.status).then((results) => {

            });
        }

        static directive(): ng.IDirective {
            return {
                restrict: 'E',
                replace: true,
                templateUrl: 'lists/ListItems.tpl.html',
                controller: ListItems,
                controllerAs: 'listitems',
                bindToController: true,
                scope: {
                    lists: '='
                },
                link: ListItems.link
            }
        }

        private static link(
            scope: ng.IScope, element: ng.IAugmentedJQuery,
            attrs: ng.IAttributes, controller: ListItems)
        {
        }
    }
}
