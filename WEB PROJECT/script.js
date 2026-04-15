// =====================
// PERFECT CART + ATTRACTIVE NOTIFICATION
// =====================

let cart = JSON.parse(localStorage.getItem("cart")) || [];

// =====================
// SAVE CART
// =====================
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// =====================
// UPDATE CART COUNT
// =====================
function updateCartCount() {
  const cartCount = document.getElementById("cartCount");
  if (!cartCount) return;
  cartCount.innerText = cart.length;
}

// =====================
// GOLDEN STYLISH NOTIFICATION (PEHLE WALA COLOR) ✅
function showNotification(message, image = '') {
  const notification = document.createElement('div');
  notification.style.cssText = `
    position: fixed;
    top: 20px; right: 20px;
    background: linear-gradient(135deg, #d4af37, #f4b400, #daa520);
    padding: 10px 16px;
    border-radius: 14px;
    font-size: 13px; font-weight: 600;
    z-index: 10001;
    box-shadow: 
      0 6px 20px rgba(212,175,55,0.5),
      0 2px 8px rgba(0,0,0,0.1);
    min-width: 160px; max-width: 220px;
    display: flex; align-items: center; gap: 10px;
    color: #1a1a1a;
    border: 1px solid rgba(255,255,255,0.3);
  `;

  notification.innerHTML = `
    ${image ? `<img src="${image}" style="width:32px;height:32px;border-radius:6px;box-shadow:0 2px 8px rgba(0,0,0,0.2);">` : '🛒'}
    <span style="text-shadow:0 1px 1px rgba(0,0,0,0.1);">${message}</span>
  `;
  
  document.body.appendChild(notification);
  setTimeout(() => notification.remove(), 2600);
}

// =====================
// ADD TO CART (NO AUTO OPEN)
// =====================
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".add-to-cart-btn").forEach(button => {
    button.addEventListener("click", function () {
      const name = this.getAttribute("data-name") || "Product";
      const price = parseInt(this.getAttribute("data-price")) || 0;
      const image = this.getAttribute("data-image") || '';

      let existing = cart.find(item => item.name === name);

      if (existing) {
        existing.qty++;
        showNotification(`${name} +1`, image);
      } else {
        cart.push({
          name: name,
          price: price,
          image: image,
          qty: 1
        });
        showNotification(`${name} added!`, image);
      }

      saveCart();
      updateCartCount();
      renderCart();
      // NO AUTO CART OPEN ✅
    });
  });

  updateCartCount();
  renderCart();
});

// =====================
// RENDER CART (ORIGINAL)
function renderCart() {
  const cartItems = document.getElementById("cartItems");
  const cartTotal = document.getElementById("cartTotal");

  if (!cartItems) return;

  cartItems.innerHTML = "";

  if (cart.length === 0) {
    cartItems.innerHTML = `<p class="cart-empty">Cart is empty</p>`;
    cartTotal.innerText = "Rs. 0";
    return;
  }

  let total = 0;

  cart.forEach((item, index) => {
    total += item.price * item.qty;

    cartItems.innerHTML += `
      <div class="cart-item">
        <div class="cart-left">
          <img src="${item.image}" class="cart-img">
          <div>
            <strong>${item.name}</strong><br>
            Rs. ${item.price} x ${item.qty}
          </div>
        </div>
        <div class="cart-right">
          <button onclick="changeQty(${index}, -1)">-</button>
          <span class="qty">${item.qty}</span>
          <button onclick="changeQty(${index}, 1)">+</button>
          <button onclick="removeItem(${index})">✖</button>
        </div>
      </div>
    `;
  });

  cartTotal.innerText = "Rs. " + total;
  updateCartCount();
}

// =====================
// CART FUNCTIONS (ORIGINAL)
function changeQty(index, change) {
  cart[index].qty += change;
  if (cart[index].qty <= 0) cart.splice(index, 1);
  saveCart();
  updateCartCount();
  renderCart();
}

function removeItem(index) {
  cart.splice(index, 1);
  saveCart();
  updateCartCount();
  renderCart();
}

// =====================
// CART OPEN/CLOSE
function openCart() {
  const cartDrawer = document.getElementById("cartDrawer");
  const cartOverlay = document.getElementById("cartOverlay");
  if (!cartDrawer || !cartOverlay) return;
  cartDrawer.classList.add("open");
  cartOverlay.classList.add("active");
  renderCart();
}

function closeCart() {
  const cartDrawer = document.getElementById("cartDrawer");
  const cartOverlay = document.getElementById("cartOverlay");
  if (!cartDrawer || !cartOverlay) return;
  cartDrawer.classList.remove("open");
  cartOverlay.classList.remove("active");
}

const cartOverlay = document.getElementById("cartOverlay");
const closeBtn = document.getElementById("closeCart");

if (cartOverlay) cartOverlay.addEventListener("click", closeCart);
if (closeBtn) closeBtn.addEventListener("click", closeCart);

// =====================
// INIT
function goToCheckout() {
  window.location.href = "checkout.html";
}
renderCart();
updateCartCount();