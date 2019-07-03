angular.module('app')

.controller('DashboardCtrl', ['$scope', '$timeout',
	function($scope, $timeout) {
		$scope.gridsterOptions = {
			margins: [20, 20],
			columns: 3,
			maxRows:2,
			isMobile: true, // stacks the grid items if true
    			//mobileBreakPoint: 600, // if the screen is not wider that this, remove the grid layout and stack the items
    			//mobileModeEnabled: true, // whether or not to toggle mobile mode when screen width is less than mobileBreakPoint
			draggable: {
				handle: 'h3'
			}
		};

		$scope.dashboards = {
			'1': {
				id: '1',
				name: 'Home',
				content: "Text 1",
				widgets: [{
					col: 0,
					row: 0,
					sizeY: 1,
					sizeX: 1,
					name: "Widget 1"
				}, {
					col: 2,
					row: 1,
					sizeY: 1,
					sizeX: 1,
					name: "Widget 2"
				}]
			},
			'2': {
				id: '2',
				name: 'Other',
				widgets: [{
					col: 1,
					row: 1,
					sizeY: 1,
					sizeX: 2,
					name: "Other Widget 1"
				}, {
					col: 1,
					row: 3,
					sizeY: 1,
					sizeX: 1,
					name: "Other Widget 2"
				}]
			},

		};

		$scope.clear = function() {
			$scope.dashboard.widgets = [];
		};

		$scope.addWidget = function() {
			$scope.dashboard.widgets.push({
				name: "New Widget",
				sizeX: 1,
				sizeY: 1
			});
		};

		$scope.addWidget1 = function() {
			$scope.dashboard.widgets.push({
				name: "Add the Image",
				content: "Text 1",
				sizeX: 1,
				sizeY: 2
			});
		};

		$scope.addWidget2 = function() {
			$scope.dashboard.widgets.push({
				name: "Add the Video",
				sizeX: 2,
				sizeY: 1,
				template: '<iframe width="100" height="315" src="https://www.youtube.com/embed/YzpDddFEb2Y" frameborder="0" allowfullscreen></iframe>'
			});
		};

		$scope.addWidget3 = function() {
			$scope.dashboard.widgets.push({
				name: "Write something",
				sizeX: 1,
				sizeY: 1,
				template: ' <div text-angular="text-angular" name="htmlcontent" ng-model="htmlcontent" ta-disabled="disabled"></div>'
			});
		};

		$scope.$watch('selectedDashboardId', function(newVal, oldVal) {
			if (newVal !== oldVal) {
				$scope.dashboard = $scope.dashboards[newVal];
			} else {
				$scope.dashboard = $scope.dashboards[1];
			}
		});

		// init dashboard
		$scope.selectedDashboardId = '1';

	}
])

.controller('CustomWidgetCtrl', ['$scope', '$modal',
	function($scope, $modal) {

		$scope.remove = function(widget) {
			$scope.dashboard.widgets.splice($scope.dashboard.widgets.indexOf(widget), 1);
		};

		$scope.openSettings = function(widget) {
			$modal.open({
				scope: $scope,
				templateUrl: 'app/widget_settings.html',
				controller: 'WidgetSettingsCtrl',
				resolve: {
					widget: function() {
						return widget;
					}
				}
			});
		};

	}
])

.controller('WidgetSettingsCtrl', ['$scope', '$timeout', '$rootScope', '$modalInstance', 'widget',
	function($scope, $timeout, $rootScope, $modalInstance, widget) {
		$scope.widget = widget;

		$scope.form = {
			name: widget.name,
			sizeX: widget.sizeX,
			sizeY: widget.sizeY,
			col: widget.col,
			row: widget.row
		};

		$scope.sizeOptions = [{
			id: '1',
			name: '1'
		}, {
			id: '2',
			name: '2'
		}, {
			id: '3',
			name: '3'
		}, {
			id: '4',
			name: '4'
		}];

		$scope.dismiss = function() {
			$modalInstance.dismiss();
		};

		$scope.remove = function() {
			$scope.dashboard.widgets.splice($scope.dashboard.widgets.indexOf(widget), 1);
			$modalInstance.close();
		};

		$scope.submit = function() {
			angular.extend(widget, $scope.form);

			$modalInstance.close(widget);
		};

	}
])

// helper code
.filter('object2Array', function() {
	return function(input) {
		var out = [];
		for (i in input) {
			out.push(input[i]);
		}
		return out;
	}
})
    .directive('nsWidget', ['$compile', function($compile) {
        return {
            restrict: 'AE',
            scope: {
                widget: '='
            },
            link: function(scope, element, attrs) {
                var build = function (html) {
                    element.empty().append($compile(html)(scope));
                };
                scope.$watch('widget.template', function (newValue, oldValue){
                    if (newValue) {
                        build(newValue);
                    }
                });
            }
        };
    }])

    
    
    .filter('unsafe', function($sce) {
	    return function(val) {
	        return $sce.trustAsHtml(val);
	    };
	});

    
