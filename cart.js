function loadCart() {
      const cartItemsEl = document.getElementById('cart-items');
      const subtotalEl = document.getElementById('subtotal');
      let cart = JSON.parse(localStorage.getItem("cart")) || [];

      if (cart.length === 0) {
        cartItemsEl.innerHTML = "<p>Your cart is empty.</p>";
        subtotalEl.innerHTML = "";
        document.getElementById('checkoutBtn').style.display = 'none';
        return;
      }

      let total = 0;
      cartItemsEl.innerHTML = cart.map((item, index) => {
        total += item.price;
        return `
          <div class="cart-item">
            <div>
              <h3>${item.name}</h3>
              <p>${item.description}</p>
              <div class="price">$${item.price.toFixed(2)}</div>
            </div>
            <button onclick="removeFromCart(${index})">Remove</button>
          </div>
        `;
      }).join('');

      subtotalEl.innerHTML = `<strong>Subtotal:</strong> $${total.toFixed(2)}`;
      document.getElementById('checkoutBtn').style.display = 'inline-block';
    }

    function removeFromCart(index) {
      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      cart.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(cart));
      loadCart();
    }

    document.getElementById('checkoutBtn').addEventListener('click', () => {
      window.location.href = 'checkout.html';
    });

    loadCart();