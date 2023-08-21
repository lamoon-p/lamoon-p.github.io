fetch("products.json")
.then(function(response){
	return response.json();
})
.then(function(data) {
	localStorage.setItem("products", JSON.stringify(data));
	console.log(localStorage.getItem("cart"));
	if(!localStorage.getItem("cart")){
		localStorage.setItem("cart", "[]");
	}
});

ready()

function ready() {
  if (window.location.href.indexOf('cart.html') != -1) {
      document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
      // loadCartItem()
    }

  let removeCartItemButtons = document.getElementsByClassName ('remove-btn')
    for (let i = 0; i < removeCartItemButtons.length; i++) {
        let button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem)
    }

  let quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for (let i = 0; i < quantityInputs.length; i++) {
        let input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }

  let addToCartButtons = document.getElementsByClassName('add-item-button')
    for (let i = 0; i < addToCartButtons.length; i++) {
        let button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }

}

let products = JSON.parse(localStorage.getItem("products"));
let cart = JSON.parse(localStorage.getItem("cart"));

function purchaseClicked() {
    alert('Thank you for your purchase')
    let cartItems = document.getElementsByClassName('cart-items')[0]
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal()
}

function removeCartItem(event) {
    let buttonClicked = event.target
    buttonClicked.parentElement.parentElement.parentElement.remove()
    updateCartTotal()
}

function quantityChanged(event) {
    let input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCartTotal()
}

function addToCartClicked(event) {
    let button = event.target
    let shopItem = button.parentElement.parentElement.parentElement.parentElement
    let quantityElement = shopItem.getElementsByClassName('shop-item-quantity')[0]
    let quantity = 0;
    if (quantityElement === undefined) {
      quantity = 1;
    } else {
      quantity = quantityElement.value;

    }
    let productId = shopItem.getElementsByClassName('shop-item-id')[0].innerText
    console.log('productId:' + productId)
    let product = products.find(function(product){
      return product.id == productId;
    });
    if(cart.length == 0){
      product['quantity'] = quantity;
      cart.push(product)
    }else{
      let res = cart.find(element => element.id == productId);
      if(res === undefined){
        product['quantity'] = quantity;
        cart.push(product)
      }
    }
    localStorage.setItem("cart", JSON.stringify(cart));
}

function loadCartItem() {
    let cart = localStorage.getItem("cart")

}

function addItemToCart() {
    
    let cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    let cartItems = document.getElementsByClassName('cart-items')[0]
    let cartItemNames = cartItems.getElementsByClassName('cart-item-title')
    for (let i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            alert('This item is already added to the cart')
            return
        }
    }
    let cartRowContents = `
            <div class="row gy-3 mt-4 cart-row">
              <div class="col-lg-5">
                <div class="me-lg-5">
                  <div class="d-flex">
                    <img src="${imageSrc}" />
                    <div class="">
                      <a href="#" class="nav-link">${title}</a>
                      <p class="text-muted">${length}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-lg-2 col-sm-6 col-6 d-flex flex-row flex-lg-column flex-xl-row text-nowrap">
                <div class="">
                  <select style="width: 100px;" class="cart-quantity-input form-select me-4">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                  </select>
                </div>
              <div class="">
                <text class="h6  cart-subtotal-price">฿1999</text> <br />
                <small class="text-muted text-nowrap"> <small class="cart-price">฿${price}</small> / per item </small>
              </div>
            </div>
            <div class="col-lg col-sm-6 d-flex justify-content-sm-center justify-content-md-start justify-content-lg-center justify-content-xl-end mb-2">
              <div class="float-md-end">
                <a href="#" class="remove-btn btn btn-light border text-danger icon-hover-danger"> Remove</a>
              </div>
            </div>
            </div>
            `
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
    document.getElementById("cart-quantity-input").selectedIndex = quantity
}

function updateCartTotal() {
    let cartItemContainer = document.getElementsByClassName('cart-items')[0]
    let cartRows = cartItemContainer.getElementsByClassName('cart-row')
    let subtotal = 0
    let total = 0
    for (let i = 0; i < cartRows.length; i++) {
        let cartRow = cartRows[i]
        cartRow
        let priceElement = cartRow.getElementsByClassName('cart-price')[0]
        let quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        let price = parseInt(priceElement.innerText.replace('฿', ''))
        let quantity = quantityElement.value
        subtotal = price * quantity
        total = total + (subtotal)
        document.getElementsByClassName('cart-subtotal-price')[i].innerText = '฿' + subtotal
    }
    document.getElementsByClassName('cart-total-price')[0].innerText = '฿' + total
}