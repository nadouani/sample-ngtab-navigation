'use strict';

/**
 * @ngdoc overview
 * @name tabnavApp
 * @description
 * # tabnavApp
 *
 * Main module of the application.
 */
angular
    .module('tabnavApp', [
        'ngSanitize',
        'ui.router',
        'ui.bootstrap'
    ]);

angular.module('tabnavApp')
    .factory('TasksRepo', function () {
        var tasks = [{
            id: 1,
            name: 'Task 1'
        }, {
            id: 2,
            name: 'Task 2'
        }, {
            id: 3,
            name: 'Task 3'
        }, ];

        return {
            getTasks: function () {
                return tasks;
            },

            getTask: function (id) {
                return _.find(tasks, function (task) {
                    return task.id == id;
                });
            }
        };
    })
    .factory('TabsState', function () {
        var tabs = {
            'details': {
                name: 'details',
                active: true,
                label: 'Details',
                state: 'issue.details'
            },
            'tasks': {
                name: 'tasks',
                active: false,
                label: 'Tasks',
                state: 'issue.tasks'
            },
            'files': {
                name: 'files',
                active: false,
                label: 'Files',
                state: 'issue.files'
            }
        };

        return {
            geTabs: function () {
                return tabs;
            },

            getTab: function (name) {
                return tabs[name];
            },

            activateTab: function (tab) {
                angular.forEach(tabs, function (tab) {
                    tab.active = false;
                });

                if (tabs[tab]) {
                    tabs[tab].active = true;
                } else {
                    tabs.details.active = true;
                }
            },

            addTab: function (tab, options) {
                options.closable = true;

                tabs[tab] = options;
            },

            removeTab: function (tab) {
                delete tabs[tab];
                tabs.details.active = true;
            }
        };
    })
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/issue-list');

        $stateProvider
            .state('issue-list', {
                url: '/issue',
                templateUrl: 'views/issues.html'
            })
            .state('issue', {
                url: '/issue/{id}',
                templateUrl: 'views/issue.html',
                abstract: true,
                controller: 'IssueController'
            })
            .state('issue.details', {
                url: '/details',
                templateUrl: 'views/issue.details.html',
                data: {
                    tab: 'details'
                },
                controller: 'TabController'
            })
            .state('issue.tasks', {
                url: '/tasks',
                templateUrl: 'views/issue.tasks.html',
                data: {
                    tab: 'tasks'
                },
                controller: 'TasksListController'
            })
            .state('issue.task-item', {
                url: '/tasks/{item}',
                templateUrl: 'views/issue.tasks.item.html',
                controller: 'TasksItemController'
            })
            .state('issue.files', {
                url: '/files',
                templateUrl: 'views/issue.files.html',
                data: {
                    tab: 'files'
                },
                controller: 'TabController'
            })
            .state('issue.file-item', {
                url: '/files/{item}',
                templateUrl: 'views/issue.files.item.html'
            });

    }]);
