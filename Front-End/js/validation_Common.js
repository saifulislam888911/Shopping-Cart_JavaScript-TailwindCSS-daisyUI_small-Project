console.log("Js File : validation_Common.js");

/* ..........
    On Page Load : 
.......... */
document.addEventListener("DOMContentLoaded", function () {
  update_ButtonState_MakePurchase();
  update_ButtonState_CouponApply();
  //onPageRefresh();
});

/* ..........
    flag : 
.......... */
//let flag;

/* ..........
    Function : Value Reset on Page Load
.......... */
function onPageRefresh() {
  couponApply_flag = 0;

  resetInnerHtmlComponent("cart-entrylist", "");
  resetInnerHtmlComponent("vMsg-couponApply", "");

  resetInnerTextComponent("total-price", "0.00");
  resetInnerTextComponent("discount-price", "0.00");
  resetInnerTextComponent("vat-percent", "");
  resetInnerTextComponent("product-vat", "0.00");
  resetInnerTextComponent("shipping-charge", "0.00");
  resetInnerTextComponent("total", "0.00");

  update_ButtonState_MakePurchase();
  update_ButtonState_CouponApply();
}

/* ..........
    Function : Toast Message
.......... */
function showToast(message, type) {
  const toastContainer = document.getElementById("toast-container");

  const toast = document.createElement("div");
  toast.className = `alert ${getToastTypeClass(type)} shadow-lg`;
  toast.innerHTML = `
      <div>
        <span class="text-white">${message}</span>
      </div>
    `;

  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.classList.add("opacity-0");

    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

function getToastTypeClass(type) {
  switch (type) {
    case "success":
      return "alert-success";
    case "error":
      return "alert-error";
    case "info":
      return "alert-info";
    case "warning":
      return "alert-warning";
    default:
      return "alert-info";
  }
}
