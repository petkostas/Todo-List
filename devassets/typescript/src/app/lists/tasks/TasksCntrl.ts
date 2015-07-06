module app.lists.tasks {
    'use strict';


    export class TasksCntrl {

        listId: number;
        tasks: app.lists.tasks.TaskItem[] = [];

        static $inject = [
            '$stateParams',
            'taskService'
        ];

        constructor(
            private $stateParams: ng.ui.IStateParamsService,
            private taskService: app.lists.tasks.TaskService
        ) {
            this.listId = parseInt(
                _.get(this.$stateParams, 'listID').toString());
            this.taskService.getTasks(this.listId).then( (results: any) => {
                this.tasks = results.data;
            })
        }
    }
}
