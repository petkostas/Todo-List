module app.lists.tasks {
    'use strict';


    export class TasksCntrl {

        listId: number;
        tasks: app.lists.tasks.TaskItem[] = [];

        static $inject = [
            'userService',
            '$stateParams',
            'taskService'
        ];

        constructor(
            private userService: app.users.UserService,
            private $stateParams: ng.ui.IStateParamsService,
            private taskService: app.lists.tasks.TaskService
        ) {
            this.userService.checkIfLogged();
            this.listId = parseInt(
                _.get(this.$stateParams, 'listID').toString());
            this.taskService.getTasks(this.listId).then( (results: any) => {
                this.tasks = results.data;
            })
        }
    }
}
