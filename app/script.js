angular.module('app')
.controller('DashboardCtrl', ['$scope', '$timeout', '$modal',
	function($scope, $timeout, $modal) {

		$scope.widgets = [
			{ type: 'image' ,data:''},
			{ type: 'video', data:'' },
			{ type: 'text', data:'' },
			{ type: 'slider', data:[]},
			{ type: 'custom', data:''},
			{ type: 'separator'},
			{ type: 'sample', data:''}//this is a sample widget
		];

		for (var i = 0; i < $scope.widgets.length; i++) {
			var b = $scope.widgets[i];
			// if(i==5)
			// {
			// 	$scope.widgets[i] = {
			// 	sizeX: b.sizeX | 6,
			// 	sizeY: b.sizeY | 3,
			// 	type: b.type,
			// 	resizable: true,
			// 	}
			// }
			// else
			// {
				$scope.widgets[i] = {
				sizeX: b.sizeX | 6,
				sizeY: b.sizeY | 3,
				type: b.type,
				data: b.data,
				}
			// }
		}

		var moveEvent;
    		$(document).mousemove(function (e) {
        		moveEvent = e;
    		});


		$("#inner").contents().find("#draggable").draggable({
    			iframeFix: true
		});



    		//$("#draggable").draggable();
    		/*$('iframe', '#draggable').load(function () {
        			$('iframe', '#draggable')[0].contentWindow.$('#inner').mousedown(function (e) {
            		$('#draggable').draggable().data('draggable')._mouseDown(e);
            		return false;
        			});
    		});*/

		$scope.State="drag";

		var clicked = 0;
		var dropped = 0;
		var dragged = 0;

		$scope.dash = 1;
		$scope.gridsterOptions = {
			margins: [0, 0],
			outerMargin: true,
			maxColumns: 3,
			rowHeight: '15',
			swapping: true,
			pushing: true,
			floating: true,
			draggable: {
				enabled: true,
				//handle: '.overlay_fix', // optional selector for drag handle
				start: function(event, $element, widget) {
       					clicked = 0;
       					dropped = 0;
       					console.log(clicked);
       				},
       				stop: function(event,$element,widget){
       				 setTimeout(function(){clicked = 1;}, 1000);

       				 setTimeout(function(){dragged = 0;},1000);
       				 },
       				drag: function(event, $element, widget) {
       					dragged = 1;
       				}, // optional callback fired when item is moved,
       			},
			resizable: {
				enabled: true,
				handles: ['n', 'e', 's', 'w', 'se', 'sw'],
				start: function(event, $element, widget) {

				}, // optional callback fired when resize is started,
       				resize: function(event, $element, widget) {

       				}, // optional callback fired when item is resized,
       				stop: function(event, $element, widget) {
       					console.log($element.children()[0].scrollHeight);
       					console.log(widget.sizeY);
       					var contentHeight = $element.children()[0].scrollHeight;
       					var rowHeightOption = Math.floor(15); // 1 sizeY = 5 px here
       					var height = contentHeight / rowHeightOption;
       					console.log(height);
       					if(height > widget.sizeY)
       					{
       						var div = Math.floor(height) + 1;
                    					widget.sizeY = div;
       					}

       				} // optional callback fired when item is finished resizing
			},
			mobileBreakPoint: 200
		};




		$scope.dashboards = {
			'1': {
				id: '1',
				name: 'Home',
				content: "Text 1",
				widgets: [{	name: "Add the Image",
						type: 'image',
						content: "Text 1",
						sizeX: 6,
						sizeY: 3,
						resizable: true,
						data: 'http://i.imgur.com/sLsNU91.png',
					}]
			},


		};

		$scope.cssList = [
			{id:'skeleton', url:'https://cdnjs.cloudflare.com/ajax/libs/skeleton/2.0.4/skeleton.min.css'},
			{id:'normalize', url:'https://cdnjs.cloudflare.com/ajax/libs/normalize/4.1.1/normalize.min.css'}
		];

		$scope.jsList = {};
		$('.overlay_fix').draggable({
			start: function () {
        			$("iframe").css('z-index', '-1');
    			},
    			stop: function () {
        			$("iframe").css('z-index', '0');
    			}
		});


		$scope.clear = function() {
			$scope.dashboard.widgets = [];
		};

		$scope.pushWidget = function(widget){
			$scope.dashboard.widgets.push(angular.copy(widget));
		}
		$scope.addWidget = function() {
			$scope.pushWidget({
				name: "New Widget",
				type: 'widget',
				sizeX: 6,
				sizeY: 3
			});
		};

		$scope.overlay_fix_start = function() {
    			$('.overlay_fix').show();
		}

		$scope.overlay_fix_stop = function() {
    			$('.overlay_fix').hide();
		};

		//$("#video-container").draggable({ iframeFix: true });

		$scope.beforeDrop = function(event,ui) {

			var widget = $scope.widgets[1];

    			var modalInstance = $modal.open({
    				scope: $scope,
    				templateUrl: 'app/templates/'+widget.type+'/settings.html',
      				controller: 'WidgetSettingsCtrl',
      				resolve: {
					widget: function() {
						return widget;
					}
				}

    			});

    			modalInstance.result.then(function (widget) {
        				$scope.dashboard.widgets.push(widget);
      				defer.reject();
    				}, function () {
      					defer.reject();
    				});
    				return defer.promise;
  		};



  		$scope.addWidget1 = function() {

				var widget ={
				name: "Add the Image",
				type: 'image',
				content: "Text 1",
				sizeX: 6,
				sizeY: 3,
				template: ''
			};
			$scope.openModal(widget);
			$scope.pushWidget(widget);
		};

		$scope.addWidget2 = function() {
			var widget = {
				name: "Add the Video",
				type: 'video',
				sizeX: 6,
				sizeY: 3,
				template: ''
			};
			$scope.openModal(widget);
			$scope.pushWidget(widget);
		};

		$scope.addWidget3 = function() {
			var widget = {
				name: "Write something",
				type: 'text',
				sizeX: 6,
				sizeY: 3,
				data: ''
			};
			$scope.openModal(widget);
			$scope.pushWidget(widget);

		};

		/*$scope.$on('finishLoad',function(){
   			$scope.swiper.update();
		});*/
		$scope.swiper = {};
		$scope.swiperActive = false;

		$scope.next = function() {
                		$scope.swiper.slideNext();
            	};

            	$scope.previous = function() {
                		$scope.swiper.slidePrev();
            	};

		$scope.onReadySwiper = function(swiper,widget){
        			swiper.initObservers();
        			swiper.on('onInit', function() {
      				$scope.swiperActive = true;
   			});
        			swiper.on('slideChangeStart', function () {
        				var activeSlide = swiper.slides[swiper.activeIndex];
        				console.log(swiper.activeIndex);
        				console.log($scope.dashboard.widgets.data);


        				/*if($scope.State=="video"){
        					var contentHeight = $(activeSlide).find('iframe')[0].height;
        					var newHeight = 150;
        					console.log(contentHeight);
        				 	$('.swiper-container').css('height', newHeight);
                   			 	$('.swiper-wrapper').css('height', newHeight);
                   			}
                   			else if($scope.State=="image"){
                   			 	var contentHeight1 = $(activeSlide).find('img')[0].height;
                   			 	console.log(contentHeight1);
                   			 	$('.swiper-container').css('height', contentHeight1);
                   				$('.swiper-wrapper').css('height', contentHeight1);
                   			}*/

                   			 //swiper.reInit();

        				//$('.swiper-container').height( $(activeSlide).find('iframe').height );




       			 console.log('slideChangeStart');
      			});
        			swiper.on('onSlideChangeEnd', function () {
        				console.log('cmon');
        			});
        			$scope.swiper = swiper;
        			$scope.swiper.slideTo(0); //show the slider from the beginning

   		};
		$scope.$watch('swiperActive', function(newVal, oldVal) {
			//$scope.swiper = swiper;
  			// Try one of the following in this order for performance
   			//$scope.swiper.resize(); // Less Overhead
   			//$scope.swiper.updateSlideSize(); // Some Overhead
   			$scope.update(); // Overhead
		}, true);

		/*$scope.myData=[1,2,3,4,5];
		$http.jsonp(myurl+'&callback=JSON_CALLBACK').success(function(data)
		{
   			$scope.myData=data; //e.g.: [6,7,8]
   			$timeout(function() //give the data a moment to propagate
   			{
     				$scope.swiper.updateSlidesSize(); //now run the sizing update - can also use just .update()
     				$scope.swiper.slideTo(0); //show the slider from the beginning
   			}, 300);
		});*/


		$scope.addWidget4 = function() {
			var widget = {
				type: 'slider',
				sizeX: 6,
				sizeY: 3,
				data:[],
			};
			$scope.openModal(widget);
			$scope.pushWidget(widget);
		};

		$scope.addWidget5 = function() {
			var widget = {
				name: "Add Custom Div",
				type: 'custom',
				sizeX: 6,
				sizeY: 3,
				data: ''
			};
			$scope.openModal(widget);
			$scope.pushWidget(widget);

		};

		$scope.addWidget6 = function() {
			var widget = {
				name: "Add Separator",
				type: 'separator',
				sizeX: 6,
				sizeY: 1,
				data: ''
			};
			$scope.pushWidget(widget);

		};

		$scope.compileOutput = function() {
		// 	$scope.gridsterOptions.draggable.enabled = false;
		// 	$scope.gridsterOptions.resizable.enabled = false;
			var doc = document.cloneNode(true);
			doc.head.innerHTML='';
			doc.body.innerHTML='<div class="container"></div>';
			doc.body.classList='';
			for(css in $scope.cssList){
			  var link = doc.createElement('link');
				link.id   = $scope.cssList[css].id;
				link.rel  = 'stylesheet';
				link.type = 'text/css';
				link.href = $scope.cssList[css].url;
				link.media = 'all';
				doc.head.appendChild(link);
			}
			for(js in $scope.jsList){
				var link = doc.createElement('script');
				link.id   = $scope.jsList[js].name;
				link.type = 'text/javascript';
				link.src = $scope.jsList[js].link;
				doc.head.appendChild(link);
			}
			var body = document.getElementsByClassName('ng-scope box');
			for(var child in body){
				if(typeof body[child] === 'object'){
					var div = doc.createElement('div');
					div.className = body[child].getAttribute("data");
					div.style.height = body[child].scrollHeight;
					console.log(body[child].children[0].children[0].children[1].children[0].innerHTML);
					div.innerHTML = body[child].children[0].children[0].children[1].children[0].innerHTML;
					doc.body.children[0].appendChild(div);
				}
			}

			var final = String(doc.body.parentNode.outerHTML)

			var temp = {
			name: "Output",
			type: 'output',
			sizeX: 1,
			sizeY: 1,
			template: final
			};
			$scope.openModal(temp);
			// $http.post("SomeURL", {"data":doc.body.parentNode.outerHTML})
			// .success(function(data, status, headers, config) {
			//     $scope.data = data;
			// }).error(function(data, status, headers, config) {
			//     $scope.status = status;
			// });
			//window.alert(doc.body.parentNode.outerHTML)
			// $scope.output = doc.body.parentNode.outerHTML;
			// window.alert($scope.output);
			// $modal.open({
			// 	scope: $scope,
			// 	templateUrl: 'app/output_settings.html',
			// 	controller: 'OutputCtrl',
			// 	resolve: {
			// 		widget: function() {
			// 			return widget;
			// 		}
			// 	}
			// });
		};
////////////////////////////////////////////////////Start////////////////////////////////////////////
		$scope.download = function(strData, strFileName, strMimeType) {
		   var D = document,
		 	   A = arguments,
		 	   a = D.createElement("a"),
		 	   d = A[0],
		 	   n = A[1],
		 	   t = A[2] || "text/plain";
		   //build download link:
		   a.href = "data:" + strMimeType + "charset=utf-8," + escape(strData);
		   if (window.MSBlobBuilder) { // IE10
			   var bb = new MSBlobBuilder();
			   bb.append(strData);
			   return navigator.msSaveBlob(bb, strFileName);
		   } /* end if(window.MSBlobBuilder) */
		   if ('download' in a) { //FF20, CH19
			   a.setAttribute("download", n);
			   a.innerHTML = "downloading...";
			   D.body.appendChild(a);
			   setTimeout(function() {
				   var e = D.createEvent("MouseEvents");
				   e.initMouseEvent("click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
				   a.dispatchEvent(e);
				   D.body.removeChild(a);
			   }, 66);
			   return true;
		   }; /* end if('download' in a) */
		   //do iframe dataURL download: (older W3)
		   var f = D.createElement("iframe");
		   D.body.appendChild(f);
		   f.src = "data:" + (A[2] ? A[2] : "application/octet-stream") + (window.btoa ? ";base64" : "") + "," + (window.btoa ? window.btoa : escape)(strData);
		   setTimeout(function() {
			   D.body.removeChild(f);
		   }, 333);
		   return true;
	   }
///////////////////////////////////////////End///////////////////////////////////////
		$scope.saveDashboardLayout = function saveDashboardLayout() {
			var widget = {
			name: "Save",
			type: 'save',
			files: [],
			current: ""
			};

			if (localStorage.getItem("files") === null) {
			}else {
				widget.files = JSON.parse(localStorage.getItem("files"));
			}
			widget.current = $scope.dashboard.widgets;
			$scope.openModal(widget);
    		};

    	$scope.remove = function(widget) {
			$scope.dashboard.widgets.splice($scope.dashboard.widgets.indexOf(widget), 1);
		};

		$scope.openSettings1 = function(widget) {
			//console.log(dragged);
			if(clicked == 0 && dragged == 0){
			console.log(widget);
			// widget.template = $interpolate('{{widget.template}}')($scope);
			$modal.open({
				scope: $scope,
				templateUrl: 'app/templates/'+widget.type+'/settings.html',
				controller: 'WidgetSettingsCtrl',
				resolve: {
					widget: function() {
						return widget;
					}
				}
			});
			}
		};

		$scope.OpenLayout = function OpenLayout(){
    		var widget = {	name: "Open",
				type: 'open',
				files: [],
				current: ""
			};
			if (localStorage.getItem("files") === null) {
			}else {
				widget.files = JSON.parse(localStorage.getItem("files"));
			}
			$scope.openModal(widget);
    		};


		$scope.$watch('selectedDashboardId', function(newVal, oldVal) {
			if (newVal !== oldVal) {
				$scope.dashboard = $scope.dashboards[newVal];
			} else {
				$scope.dashboard = $scope.dashboards[1];
			}
		});



		$scope.openModal = function(widget) {
			var modalInstance = $modal.open({
				scope: $scope,
				templateUrl: 'app/templates/'+widget.type+'/settings.html',
				controller: 'WidgetSettingsCtrl',
				resolve: {
					widget: function() {
						return widget;
					}
				}
			});
			modalInstance.result.then(function (widget) {
				if(widget.type == "open"){
					$scope.dashboard.widgets = widget.current;
				}
			}, function () {
				console.log('Modal dismissed at: ' + new Date());
			});

		};
		$scope.selectedDashboardId = '1';

	}
])

.controller('CustomWidgetCtrl', ['$scope', '$modal',
	function($scope, $modal) {
		$scope.remove = function(widget) {
			$scope.dashboard.widgets.splice($scope.dashboard.widgets.indexOf(widget), 1);
		};

		$scope.openSettings = function(widget) {
			console.log(widget);
			// widget.template = $interpolate('{{widget.template}}')($scope);
			$modal.open({
				scope: $scope,
				templateUrl: 'app/templates/'+widget.type+'/settings.html',
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
		console.info($scope.widget);

		$scope.form = {
			sizeX: widget.sizeX,
			sizeY: widget.sizeY,
			col: widget.col,
			row: widget.row,
			url: '',
			type1: '',
			data: widget.data
		};

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

		$scope.removeSlide1 = function(index){
  			$scope.form.data.splice(index, 1);
		};

		$scope.removeSlide2 = function(index){
  			$scope.widget.files.splice(index, 1);
  			localStorage.removeItem(index);
  			$scope.jsonToLocalStorage($scope.widget.files);
		};

		$scope.jsonToLocalStorage = function jsonToLocalStorage(todos) {
        			var jsonTodo = JSON.stringify(todos);

        			if (jsonTodo != 'null') {
            			localStorage.setItem("files", jsonTodo);
        			} else {
            			alert("Invalid JSON!");
        			}
    		};


		$scope.check = function(name){
   		     var radios = document.getElementsByName(name);

   		     for (var i = 0, len = radios.length; i < len; i++) {
   		          if (radios[i].checked) {
   		              return true;
   		          }
   		     }
   		     return false;
   	 	}


   		$scope.addSlide = function(){
   			if(($scope.check("choice"))&&($scope.form.url!='')){
   			$scope.form.data.push({url: $scope.form.url,type: $scope.form.type1});
   			$scope.form.url = '';
   			$scope.form.type1 = '';
   			}
			else if($scope.form.url=='')
			{
				window.alert("Fill in the URL.");
			}
			else if(!$scope.check("choice")){
   				window.alert("Choose the type of slide you want to add.");
   			}

   		};

		$scope.addFile= function(){
			$scope.widget.files.push({name:$scope.form.url, data:$scope.widget.current});
			localStorage.setItem("files", JSON.stringify($scope.widget.files));
			$scope.download(JSON.stringify($scope.widget.current), $scope.form.url+'.json', 'application/json');
			$modalInstance.close(widget);
			return;
		};

		$scope.loadFile= function(){
	        var reader = new FileReader();
	        reader.onload = function(event){
		        console.log(event.target.result);
		        $scope.widget.current = JSON.parse(event.target.result);
		        $modalInstance.close(widget)
      		}
	      console.log(document.getElementById('projectFile').files[0]);
	      reader.readAsText(document.getElementById('projectFile').files[0]);
		};

		$scope.orig = angular.copy($scope.form.data);

		$scope.reset = function() {
			$scope.form.data= angular.copy($scope.orig);
		};

		$scope.reset();
	}
])

// helper code
.directive('gridsterDynamicHeight',function($compile, $parse){
		return{
			restrict: 'AE',
			scope: {
               		 widget: "="
            		},
			link: function($scope, $element, $attrs){
				$scope.$watch(function(){
					//console.log($element.children()[0].scrollHeight);
					return $element.children()[0].scrollHeight;
				}, function(newVal, oldVal) {
					//console.log("Old val is : " + oldVal);
					//console.log("New val is : " + newVal);
					//console.log("SizeY is : " + $scope.widget.sizeY);
					var rowHeightOption = Math.floor(15); // 1 sizeY = 5 px here
					var height = newVal / rowHeightOption;
                				//console.log("Height is : " + height);
                				if(height > $scope.widget.sizeY){
                					var div = Math.floor(height) + 1;
                    					$scope.widget.sizeY = div;
                    					//console.log("Updated SizeY is : " + $scope.widget.sizeY);
                    					$scope.$apply();
                    					}
					});

				}
			};

	})

.directive('draggable', function() {
  return {
    restrict: 'A',
    link: function(scope, elm, attrs) {
      var options = scope.$eval(attrs.Draggable); //allow options to be passed in
      elm.draggable(options);
    }
  };
})
.filter('object2Array', function() {
	return function(input) {
		var out = [];
		for (i in input) {
			out.push(input[i]);
		}
		return out;
	}
})
    .directive('htmldiv', function($compile, $parse) {
	return {
	  restrict: 'E',
	  link: function(scope, element, attr) {
	    scope.$watch(attr.content, function() {
	      element.html($parse(attr.content)(scope));
	      $compile(element.contents())(scope);
	    }, true);
	  }
	}
	})
    .filter('unsafe', function($sce) {
	    return function(val) {
	        return $sce.trustAsHtml(val);
	    };
	})
	.filter('trustURL', function($sce) {
	    return function(val) {
	        return $sce.trustAsResourceUrl(val);
	    };
	})

     .filter("GetYouTubeID", function ($sce) {
	  return function (val) {
		var  id = val.split('v=')[1].split('&')[0];
		//console.log(id);
	 	return $sce.trustAsResourceUrl('http://www.youtube.com/embed/'+id+'?showinfo=0&autohide=1');
	  }
	})

     .config(function($sceDelegateProvider) {
   $sceDelegateProvider.resourceUrlWhitelist([
     'self',
     '*://www.youtube.com/**'
   ]);
 })
.filter('columns',function(){
	    var ones = Array("", "one", "two", "three", "four", "five", "six","seven", "eight", "nine", "ten", "eleven", "twelve");
			return function(val){
				if(val < 12){
					return ones[val] + " columns";
				} else {
					return "twelve columns";
				}
			}
})
