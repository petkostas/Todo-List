module app.lists {
    'use strict';

    export class AddTask {

        showform: boolean = false;
        task = <app.lists.tasks.TaskItem>{};
        tasks: app.lists.tasks.TaskItem[];
        tasklistId: number;

        static $inject = [
            'taskService'
        ];

        constructor(
            private taskService: app.lists.tasks.TaskService
        ){
        }

        private _reset() {
            this.task = <app.lists.tasks.TaskItem>{};
        }

        toggleForm() {
            this.showform = !this.showform;
        }

        addList() {
            this.task.tasklist = this.tasklistId;
            this.task.flag_done = false;
            this.taskService.addNewTask(this.task).then((results: any) => {
                this.tasks.push(_.clone(results.data));
            });
            this._reset();
        }

        cancelTask() {
            this._reset();
            this.showform = false;
        }

        static directive(): ng.IDirective {
            return {
                restrict: 'E',
                controller: AddTask,
                controllerAs: 'addtaskcntrl',
                bindToController: true,
                templateUrl: 'lists/tasks/AddTask.tpl.html',
                replace: true,
                scope: {
                    tasks: '=',
                    tasklistId: '@listId'
                },
                link: AddTask.link
            };
        }

        private static link(
            scope: ng.IScope, element: ng.IAugmentedJQuery,
            attrs: ng.IAttributes, controller: AddTask)
        {

        }
    }
}
