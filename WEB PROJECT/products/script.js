document.addEventListener("DOMContentLoaded", function () {

  let qty = 1;
  const price = 6000;
  const productName = "Maaz Safder Signature 65ml";

  const qtyText = document.getElementById("qty");
  const msgBox = document.getElementById("msg");
  const addToCartBtn = document.getElementById("addToCart");
  const orderBtn = document.getElementById("orderNow");

  // PLUS
  document.getElementById("plus").onclick = () => {
    qty++;
    qtyText.innerText = qty;
  };

  // MINUS
  document.getElementById("minus").onclick = () => {
    if (qty > 1) {
      qty--;
      qtyText.innerText = qty;
    }
  };

  // ✅ ADD TO CART
  addToCartBtn.onclick = () => {
    const total = qty * price;

    msgBox.innerText =
      `Added ${qty} item(s) – Total Rs. ${total.toLocaleString()} ✅`;
  };

  // ✅ ORDER NOW (SAME QTY & TOTAL)
  orderBtn.onclick = () => {
    const total = qty * price;

    const whatsappMsg =
      `Order Details:\n` +
      `Product: ${productName}\n` +
      `Quantity: ${qty}\n` +
      `Price per item: Rs.${price}\n` +
      `Total Amount: Rs.${total}`;

    orderBtn.href =
      "https://wa.me/923323989474?text=" +
      encodeURIComponent(whatsappMsg);
  };

});
