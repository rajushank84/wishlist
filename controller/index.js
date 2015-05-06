var ItemModel = require('../model/ItemModel');

module.exports = function(app) {
              
	app.get('/', function(req, res) {

		ItemModel.getAllItems(function(allTheItems){
				
			var json = {
				viewName: "landing",
				baseTemplate: 'base',
				data: {
					items: allTheItems
				}
			};

			if(req.header('X-Requested-With') == 'XMLHttpRequest') {
				res.writeHead(200, { 'Content-Type': 'application/json' });
				res.write(JSON.stringify(json));
				res.end();
			}
			else {
				res.render("public/templates/" + json.baseTemplate,json);
			}
		});

	});

	app.post('/doAddItem', function(req, res) {
		var data = {};

		data.name = req.body.name;

		ItemModel.saveItem(data, function(){		
			var json = {
				status: 'Added successfully'
			};

			if (req.header('X-Requested-With') == 'XMLHttpRequest') {
				res.writeHead(200, { 'Content-Type': 'application/json' });
				res.write(JSON.stringify(json));
				res.end();
			}
		});
	});

	app.post('/doDeleteItem', function(req, res) {
		var data = {};

		data.name = req.body.name;

		console.log('deleteItem');
		console.log(req.body.name);

		ItemModel.deleteItem(data, function(){		
			var json = {
				status: 'Deleted successfully'
			};

			if (req.header('X-Requested-With') == 'XMLHttpRequest') {
				res.writeHead(200, { 'Content-Type': 'application/json' });
				res.write(JSON.stringify(json));
				res.end();
			}
		});
	});

}


