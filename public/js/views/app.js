define([
  'jquery',
  'underscore', 
  'backbone'
  ], function($, _, Backbone){
  var AppView = Backbone.View.extend({

    el: $('body'),

    events: {
	    'submit form.proceed': 'proceedForm',
	    'click input.submit': 'proceedForm',
	   	'click a.proceed': 'proceedLink',
    },

    initialize: function() {
    },

    render: function() {
    },
    
    proceedForm: function(e) {
		document.getElementById("content").innerHTML = "<h2>Loading...</h2>";
		$.post(e.target.action,	$(e.target).serialize(), function(json){
			showPage(json, Backbone);
		});

	    e.preventDefault();
    },
    
    proceedLink: function(e) {
    	getPage(e.target.href, Backbone);
	    e.preventDefault();
    }


  });
  
  return AppView;
  
});


// FIXME: Find a better place to put this
function showPage(json, backbone) {
    require(['views/' + json.viewName], function(View){
  		dust.render('public/templates/' + json.viewName + '.dust', json, function(err, out) {
  			document.getElementById("content").innerHTML = out;
  		});
      var pageView = new View(json);
      //pageView.el = json.viewName;
      pageView.render(json);
      //pageView.delegateEvents();
    });  
	backbone.history.navigate('#' + json.viewName);			
}

// FIXME: Find a better place to put this
function getPage(url, backbone) {
	document.getElementById("content").innerHTML = "<h2>Loading...<h2>";
	$.get(url, function(json){
		showPage(json, backbone);
	});
}