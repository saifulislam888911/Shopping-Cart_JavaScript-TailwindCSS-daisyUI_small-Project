console.log("Js File : coupon.js");

let couponApply_flag;

let coupon_Code_1 = "SELL200";
let coupon = coupon_Code_1;
let discountPercent;
if (coupon == coupon_Code_1) {
  discountPercent = 20;
}

/* ..........
    Function : Button : Coupon : Coupon Code Copy
.......... */
function couponCodeCopy() {
  const couponCodeGet = getTextElementValueStringById("coupon-code-collect");
  setInputFieldValueById("coupon-code", couponCodeGet);

  showToast("Coupon Copied", "success");
}

/* ..........
    Function : Button : Apply : Coupon Discount Price Apply
.......... */
function applyCouponDiscount() {
  couponApply_flag = 0;

  const inputField_Applied_Coupon = getInputFieldValueStringById("coupon-code");
  const cartProductPriceTotalPrevious = getTextElementValueById("total-price");

  if (
    inputField_Applied_Coupon == coupon &&
    cartProductPriceTotalPrevious >= 200
  ) {
    couponApply_flag = 1;

    calculateDiscountPrice(cartProductPriceTotalPrevious);

    showToast("Coupon Applied", "success");
    vMsgShow_ValidCouponApply(inputField_Applied_Coupon, discountPercent);
  } else {
    showToast("Invalid Coupon", "error");
    vMsgShow_InvalidCouponApply(inputField_Applied_Coupon);
  }
}

/* ..........
    Function : Calculation : Coupon Discount Price
.......... */
function calculateDiscountPrice(onlyCartProductPriceTotal) {
  if (couponApply_flag === 1 && onlyCartProductPriceTotal >= 200) {
    const discountAmount = onlyCartProductPriceTotal * (discountPercent / 100);
    setTextElementValueById("discount-price", discountAmount);

    const cartTotalPrice = getTextElementValueById("total");
    const cartTotalPriceAfterDiscount = cartTotalPrice - discountAmount;
    setTextElementValueById("total", cartTotalPriceAfterDiscount);

    console.log(discountAmount, cartTotalPriceAfterDiscount);
  } else if (couponApply_flag === 1 && onlyCartProductPriceTotal < 200) {
    couponCodeRemove();
  } else {
    resetInnerHtmlComponent("vMsg-couponApply", "");
    resetInnerTextComponent("discount-price", "0.00");
  }

  update_ButtonState_CouponApply();
}

/* ..........
    Function : Coupon Code Remove
.......... */
function couponCodeRemove() {
  couponApply_flag = 0;

  resetInnerHtmlComponent("vMsg-couponApply", "");
  resetInnerTextComponent("discount-price", "0.00");

  const cartProductPriceTotalPrevious = getTextElementValueById("total-price");
  calculateCartTotalPrice(cartProductPriceTotalPrevious);

  update_ButtonState_CouponApply();

  showToast("Coupon Removed", "error");
}

/* ..........
    Function : Validation : Button : Apply : Update Button State for Coupon Apply
.......... */
function update_ButtonState_CouponApply() {
  const inputField_Apply_Coupon = document.getElementById("coupon-code");
  const btn_CouponApply = document.getElementById("btn-coupon-apply");

  const cartProductPriceTotalPrevious = getTextElementValueById("total-price");
  const calculatedDiscountAmount = getTextElementValueById("discount-price");

  if (cartProductPriceTotalPrevious >= 200 && calculatedDiscountAmount === 0) {
    inputField_Apply_Coupon.readOnly = false;
    btn_CouponApply.disabled = false;
  } else {
    inputField_Apply_Coupon.readOnly = true;
    btn_CouponApply.disabled = true;
  }
}

/* ..........
    Function : Validation : Message : Coupon Apply
.......... */
/* .......... 
    Message for Valid Coupon 
.......... */
function vMsgShow_ValidCouponApply(couponCode, discountPercentage) {
  const vMsg_CouponApply = document.getElementById("vMsg-couponApply");
  vMsg_CouponApply.innerHTML = "";

  const vMsgForCouponApply = document.createElement("p");
  vMsgForCouponApply.classList.add("font-bold", "text-xs", "text-green-400");
  vMsgForCouponApply.innerHTML = `
                                    "${couponCode}" for ${discountPercentage}% is Applied.
                                    <span onclick="couponCodeRemove()" class="text-sm text-red-400 ml-2">
                                        <i class="fa-regular fa-circle-xmark" style="cursor:pointer;"></i>
                                    </span>
                                `;

  vMsg_CouponApply.appendChild(vMsgForCouponApply);
}

/* .......... 
    Message for Invalid Coupon 
.......... */
function vMsgShow_InvalidCouponApply(couponCode) {
  const vMsg_CouponApply = document.getElementById("vMsg-couponApply");
  vMsg_CouponApply.innerHTML = "";

  const vMsgForCouponApply = document.createElement("p");
  vMsgForCouponApply.classList.add("font-bold", "text-xs", "text-red-300");
  vMsgForCouponApply.innerHTML = `
                                    "${couponCode}" is Invalid.
                                `;

  vMsg_CouponApply.appendChild(vMsgForCouponApply);
}
