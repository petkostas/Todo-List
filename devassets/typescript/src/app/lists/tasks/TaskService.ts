module app.lists.tasks {
    'use strict';

    export class TaskService {

        static $inject = [
            'urlService',
            '$q',
            '$http'
        ];

        constructor(
            private urlService: app.common.UrlService,
            private $q: ng.IQService,
            private $http: ng.IHttpService
            )
        {
        }


        getTasks(list_id: number) {
            return this.$http.get(
                this.urlService.parseUrl('lists.get', {'pk': list_id})
            );
        }

        addNewTask(task: app.lists.tasks.TaskItem) {
            return this.$http.post(
                this.urlService.parseUrl('tasks.create'),
                task
            );
        }

        toggleTask(task_id: number, status: boolean): ng.IPromise<any> {
            return this.$http.patch(
                this.urlService.parseUrl('tasks.update', { 'pk': task_id }),
                { 'id': task_id, 'flag_done': status }
            );
        }

        updateTask(task: app.lists.tasks.TaskItem): ng.IPromise<any> {
            return this.$http.patch(
                this.urlService.parseUrl('tasks.update', {'pk': task.id }),
                task
            );
        }
    }
}
