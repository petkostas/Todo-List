module app.lists.tasks {
    'use strict';

    export class EditTask {

        task: app.lists.tasks.TaskItem;
        edititem: app.lists.tasks.TaskItem;
        onSave: (param: {task: app.lists.tasks.TaskItem}) => any;
        onCancel: () => any;

        constructor(
            private taskService: app.lists.tasks.TaskService
        ){
            this.edititem = _.cloneDeep(this.task);
        }

        save():void {
            this.onSave({
                task: {
                    id: this.edititem.id,
                    title: this.edititem.title,
                    description: this.edititem.description,
                    flag_done: this.edititem.flag_done
                }
            });
        }

        cancel(): void {
            this.onCancel();
        }

        static directive(): ng.IDirective {
            return {
                restrict: 'E',
                templateUrl: 'lists/tasks/EditTask.tpl.html',
                replace: true,
                controller: EditTask,
                controllerAs: 'edittask',
                bindToController: true,
                scope: {
                    task: '=',
                    onSave: '&',
                    onCancel: '&'
                }
            };
        }
    }
}
