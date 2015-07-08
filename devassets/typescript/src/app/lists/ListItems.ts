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

        adding: boolean;
        editing: boolean;
        edititem: app.lists.ListItem;

        static $inject = [
            'listsService'
        ];

        constructor(
            private listsService: app.lists.ListsService
        ) {
        }

        get listcount() {
            var lists: any = _.cloneDeep(this.lists);
            return _.remove(lists, function(list){
                list.status = false;
            }).length;
        }

        toggle(list: app.lists.ListItem) {
            this.listsService.toggleList(list.id, !list.status).then( (results) => {
                list.status = results.data.status;
            });
        }

        addList() {
            this.adding = true;
        }

        addNewList(list: app.lists.ListItem) {
            this.listsService.addNewList(list).then( (results) => {
                this.lists.push(_.cloneDeep(list));
            });
            this.adding = false;
        }

        modifyList(list: app.lists.ListItem) {
            this.editing = true;
            this.edititem = list;
        }

        save(list: app.lists.ListItem) {
            this.listsService.updateList(list.id, list).then( (results) => {
                this.edititem.id = list.id;
                this.edititem.title = list.title;
                this.edititem.description = list.description;
                this.edititem.status = list.status;
            });
            this.editing = false;
        }

        cancel(): void {
            this.editing = false;
            this.adding = false;
            if( this.edititem ) {
                this.edititem = null;
            }
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
            var $tooltip_items = angular.element(
                document.getElementsByClassName('list-actions')
            );
            console.log($tooltip_items);
            _.forEach($tooltip_items, ($tooltip_item) => {
                if( angular.element($tooltip_item).data('toggle') ) {
                    var mytooltip: any = angular.element($tooltip_item);
                    mytooltip.tooltip();
                }
            });
        }
    }
}
