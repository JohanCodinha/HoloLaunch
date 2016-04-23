

;(function(window, document) {
	
	'use strict';
	
	
	// -------- Globals -------- //
	var views     = {};
	var models    = {};
	var templates = {};
	var common    = {};
	// -------- Globals END -------- //
	
	function compileTemplates() {
		$('.template').each(function() {
			var el = $(this);
			var name = el.data('name');
			templates[name] = _.template(el.html());
		});
	}
	
	function loadViews() {
		// -------- Picture class -------- //
		views.Header = Backbone.View.extend({
			initialize : function() {
			}
		});
		
		
		views.Hologram = Backbone.View.extend({
			appWidth : 0,
			events : {
			},
			initialize : function() {
				$('html').addClass('fullscreen');
				//_.bindAll(this, 'centerImage');
				this.createSquare();
				this.setupCanvas();
			},
			createSquare : function() {
				var el = $(this.el);
			},
			setupCanvas : function() {
				$('.view.top').append('<canvas id="main" width="100" height="100"></canvas>');
				$('#main').width($('.view').width()).height($('.view').height());
				common.canvas = new createjs.Stage("main");
				var circle = new createjs.Shape();
				circle.graphics.beginFill("DeepSkyBlue").drawCircle(0, 0, 20);
				circle.x = 50;
				circle.y = 75;
				common.canvas.addChild(circle);
				circle = new createjs.Shape();
				circle.graphics.beginFill("DeepSkyBlue").drawCircle(0, 0, 20);
				circle.x = 0;
				circle.y = 25;
				common.canvas.addChild(circle);
				common.canvas.update();
				this.setupSlaves();
				setInterval(function() {

				}, 10);
			},
			setupSlaves : function() {
				$('.view.slave').each(function() {
					var el = $(this);
					var id = _.uniqueId('canvas_');
					el.append('<canvas class="' + id + '" width="100" height="100"></canvas>');
					$('.' + id).width($('.view').width()).height($('.view').height());
					var c = document.getElementsByClassName(id)[0];
					c = c.getContext('2d');
					c.drawImage(common.canvas.canvas, 0, 0);
				});
			}
			
		});
		// -------- Picture class END -------- //
	}
	
	
	// -------- Bootstart -------- //
	function init() {
		if($('.main').hasClass('app')) {
			compileTemplates();
			loadViews();
			
			common.hologram = new views.Hologram({
				el : $('.cube')
			});
			
/*			$(window).resize(function() {
				picture.centerImage()
			});*/
		}
	}
	
	$(document).ready(init);
	// -------- Bootstart END -------- //
	
})(window, document);