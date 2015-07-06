module app.lists.tasks {
	'use strict';

	export interface TaskItem {
		id: number;
		title: string;
		description: string;
		flag_done: boolean;
		tasklist?: number;
	}

	export class TaskItems {

		tasks: app.lists.tasks.TaskItem[];

		static $inject = [
			'taskService'
		];

		constructor(
			private taskService: app.lists.tasks.TaskService
		) {
		}

		toggleTask(task: app.lists.tasks.TaskItem) {
			task.flag_done = !task.flag_done;
			this.taskService.toggleTask(task.id, task.flag_done);
		}

		static directive(): ng.IDirective {
			return {
				restrict: 'E',
				templateUrl: 'lists/tasks/TaskItems.tpl.html',
				replace: true,
				controller: TaskItems,
				controllerAs: 'taskitems',
				bindToController: true,
				scope: {
					tasks: '='
				}
			};
		}
	}
}