var products = [
	{
		'id': 1,
		'name': 'Chleb',
		'callories': 300
	},
	{
		'id': 2,
		'name': 'Woda',
		'callories': 50
	},
	{
		'id': 3,
		'name': 'Gibon',
		'callories': 5000
	}
];

$(function() {
	var availableTags = [];
	for (var i=0; i<products.length; i++) {
		availableTags.push(products[i].name);
	}


    $("#search").autocomplete({
      source: availableTags,
      select: function (event, ui) {
      	var selectedProduct = getSelectedProduct(ui.item.value);
      	console.log(selectedProduct);
      }
    });

    var getSelectedProduct = function (value) {
		var selectedProduct = undefined;
		for (var i=0; i<products.length; i++) {
			if (products[i].name === value) {
				selectedProduct = products[i];
			}
		}
		return selectedProduct;
    }
});