module app.lists {
    'use strict';

    export class ListsService {

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

        getLists(): ng.IPromise<any> {
            return this.$http.get(
                this.urlService.parseUrl('lists.getall')
            );
        }

        addNewList(list: app.lists.ListItem): ng.IPromise<any> {
            return this.$http.post(
                this.urlService.parseUrl('lists.create'),
                list
            );
        }

        updateList(list_id: number, list: app.lists.ListItem): ng.IPromise<any> {
            return this.$http.patch(
                this.urlService.parseUrl('lists.update', {'pk': list_id}),
                list
            )
        }

        toggleList(list_id: number, status: boolean): ng.IPromise<any> {
            return this.$http.patch(
                this.urlService.parseUrl('lists.update', {'pk': list_id}),
                { 'id': list_id, 'status': status }
            );
        }
    }
}
