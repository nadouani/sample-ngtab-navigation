'use strict';

angular.module('tabnavApp')
    .controller('TabController', function ($scope, $state, TabsState) {
        TabsState.activateTab($state.current.data.tab);
    })
    .controller('IssueController', function ($scope, $state, $stateParams, TabsState) {
        $scope.tabs = TabsState.geTabs();

        $scope.openTab = function (tabName) {
            var tab = TabsState.getTab(tabName);
            var params = _.extend({}, $state.params);
            params = _.extend(params, tab.params || {});

            $state.go(tab.state, params);
        };

        $scope.removeTab = function (tab) {
            TabsState.removeTab(tab);

            $scope.goTo('details');
        };
    })
    .controller('TasksListController', function ($scope, $state, TasksRepo, TabsState) {
        TabsState.activateTab($state.current.data.tab);

        $scope.tasks = TasksRepo.getTasks();
    })
    .controller('TasksItemController', function($scope, $state, $stateParams, TasksRepo, TabsState) {
        var taskId = $stateParams.item;
        var taskName = 'task-' + taskId;
        var task = TasksRepo.getTask(taskId);

        TabsState.addTab(taskName, {
            name: taskName,
            label: task.name,
            closable: true,
            state: 'issue.task-item',
            params: {
                item: task.id
            }
        });

        TabsState.activateTab(taskName);

        $scope.task = task;
    });
