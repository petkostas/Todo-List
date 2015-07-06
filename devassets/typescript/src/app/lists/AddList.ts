module app.lists {
    'use strict';

    export class AddList {

        showform: boolean = false;
        list = <app.lists.ListItem>{};
        lists: app.lists.ListItem[];

        static $inject = [
            'listsService'
        ];

        constructor(
            private listsService: app.lists.ListsService
        ){
        }

        private _reset() {
            this.list = <app.lists.ListItem>{};
        }

        toggleForm() {
            this.showform = !this.showform;
        }

        addList() {
            this.listsService.addNewList(this.list).then((results: any) => {
                this.lists.push(_.clone(results.data));
            });
            this._reset();
        }

        cancelList() {
            this._reset();
            this.showform = false;
        }

        static directive(): ng.IDirective {
            return {
                restrict: 'E',
                controller: AddList,
                controllerAs: 'addlistcntrl',
                bindToController: true,
                templateUrl: 'lists/AddList.tpl.html',
                replace: true,
                scope: {
                    lists: '='
                },
                link: AddList.link
            };
        }

        private static link(
            scope: ng.IScope, element: ng.IAugmentedJQuery,
            attrs: ng.IAttributes, controllers: any)
        {

        }
    }
}
