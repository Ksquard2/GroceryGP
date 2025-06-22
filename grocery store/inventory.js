const inventory = [
    { id: 10114, name: "Tomato", type: "Vegetable", price: 2.99 },
    { id: 10506, name: "Beef", type: "Protein", price: 8.99 },
    { id: 109223, name: "Pasta", type: "Carbohydrates", price: 5.14 },
    { id: 109224, name: "Broccoli", type: "Vegetable", price: 3.49 },
    { id: 109225, name: "Chicken", type: "Protein", price: 7.75 }
  ];
  
  const cart = {};
  
  function renderInventory() {
    const container = document.getElementById("inventory");
    const grouped = { Vegetable: [], Protein: [], Carbohydrates: [] };
  
    inventory.forEach(item => grouped[item.type].push(item));
  
    for (const [type, items] of Object.entries(grouped)) {
      const section = document.createElement("div");
      section.className = "category-section";
      const heading = document.createElement("h2");
      heading.textContent = type;
      section.appendChild(heading);
  
      items.forEach(item => {
        const card = document.createElement("div");
        card.className = "item-card";
        card.innerHTML = `
          <p><strong>${item.name}</strong></p>
          <p>$${item.price.toFixed(2)}</p>
          <button onclick="addToCart(${item.id})">Add to Cart</button>
        `;
        section.appendChild(card);
      });
  
      container.appendChild(section);
    }
  }
  
  function addToCart(id) {
    const item = inventory.find(i => i.id === id);
    if (!cart[id]) cart[id] = { ...item, qty: 0 };
    cart[id].qty++;
    renderCart();
  }
  
  function removeFromCart(id) {
    if (cart[id]) {
      cart[id].qty--;
      if (cart[id].qty <= 0) delete cart[id];
      renderCart();
    }
  }
  
  function renderCart() {
    const tbody = document.getElementById("cartBody");
    tbody.innerHTML = "";
    let subtotal = 0;
  
    for (const item of Object.values(cart)) {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${item.name}</td>
        <td>${item.qty}</td>
        <td>$${(item.price * item.qty).toFixed(2)}</td>
        <td><button onclick="removeFromCart(${item.id})">Remove</button></td>
      `;
      tbody.appendChild(row);
      subtotal += item.price * item.qty;
    }
  
    document.getElementById("subtotal").textContent = subtotal.toFixed(2);
  }
  
  renderInventory();
  