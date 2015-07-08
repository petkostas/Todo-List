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
		task: app.lists.tasks.TaskItem;
		editing: boolean;
		adding: boolean;
		edititem: app.lists.tasks.TaskItem;
		listid: number;

		static $inject = [
			'taskService'
		];

		constructor(
			private taskService: app.lists.tasks.TaskService
		) {
		}

        get taskcount() {
            var tasks: any = _.cloneDeep(this.tasks);
            return _.remove(tasks, function(task: app.lists.tasks.TaskItem){
                return task.flag_done == false;
            }).length;
        }

		toggleTask(task: app.lists.tasks.TaskItem) {
			task.flag_done = !task.flag_done;
			this.taskService.toggleTask(task.id, task.flag_done);
		}

		addTask() {
			this.adding = true;
		}

		addNewTask(task: app.lists.tasks.TaskItem) {
            task.tasklist = this.listid;
            this.taskService.addNewTask(task).then( (results) => {
            	this.tasks.push(_.cloneDeep(task));
            });
            this.adding = false;
        }

		modifyTask(task: app.lists.tasks.TaskItem) {
			this.editing = true;
			this.edititem = task;
		}

		save(task: app.lists.tasks.TaskItem) {
			this.taskService.updateTask(task).then( (results) =>{
				this.edititem.id = task.id;
				this.edititem.title = task.title;
				this.edititem.description = task.description;
				this.edititem.flag_done = task.flag_done;
			});
			this.editing = false;
		}

		cancel() {
			this.adding = false;
			this.editing = false;
			if ( this.edititem ) {
				this.edititem = null;
			}
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
					tasks: '=',
					listid: '@'
				},
				link: TaskItems.link
			};
		}

		private static link(
			scope: ng.IScope, element: ng.IAugmentedJQuery,
			attrs: ng.IAttributes, controller: TaskItems
		){
			var myscope: any = scope;
			myscope.filterTasks = () => {
				var $marked_done = angular.element(
					document.getElementsByClassName('marked-done')
				);
				_.forEach($marked_done, (elem: any) => {
					angular.element(elem).toggleClass('hidden');
				});
			};
		}
	}
}
