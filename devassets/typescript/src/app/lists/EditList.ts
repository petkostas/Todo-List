module app.lists {
    'use strict';

    export class EditList {

        list: app.lists.ListItem;
        edititem: app.lists.ListItem;

        onSave: (param: {list: app.lists.ListItem}) => any;
        onCancel: () => any;

        constructor() {
            this.edititem = _.cloneDeep(this.list);
        }

        save(): void {
            this.onSave({
                list: {
                    id: this.edititem.id,
                    title: this.edititem.title,
                    description: this.edititem.description,
                    status: this.edititem.status
                }
            });
        }

        cancel(): void {
            this.onCancel();
        }

        static directive(): ng.IDirective {
            return {
                restrict: 'E',
                templateUrl: 'lists/EditList.tpl.html',
                replace: true,
                controller: EditList,
                controllerAs: 'editlist',
                bindToController: true,
                scope: {
                    list: '=',
                    onSave: '&',
                    onCancel: '&'
                }
            };
        }
    }
}
