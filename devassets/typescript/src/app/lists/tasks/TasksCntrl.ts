module app.lists.tasks {
    'use strict';


    export class TasksCntrl {

        private _listId: number;

        static $inject = [
            '$stateParams',
            'taskService'
        ];

        constructor(
            private $stateParams: ng.ui.IStateParamsService,
            private taskService: app.lists.tasks.TaskService
        ) {
            this._listId = parseInt(
                _.get(this.$stateParams, 'listID').toString());
        }

        get tasks() {
            if( !this._listId ) {
                return null;
            } else {
                return this.taskService.getTasks(this._listId);
            }
        }
    }
}
