module app.lists {
    'use strict';

    export class ListCntrl {

        lists: app.lists.ListItem[] = [];

        static $inject = [
            'userService',
            'listsService',
            '$location'
        ];

        constructor(
            private userService: app.users.UserService,
            private listsService: app.lists.ListsService,
            private $location: ng.ILocationService
        ) {
            this.userService.checkIfLogged();
            this.listsService.getLists().then( (data) => {
                this.lists = data.data;
            });
        }
    }
}
