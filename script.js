let menu = document.querySelector('#menu-bar');
let navbar = document.querySelector('.navbar');
menu.onclick = () =>{
	menu.classList.toggle('fa-times');
	navbar.classList.toggle('active');
}
window.onscroll = () =>{
  menu.classList.remove('fa-times');
  navbar.classList.remove('active');
  if(window.scrollY > 60){
    document.querySelector('#scroll-top').classList.add('active');
  }
  else{
    document.querySelector('#scroll-top').classList.remove('active');
  }
}
function loader(){
  document.querySelector('.loader-container').classList.add('fade-out');
}
function fadeOut(){
  setInterval(loader, 3000);
}
window.onload = fadeOut();

  
var swiper = new Swiper(".mySwiper", {
  slidesPerView: 1,
  spaceBetween: 30,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});
let searchFrom=document.querySelector('.search-form');
document.querySelector("#search-btn").onclick = () =>{
  searchFrom.classList.toggle('active');
}
let shoppingCart=document.querySelector('.shopping-cart');
document.querySelector("#cart-btn").onclick = () =>{
  shoppingCart.classList.toggle('active');
}
// cart working js
if(document.readyState=="loading"){
  document.addEventListener("DOMContentLoaded",ready);
}
else{
  ready();
}

//making function

function ready()
{
  var removeCartButtons =document.getElementsByClassName("fa-trash");
  for(var i=0;i<removeCartButtons.length;i++)
  {
    var button =removeCartButtons[i];
    button.addEventListener('click',removeCartItem);
  }
  //quantity changes
  var quantityInputs = document.getElementsByClassName("cart-quantity")
  for (var i=0 ; i<quantityInputs.length;i++)
  {
    var input =quantityInputs[i];
    input.addEventListener("change",quantityChanged)
  }
//add to cart 
var addCart =document.getElementsByClassName('order-now');
for (var i=0;i<addCart.length; i++)
{
  var button=addCart[i];
  button.addEventListener("click",addCartClicked);
}
//buy button 
document.getElementsByClassName("buy-btn")[0].addEventListener("click",buyButtonClicked);
}
//function buy
function buyButtonClicked()
{
  alert("You Order is Placed");
  var cartContent=document.getElementsByClassName("shopping-cart-boxes")[0];
  while(cartContent.hasChildNodes())
  {
    cartContent.removeChild(cartContent.firstChild);
  }
  updatetotale();
}
//add item
function addCartClicked(event)
{
  var button =event.target;
  var products=button.parentElement;
  var title=products.getElementsByClassName("product-title")[0].innerText;
  var price=products.getElementsByClassName("price")[0].innerText;
  var productImg=products.getElementsByClassName("product_image")[0].src;
  addProductToCart(title,price,productImg);
  updatetotale();
}
function addProductToCart(title,price,productImg)
{
  var cartShopBox = document.createElement("div");
  cartShopBox.classList.add("cart-box");
  var cartItems = document.getElementsByClassName("shopping-cart-boxes")[0];
  var cartItemsNames =document.getElementsByClassName("cart-product-title");
   for (var i=0;i<cartItemsNames.length;i++)
   {
    if(cartItemsNames[i].innerHTML==title)
    {
      alert("You have already add this item to cart");
      return;
    }
    updatetotale();

   }
 
var cartBoxContent=`			<i class="fas fa-trash"></i>
<img src="${productImg}">
<div class="cart-content">
  <h3 class="cart-product-title">${title}</h3>
  <span class="cart-price"> ${price} </span>
  <br>
  <input type="number" name="quantity" value="1" class="cart-quantity">
</div>`;
cartShopBox.innerHTML=cartBoxContent;
cartItems.append(cartShopBox);
cartShopBox.getElementsByClassName('fa-trash')[0].addEventListener('click',removeCartItem);
cartShopBox.getElementsByClassName('cart-quantity')[0].addEventListener('change',quantityChanged);
updatetotale();

}
//remove item
function removeCartItem(event){
  var buttonClicked= event.target;
  buttonClicked.parentElement.remove();
  updatetotale();
}
//quantity changes
function quantityChanged(event){
  var input =event.target
  if (isNaN(input.value)|| input.value<=0)
  {
    input.value=1;
  }
  updatetotale();
}
//update totale
function updatetotale(){
  var cartContent=document.getElementsByClassName('shopping-cart-boxes')[0];
  var cartBoxes=document.getElementsByClassName('cart-box');
  var total=0;
for (var i=0;i<cartBoxes.length;i++){
  var cartBox=cartBoxes[i];
  var priceElemet=cartBox.getElementsByClassName("cart-price")[0];
  var quantityElement=cartBox.getElementsByClassName("cart-quantity")[0];
  var price=parseFloat(priceElemet.innerText.replace("tnd",""));
  var quantity=quantityElement.value;
  total=total+price*quantity;
}
  total=Math.round(total*100)/100;
  document.getElementsByClassName("total")[0].innerText=total+"tnd";

}