define([
	'jquery', 
	'underscore', 
	'backbone',
	'../../jsdust/landing'
	], 
	function($, _, Backbone, template){
	
		var View = Backbone.View.extend({
		
			el: '#landing',
		
			events: {
	    		'click .del': 'deleteItem',
	    		'submit #addNew': 'addNew',
			},

			initialize: function(json) {
			},
			
			render: function(json) {
				// FIXME: This is temporary. Ideally should find a way to do this thru css.
				$(this.el).find('#items').height($(window).height() - $(this.el).find('#items').position().top - 100);
			},

			deleteItem: function(event) {
				// FIXME: This function depends on DOM structure too much. Should clean this up.
				var thisObject = event.target,
					thisParent = thisObject.parentNode;

				$.post(thisParent.action, $(thisParent).serialize(), function(json){
	        		thisParent.parentNode.parentNode.removeChild(thisParent.parentNode);
					console.log(json.status);
				});				

				event.preventDefault();
			},

			addNew: function(event) {
				if($('#newItemName').val() !== '') {
					$.post(event.target.action,	$(event.target).serialize(), function(json){
						$('#items').html(($('#items').html()) + '<li class="item"><span class="name">' +  $('#newItemName').val() + '</span><span class="del">&#10005; </span></li>');
						$('#newItemName').val('');
						$('#addNew input[type=submit]').focus();
						console.log(json.status);
					});				
				}
				event.preventDefault();
			}

		});
		
		return View;
	
	}
);
