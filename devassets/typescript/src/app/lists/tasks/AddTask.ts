module app.lists {
    'use strict';

    export class AddTask {

        showform: boolean = false;
        task = <app.lists.TaskItem>{};
        tasks: app.lists.tasks.TaskItem[];

        static $inject = [
            'taskService'
        ];

        constructor(
            private taskService: app.lists.ListsService
        ){
        }

        private _reset() {
            this.task = <app.lists.TaskItem>{};
        }

        toggleForm() {
            this.showform = !this.showform;
        }

        addList() {
            this.taskService.addNewTask(this.task).then((results: any) => {
                this.tasks.push(_.clone(results.data));
            });
            this._reset();
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
                    tasks: '='
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
