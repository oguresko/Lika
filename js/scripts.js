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
	},
	{
		'id': 4,
		'name': 'Marchewka',
		'callories': 30,
	}
];

$(function() {
	var availableTags = [];
	for (var i=0; i<products.length; i++) {
		availableTags.push(products[i].name);
	}

	$('#sum').html('0');

	var array = [
		'/pages/table.html', 
		'/pages/login.html', 
		'/pages/calendar.html', 
		'/pages/contact.html'
	];

	var activeId = 'table';
	var defaultPage = '/pages/'+ activeId + '.html';

	$.get(defaultPage, function(data) {
		$("#content").html(data);
	});








	/* dopinanie event autocomplete kiedy jest focus na search !!! */
	$(document).on("focus","#search", function(e) {
	    if ( !$(this).data("autocomplete") ) {
	        e.preventDefault();


		    $("#search").autocomplete({
		      source: availableTags,
		      select: function (event, ui) {


		      	var selectedProduct = getSelectedProduct(ui.item.value);

		      	var id = Number($('#myTable tr').length);

		      	var newListItem = $('<tr>').append(
		            $('<td>').text(id),
		            $('<td>').text(selectedProduct.name),
		            $('<td>').text(0),
		            $('<td>').text(selectedProduct.callories));

		        $('#myTable tr:last').after(newListItem);

		        updateSumCallories();
		        $('#sum').html(sumCallories);

				$("#search").val('');  
		        return false;
		      }
		    });


	        return false;
	    }
	});





    var updateSumCallories = function () {
    	var i =0;
    	sumCallories = 0;
		$('#myTable tr').each(function () {
			if (i !== 0) {
				sumCallories += Number($(this).children("td")[3].innerText);
			}
			i++;
		});
    }

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



var changePage = function (param) {
	$.get('/pages/' +  param + '.html', function(data) {
	     $("#content").html(data);
	});
}