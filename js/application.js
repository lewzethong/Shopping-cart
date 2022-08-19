var updateCost = function () {
  var totalCost = [];
  $('tbody tr').each(function (index, ele) {
    var unitPrice = parseFloat($(ele).find('.price').text())
    var quantity = parseFloat($(ele).find('.quantity input').val())
    var itemCost = unitPrice * quantity;

    if (quantity) {
      $(ele).children('.cost').html(itemCost);
      totalCost.push(itemCost)
    } else {
      $(ele).children('.cost').html(' ')
    }
  });
  var total = totalCost.length > 0 ? totalCost.reduce((sum, num) => sum + num) : 0
  $('#grandTotal').html(total);
};

var addItem = function () {
  var item = $('#item').val();
  var price = $('#price').val();
  console.log(item, price)
  if (!item || isNaN(price)) {
    alert('You must enter both item name and unit price to add a new item.');
  } else {
    $('#lastRow').before("<tr><td class='item'>" + item + "</td><td class='price'>" + price + "</td><td class='quantity'><label>Qty</label><input type='number'></input></td><td class='cost'></td><td><button class='remove'>remove</button></td></tr>");  
  };
  updateCost();  
  $('tr').find('#item, #price').val('');

}

var removeItem = function () {
  $(this).closest('tr').remove();
  updateCost();
}

var updateQty = function () {
  clearTimeout(delay);
  var delay = setTimeout(updateCost, 1000);
};

$(document).ready(function () {
  var item = $('#lastRow #item').val();
  var price = $('#lastRow #price').val();
  console.log(item, price)
  updateCost();
  $(document).on('input', '.quantity', updateQty);
  $(document).on('click', '.remove', removeItem);
  $(document).on('click', '#add', addItem);
  $('#price').on('keyup', function(event) {
    if (event.key === 'Enter') {
      addItem();
    }
  });
})
