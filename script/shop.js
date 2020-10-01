window.onload=function(){
	var addToCartButtons = document.getElementsByClassName('shop-item-button')
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }
	function addToCartClicked(event) {
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
    var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src
    addItemToCart(title, price, imageSrc)
    updateCartTotal()
}

function removeCartItem(event) {
    var buttonClicked = event.target
	id = setTimeout(function(){
		alert(`${getRndInteger(1,10)} customers have this product in their cart.`);
	},2000);
	var ok = getRndInteger(1,10);
	console.log(ok);
	if (ok <= 3) 
	{
		clearTimeout(id);
	}
	
	buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
}

var info = document.createElement("div");
var id;
var texteInd = 0;
var texte = ["DISCOUNT!" , "BUY RIGHT NOW", "FREE SHIPPING"];
info.innerHTML = texte[texteInd];
	id = setInterval(function(){
			if (texte.length == texteInd) texteInd = 0;
			info.innerHTML = texte[texteInd];
			texteInd++;
			console.log(texteInd);
	},2000)
console.log(info);
document.body.append(info);

function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCartTotal()
}

function addItemToCart(title, price, imageSrc) {
    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            alert('This item is already added to the cart')
            return
        }
    }
    var cartRowContents = `
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-danger" type="button">REMOVE</button>
        </div>`
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
}

function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var total = 0
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        var price = parseFloat(priceElement.innerText.replace('$', ''))
        var quantity = quantityElement.value
        total = total + (price * quantity)
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total
}
/*function updateProducts(){
	
	var products = document.getElementsByClassName("shop-item");
	for (var product = 0; product < products.length; product++)

}*/
var filter = document.getElementsByClassName("filter")[0];
	var category = ["clothing" , "shoes"];
	var gen = ["male", "female"];
	for (var i = 0;i < gen.length; i++)
	{
		var check = document.createElement("input");
		check.type = "checkbox";
		check.name = "gender";
		check.checked = "true";
		check.id = gen[i];
		filter.appendChild(check);
		var newLabel = document.createElement("Label");
		newLabel.setAttribute("for",check.id);
		newLabel.innerHTML = gen[i];
		filter.appendChild(newLabel);
		check.onchange = function(){
			var maleProducts = document.getElementsByClassName("male");
			var femaleProducts = document.getElementsByClassName("female");
			console.log(this.id);
			if (this.id == "male")
			{
				if (this.checked == true)
					for (maleProduct = 0;maleProduct < maleProducts.length;maleProduct++)
						maleProducts[maleProduct].style.display = "block";
				else 
					for (maleProduct = 0;maleProduct < maleProducts.length;maleProduct++)
						maleProducts[maleProduct].style.display = "none";
			}
			if (this.id == "female")
			{
				if (this.checked == true)
					for (femaleProduct = 0;femaleProduct < femaleProducts.length;femaleProduct++)
						femaleProducts[femaleProduct].style.display = "block";
				else 
					for (femaleProduct = 0;femaleProduct < femaleProducts.length;femaleProduct++)
						femaleProducts[femaleProduct].style.display = "none";
			}
		}
	}
	var br = document.createElement("br");
	filter.appendChild(br);
	for (var i = 0;i < category.length; i++)
	{
		var rad = document.createElement("input");
		rad.type = "radio";
		rad.name = "gen";
		rad.id = category[i];
		if (i == 0) rad.checked = true;
		rad.value = category[i];
		filter.appendChild(rad);
		var newLabel = document.createElement("Label");
		newLabel.setAttribute("for",rad.id);
		newLabel.innerHTML = category[i];
		filter.appendChild(newLabel);
		rad.onchange = function(){
			var clothing = document.getElementsByClassName("clothing")[0];
			var shoes = document.getElementsByClassName("shoes")[0];
			console.log(clothing);
			console.log(shoes);
			console.log(this.value);
			if(this.value == "clothing") 
			{
				clothing.style.display = "none";
				shoes.style.display = "block";
			}
			else
			{
				shoes.style.display = "none";
				clothing.style.display = "block";
			}
				
		}
	}
	var br2 = document.createElement("br");
	filter.appendChild(br2);
	var range = document.createElement("input");
	range.type = "range";
	range.name = "price";
	range.min = "0";
	range.max = "20";
	var textInput = document.createElement("input");
	textInput.type = "text";
	textInput.id = "textInput";
	textInput.value = "20";
	filter.appendChild(range);
	range.onchange = function(){
		var prod = document.getElementsByClassName("shop-item");
		//console.log(prod);
		for (var i = 0; i < prod.length; i++)
		{
			var priceElement = prod[i].getElementsByClassName('shop-item-price')[0];
			var price = parseFloat(priceElement.innerText.replace('$', ''));
			console.log(price);
			if (price > this.value)
				prod[i].style.display = "none";
			else prod[i].style.display = "block";
			textInput.value = this.value;
		}
	}
	filter.appendChild(textInput);
	
	var br3 = document.createElement("br");
	filter.appendChild(br3);
	
	var opt;
	var sel = document.createElement("select");
	sel.name = "culoare";
	opt = document.createElement("option");
	opt.innerHTML = "red";
	sel.add(opt);
	opt = document.createElement("option");
	opt.innerHTML = "blue";
	sel.add(opt);
	opt = document.createElement("option");
	opt.innerHTML = "green";
	sel.add(opt);
	filter.appendChild(sel);
	var prod = document.getElementsByClassName("shop-item");
	sel.addEventListener('change', function(){
		if (sel.options[sel.selectedIndex].value == "red")
		{
			$(".green").hide();
			$(".blue").hide();
			$(".red").show();
		}
		else if (sel.options[sel.selectedIndex].value == "green")
		{
			$(".red").hide();
			$(".blue").hide();
			$(".green").show();
		}
		else if (sel.options[sel.selectedIndex].value == "blue")
		{
			$(".red").hide();
			$(".green").hide();
			$(".blue").show();
		}
		
	})
	
	var br4 = document.createElement("br");
	filter.appendChild(br4);
	
	var search = document.createElement("input");
	search.setAttribute("type", "text");
	search.id = "search";
	//search.value = "search";
	$(function(){
	$("#search").val("Search");
	})
	var btn = document.createElement("BUTTON");
    btn.innerHTML = "search";
	filter.appendChild(search);
	filter.appendChild(btn);
	btn.addEventListener('click',function(){
		//console.log(search.value);
		var items = document.getElementsByClassName("shop-item-title");
		for (item = 0; item < items.length; item++)
		{
			//console.log(search.value);
			//console.log(items[item].innerHTML);
			if (search.value == items[item].innerHTML) 
				items[item].parentElement.style.display = 'block';
			else items[item].parentElement.style.display = 'none';
		}
	})
	
	$(".shop-item").mousedown(function(){
		var title = this.getElementsByClassName("shop-item-title")[0].innerHTML;
		var price = this.getElementsByClassName("shop-item-price")[0].innerHTML;
		var imageSrc = this.getElementsByClassName('shop-item-image')[0].src
		document.onkeypress = function(e){
			if(e.which == 99) addItemToCart(title, price, imageSrc);
		}
	})
	$(".shop-item-button").mousedown(function(e){
			e.stopPropagation();
		});
	$(".shop-item").mousedown(function(){
		
		var cln = this.cloneNode(true);
		var btn = this.getElementsByClassName("shop-item-button")[0];
		cln.style.position = 'absolute';
		cln.style.zIndex = 1000;
		document.body.append(cln);
		moveAt(event.pageX, event.pageY);
		function moveAt(pageX, pageY)
		{
			cln.style.left = pageX - cln.offsetWidth / 2 + 'px';
			cln.style.top = pageY - cln.offsetHeight / 2 + 'px'; 
		}
		function onMouseMove(e){
			moveAt(event.pageX, event.pageY);
		}
		document.addEventListener('mousemove', onMouseMove);
		cln.onmouseup = function(){
			
			
			
			let currentDroppable = null;
			
			this.hidden = true;
			let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
			this.hidden = false;
			
			if (!elemBelow) cln.remove();
			let droppableBelow = elemBelow.closest('.content-section-cart');
			/*console.log(currentDroppable)
				console.log(droppableBelow);
			console.log(elemBelow);*/
			if(currentDroppable != droppableBelow){
				
				
				if (currentDroppable)
					this.remove();
				
				currentDroppable = droppableBelow;
				
				if (currentDroppable){
					var title = this.getElementsByClassName("shop-item-title")[0].innerHTML;
					var price = this.getElementsByClassName("shop-item-price")[0].innerHTML;
					var imageSrc = this.getElementsByClassName('shop-item-image')[0].src
					addItemToCart(title, price, imageSrc);
					this.remove();
				}
			}
			else this.remove();
			document.removeEventListener('mousemove', onMouseMove);
			cln.onmouseup = null;
			
		}
		cln.ondragstart = function(){
			return false;
		}
	})
	/*var items = document.getElementsByClassName("shop-item");
	for (item = 0; item < items.length; item++)
	{
		items
	}*/
	
	var br5 = document.createElement("br");
	filter.appendChild(br5);
	
	var textar = document.createElement("TEXTAREA");
	var t = document.createTextNode("Search");
	textar.appendChild(t);
	
	var btn = document.createElement("BUTTON");
    btn.innerHTML = "search";
	filter.appendChild(textar);
	filter.appendChild(btn);
	btn.addEventListener('click',function(){
		var items = document.getElementsByClassName("shop-item");
		for (item = 0; item < items.length; item++)
		{
			if (textar.value == "")
				items[item].style.display = "block";
			else
			if (items[item].matches('.'+textar.value)) 
				items[item].style.display = 'block';
			else items[item].style.display = 'none';
		}
	})
	
	
}
function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
} 
