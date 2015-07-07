module app.lists {
    'use strict';

    export class AddList {

        showform: boolean = false;
        list: app.lists.ListItem = {
            id: 0,
            title: null,
            description: null,
            status: true
        };
        onAdd: (param:{list: app.lists.ListItem}) => any;
        onCancel: () => any;

        constructor(){}

        private _reset() {
            this.list = <app.lists.ListItem>{};
        }

        add(): void {
            this.onAdd({list: this.list});
        }

        cancel(): void {
            this.onCancel();
        }

        static directive(): ng.IDirective {
            return {
                restrict: 'E',
                controller: AddList,
                controllerAs: 'listcntrl',
                bindToController: true,
                templateUrl: 'lists/AddList.tpl.html',
                replace: true,
                scope: {
                    lists: '=',
                    onAdd: '&',
                    onCancel: '&'
                }
            };
        }
    }
}
