module app.lists {
    'use strict';

    export class AddTask {

        task: app.lists.tasks.TaskItem = {
            id: 0,
            title: null,
            description: null,
            flag_done: false,
            tasklist: null
        };
        listid: number;
        onAdd: (param: {task: app.lists.tasks.TaskItem}) => any;
        onCancel: () => any;

        constructor(){
            this.task.tasklist = this.listid;
        }

        add(): void {
            this.onAdd({task: this.task});
        }

        cancel(): void {
            this.onCancel();
        }

        static directive(): ng.IDirective {
            return {
                restrict: 'E',
                controller: AddTask,
                controllerAs: 'addtask',
                bindToController: true,
                templateUrl: 'lists/tasks/AddTask.tpl.html',
                replace: true,
                scope: {
                    onAdd: '&',
                    onCancel: '&',
                    listid: '@listId'
                }
            };
        }
    }
}
