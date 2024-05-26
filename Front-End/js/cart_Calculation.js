console.log("Js File : cart_Calculation.js");

let shippingCharge = 40;
let vatPercent = 5;

/* ..........
    Function : Add Product To Cart
.......... */
function addProductToCart() {
  console.log("Function : addProductToCart");
  debugger;

  const productName = getTextElementValueStringById("product-name");
  const productPrice = getTextElementValueById("product-price");

  addProductToCartEntryList(productName, productPrice);
  calculateCartAddingPrice(productPrice);

  /* ... Validation Checking : Button ... */
  update_ButtonState_MakePurchase();
  update_ButtonState_CouponApply();
}

/* ..........
    Function : CRUD : Add Product Data To Cart EntryList
.......... */
function addProductToCartEntryList(nameOfAddedItem, priceOfAddedItem) {
  console.log("Function : addProductToCartEntryList");
  debugger;

  const cartEntryList = document.getElementById("cart-entrylist");
  const countProduct = cartEntryList.childElementCount;
  const uniqId = countProduct + 1;

  const entryData = document.createElement("div");
  entryData.classList.add("my-2");
  entryData.setAttribute("id", "dataId_" + uniqId);
  entryData.innerHTML = `
                          <div class="flex flex-row w-[100%]">
                              <div class="whitespace-nowrap overflow-hidden text-ellipsis w-[50%]">
                                  ${countProduct + 1}. ${nameOfAddedItem} 
                              </div>
  
                              <div class="w-[10%]">    
                                  <span class="text-xs text-gray-400">
                                      x
                                      <span>
                                          1
                                      </span>
                                  </span>
                              </div>
  
                              <div class="text-end w-[35%]">
                                  <span id="dataPriceId_${uniqId}" class="text-gray-500 px-1">
                                      ${priceOfAddedItem}
                                  </span>
                                  <span class="text-xs pr-2">
                                      BDT
                                  </span>
                              </div>
                          
                              <div onclick="delete_CartProduct('dataId_${uniqId}', 'dataPriceId_${uniqId}')" class="text-sm text-red-500 w-[5%] my-auto mx-auto">                                
                                  <i class="fa-solid fa-circle-xmark" style="cursor:pointer;"></i>                               
                              </div>
                          </div>
                          `;

  cartEntryList.appendChild(entryData);

  console.log(nameOfAddedItem + " " + priceOfAddedItem);
}

/* ..........
      Function : CRUD : Delete Product from Cart EntryList
  .......... */
function delete_CartProduct(dataId, dataPriceId) {
  console.log("Function : delete_CartProduct");
  debugger;

  const data_Price = getTextElementValueById(dataPriceId);
  const cartProductPriceTotalPrevious = getTextElementValueById("total-price");

  const cartProductPriceTotalCurrent =
    cartProductPriceTotalPrevious - data_Price;
  setTextElementValueById("total-price", cartProductPriceTotalCurrent);

  calculateCartTotalPrice(cartProductPriceTotalCurrent);
  calculateDiscountPrice(cartProductPriceTotalCurrent);

  resetInnerHtmlComponent(dataId, "");

  /* ... Validation Checking : Button ... */
  update_ButtonState_MakePurchase();

  console.log(
    dataId,
    cartProductPriceTotalPrevious,
    dataPriceId,
    data_Price,
    cartProductPriceTotalCurrent
  );
}

/* ..........
    Function : Calculation : Added Product Price to Cart
.......... */
function calculateCartAddingPrice(priceOfAddedItem) {
  console.log("Function : calculateCartAddingPrice");
  debugger;

  const cartProductPriceTotalPrevious = getTextElementValueById("total-price");
  const cartProductPriceTotalCurrent =
    cartProductPriceTotalPrevious + priceOfAddedItem;
  setTextElementValueById("total-price", cartProductPriceTotalCurrent);

  calculateCartTotalPrice(cartProductPriceTotalCurrent);
  calculateDiscountPrice(cartProductPriceTotalCurrent);

  console.log(
    cartProductPriceTotalPrevious,
    priceOfAddedItem,
    cartProductPriceTotalCurrent
  );
}

/* ..........
      Function : Calculation : Cart Total Price
.......... */
function calculateCartTotalPrice(onlyCartProductPriceTotal) {
  console.log("Function : calculateCartTotalPrice");
  debugger;

  setTextElementValueById("vat-percent", vatPercent);
  const vatAmountAdding = vatCalculation(onlyCartProductPriceTotal);
  const shippingFeeAdding = shippingFeeCalculation(onlyCartProductPriceTotal);

  const cartTotalPrice =
    onlyCartProductPriceTotal + vatAmountAdding + shippingFeeAdding;
  setTextElementValueById("total", cartTotalPrice);

  console.log(onlyCartProductPriceTotal + " " + cartTotalPrice);
}

/* ..........
      Function : Calculation : Vat 
.......... */
function vatCalculation(onlyCartProductPriceTotal) {
  console.log("Function : vatCalculation");
  debugger;

  const vat_Amount = onlyCartProductPriceTotal * (vatPercent / 100);
  setTextElementValueById("product-vat", vat_Amount);

  if (vat_Amount === 0) {
    resetInnerTextComponent("vat-percent", "");
  }

  return vat_Amount;
}

/* ..........
      Function : Calculation : Shipping Fee 
.......... */
function shippingFeeCalculation(onlyCartProductPriceTotal) {
  console.log("Function : shippingFeeCalculation");
  debugger;

  let shippingFee = shippingCharge;

  if (onlyCartProductPriceTotal !== 0) {
    setTextElementValueById("shipping-charge", shippingFee);
  } else {
    shippingFee = 0;
    resetInnerTextComponent("shipping-charge", shippingFee);
  }

  return shippingFee;
}

/* ..........
    Function : Validation : Button : Make Purchase : Update Button State for Purchase
.......... */
function update_ButtonState_MakePurchase() {
  console.log("Function : update_ButtonState_MakePurchase");
  debugger;

  const btn_MakePurchase = document.getElementById("btn-make-purchase");
  const cartTotalPrice = getTextElementValueById("total");

  if (cartTotalPrice !== 0) {
    btn_MakePurchase.disabled = false;
    //btn_MakePurchase.classList.add("cursor-not-allowed", "opacity-50");
  } else {
    btn_MakePurchase.disabled = true;
    //btn_MakePurchase.classList.remove("cursor-not-allowed", "opacity-50");
  }
}
