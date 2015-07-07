module app.lists.tasks {
    'use strict';

    angular.module('app.lists.tasks', [])
        .service('taskService', TaskService)
        .directive('taskItems', TaskItems.directive)
        .directive('addTask', AddTask.directive)
        .directive('editTask', EditTask.directive)
    ;
}
