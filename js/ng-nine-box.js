(function() {

    angular.module('ngNineBox', []).directive('ngNineBox', function () {       
        
		var uniqueId = 'gf'+new Date().getTime();		
		
		return {
            restrict: 'E',
            template: '<div id="' + uniqueId + '"></div>',
            scope: { data: '='},
            link: function($scope, element, attrs) {
				
				var 
					el = element[0],
					options              = {};
					options.width        = attrs.width || 800,
					options.height       = attrs.height || 600,
					options.title        = attrs.title || 'Matriz 9 Box',
					options.background   = attrs.background || '#FFFFFF',
					options.linesDefault = [70,90,70,90],
					options.lines        = (attrs.lines) ? attrs.lines.split(',') : options.linesDefault;
								
				angular.element(el.querySelector('#'+uniqueId)).css('height', options.height).css('width', options.width);
				
				$.jqplot.postDrawHooks.push(function() {
					$('.jqplot-overlayCanvas-canvas').css('z-index', '0');
					$('.jqplot-series-canvas').css('z-index', '1');     
					$('.jqplot-highlighter-tooltip').css('z-index', '2');
					$('.jqplot-event-canvas').css('z-index', '5');
				});
     
				$.jqplot(uniqueId,[$scope.data],{
					title: options.title,
					grid: {
						background: options.background
					},
					canvasOverlay: {
						show: true,
						objects: [
							{ verticalLine: {
								name: '70x',
								x: options.lines[0] || options.linesDefault[0],
								yOffset: 0,
								lineWidth: 1,
								color: 'rgb(153, 153, 153)',
								lineCap: 'butt',
								shadow: false
							}},
							{ verticalLine: {
								name: '90x',
								x: options.lines[1] || options.linesDefault[1],
								yOffset: 0,
								lineWidth: 1,
								color: 'rgb(153, 153, 153)',
								lineCap: 'butt',
								shadow: false
							}},
							{ horizontalLine: {
								name: '70y',
								y: options.lines[2] || options.linesDefault[2],
								xOffset: 0,
								lineWidth: 1,
								color: 'rgb(153, 153, 153)',
								lineCap: 'butt',
								shadow: false
							}},
							{ horizontalLine: {
								name: '90y',
								y: options.lines[3] || options.linesDefault[3],
								xOffset: 0,
								lineWidth: 1,
								color: 'rgb(153, 153, 153)',
								lineCap: 'butt',
								shadow: false
							}},
						]
					},
					axes:{
						xaxis:{
							label:'Resultados + PADI',
							labelRenderer: $.jqplot.CanvasAxisLabelRenderer,
							min:0, 
							max:100, 
							tickInterval: 10,
							tickOptions:{
								showGridline: false,
								suffix: '%'
							}
						},
						yaxis:{
							label:'CEM',
							labelRenderer: $.jqplot.CanvasAxisLabelRenderer,
							min:0, 
							max:100, 
							tickInterval: 10,
							tickOptions:{
								showGridline: false,
								suffix: '%'
							}
						}
					},
					cursor: {
						show: true,
						zoom: true, 
						showTooltip: true
					},
					seriesDefaults:{
						renderer: $.jqplot.BubbleRenderer,
						rendererOptions: {
							autoscalePointsFactor: 0,
							autoscaleMultiplier: 0.1,
							highlightMouseDown: true,
							bubbleAlpha: 1,
							showLabels: false
						},
						shadow: true,
						shadowAlpha: 0.05
					},
					highlighter: {
						show: true,
						showTooltip: true,
						tooltipFade: true,
						sizeAdjust: 10,
						formatString: '<b>%4$s</b>',
						tooltipLocation: 'n',
						useAxesFormatters: false,
					}
				});               
                
            }
        }
    });
} ());