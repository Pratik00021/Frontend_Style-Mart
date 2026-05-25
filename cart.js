let cart = JSON.parse(localStorage.getItem("cart")) || [];

/* ================= RENDER CART ================= */

function renderCart(){

  console.log("Cart Data:", cart); // 🔥 DEBUG

  const div = document.getElementById("cartItems");
  const totalDiv = document.getElementById("cartTotal");

  if(!div){
    alert("cartItems not found ❌");
    return;
  }

  if(cart.length === 0){
    div.innerHTML = "<h3>Your cart is empty</h3>";
    totalDiv.innerText = "0";
    return;
  }

  let html = "";
  let total = 0;

  cart.forEach(item => {

    total += (item.price || 0) * (item.qty || 1);

    html += `
      <div style="
        display:flex;
        gap:15px;
        border-bottom:1px solid #ccc;
        padding:15px;
      ">

        <!-- IMAGE -->
        <img src="${item.image || 'https://via.placeholder.com/120'}"
             style="width:120px;height:120px;object-fit:cover;">

        <!-- DETAILS -->
        <div>
          <h3>${item.name || "Product"}</h3>
          <p>₹${item.price || 0}</p>
          <p>Qty: ${item.qty || 1}</p>

          <button onclick="removeItem(${item.id})"
            style="color:red;border:none;background:none;cursor:pointer;">
            REMOVE
          </button>
        </div>

      </div>
    `;
  });

  div.innerHTML = html;
  totalDiv.innerText = total;
}

/* ================= REMOVE ================= */

function removeItem(id){

  cart = cart.filter(item => item.id !== id);

  localStorage.setItem("cart", JSON.stringify(cart));

  renderCart();
}


/* ================= PLACE ORDER ================= */

function placeOrder(){

  if(cart.length === 0){
    alert("Cart is empty");
    return;
  }

  alert("Order placed successfully ✅");

  // clear cart
  cart = [];
  localStorage.removeItem("cart");

  // reload cart UI
  renderCart();
}

/* ================= LOAD ================= */

window.onload = function(){
  renderCart();
};