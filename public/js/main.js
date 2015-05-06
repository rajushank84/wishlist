require.config({
	paths: {
		jquery: 'lib/jquery-min',
		underscore: 'lib/underscore-min',
		backbone: 'lib/backbone-optamd3-min'
	}
});


require(['views/app','backbone'], function(AppView, Backbone){
	var appView =  new AppView;
	appView.render();

	var AppRouter = Backbone.Router.extend({
		routes: {
			'landing': 'landing',
			'about': 'about',
			'': 'landing'
		},

		about: function() {
			getPage('/about', Backbone);
		},

		landing: function() {
			getPage('/', Backbone);
		},

		default: function() {
			Backbone.history.navigate('#landing');
		}
	});

	var appRouter = new AppRouter();
	Backbone.history.start();

}); 


require([
	'../jsdust/landing',
	'views/landing',
	'../jsdust/about',
	'views/about',
	], function(){
		// do nothing. Just prefetching.
	}
);


$(document).ready(function() {
	$('body').scrollTop(1);
    $('input').click(function(){
        window.scrollTo(0,0);
    });
 });

/*$('body').bind('touchmove', function (ev) { 
	//alert(ev.target);
});*/


