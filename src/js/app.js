

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
			events : {
				'click' : 'onClick' 
			},
			initialize : function() {
				console.log(this);
				$('html').addClass('fullscreen');
				//_.bindAll(this, 'centerImage');
				this.createSquare();
			},
			createSquare : function() {
				var el = $(this.el);
				var width = el.width();
				var height = el.height();
				var appWidth = 0;
				if(width > height) {
					appWidth = height;
				} else {
					appWidth = width;
				}
				el.append('<div class="view"></div>');
			},
			setupCanvas : function() {
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
				el : $('.app')
			});
			
/*			$(window).resize(function() {
				picture.centerImage()
			});*/
		}
	}
	
	$(document).ready(init);
	// -------- Bootstart END -------- //
	
})(window, document);