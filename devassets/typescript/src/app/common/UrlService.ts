module app.common {
    'use strict';


    export class UrlService {

        static $inject = [
            'toDoUrls'
        ];

        constructor(
            private toDoUrls: ng.IModule
        ) {}

        parseUrl(path: string, template_vars = {}) {
            if (template_vars) {
                var templateurl = _.template(
                    _.get(this.toDoUrls, path).toString());
                return templateurl(template_vars);
            } else {
                return _.get(this.toDoUrls, path).toString();
            }
        }
    }
}
