// 🧾 Menu Items Array
const menuItems = [
  { id:1, name:"Jollof Rice", description:"Spicy tomato rice with chicken", price:3500,image:"https://raw.githubusercontent.com/fave402/Food-Menu/refs/heads/main/food-images/jollof%20rice.jfif" },
  { id:2, name:"Egusi Soup", description:"Melon seed soup with pounded yam", price:2000, image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTs0XDU8dYnut_27d_C-IG_VenZoKrSQ4Is3A&s" },
  { id:3, name:"Suya", description:"Grilled spicy beef skewers", price:1200, image:"https://raw.githubusercontent.com/fave402/Food-Menu/refs/heads/main/food-images/Suya.jfif" },
  { id:4, name:"Akpu", description:"Cassava dough served with soup", price:1000, image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4yQm0SjYUqmDjZqvMDh1JLTgtr4HowqWarQ&s" },
  { id:5, name:"Isi Ewu", description:"Goat head delicacy cooked in spicy palm oil sauce, richly seasoned and garnished with utazi leaves.", price:4000, image:"https://raw.githubusercontent.com/fave402/Food-Menu/refs/heads/main/food-images/Isi%20Ewu.jfif" },
  { id:6, name:"Pepper Soup", description:"A spicy and aromatic soup made with assorted meats, fish, and spices.", price:1800, image:"https://raw.githubusercontent.com/fave402/Food-Menu/refs/heads/main/food-images/Assorted%20meat%20pepper%20soup.jfif" },
  { id:7, name:"Abacha", description:"African salad made from fermented African oil bean, served with onions, pepper, and palm oil.", price:1500, image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgOuj8274xUAAneUrLoz_VJ3CPKgEKQrBRAg&s" },
];


// Cart state
let cart = [];

// Render menu cards dynamically
function renderMenu(){
  const menu = document.getElementById('menu');
  menuItems.forEach(item => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <h3>${item.name}</h3>
      <p>${item.description}</p>
      <div>₦${item.price}</div>
      <button data-id="${item.id}">Add to Plate</button>`;
    menu.appendChild(card);
  });
}

// Update cart UI and total
function updateCart(){
  const list = document.getElementById('cart-items');
  const totalEl = document.getElementById('total');
  list.innerHTML = '';
  let total = 0;
  cart.forEach(ci => {
    const li = document.createElement('li');
    li.textContent = `${ci.name} – ₦${ci.price}`;
    list.appendChild(li);
    total += ci.price;
  });
  totalEl.textContent = total;
}



// Event Listeners
function setupListeners(){
  // Add buttons
  document.querySelectorAll('.card button').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = Number(btn.dataset.id);
      const item = menuItems.find(i => i.id === id);
      cart.push(item);
      updateCart();
    });
  });

  // Submit order
  document.getElementById('submit-btn').addEventListener('click', () => {
    if (cart.length === 0){
      alert('Please add at least one item before submitting.');
      return;
    }
    document.getElementById('success-modal').classList.remove('hidden');
  });

  document.getElementById('modal-close').addEventListener('click', () => {
    document.getElementById('success-modal').classList.add('hidden');
  });



// Print
document.getElementById('print-btn').addEventListener('click', () => {
  // Create printable cart content
  let printContent = '<h2>Your Plate</h2><ul>';
  cart.forEach(ci => {
    printContent += `<li>${ci.name} – ₦${ci.price}</li>`;
  });
  printContent += '</ul>';
  printContent += `<div><strong>Total: ₦${cart.reduce((sum, ci) => sum + ci.price, 0)}</strong></div>`;

  // Save original page
  const originalContents = document.body.innerHTML;
  // Replace with cart content
  document.body.innerHTML = printContent;
  window.print();
  // Restore original page
  document.body.innerHTML = originalContents;
  // Optionally, reload to restore event listeners
  location.reload();
});
}

// Clear cart button
document.getElementById('clear-cart-btn').addEventListener('click', () => {
  cart = [];
  updateCart();
});

// Initialize app
function initApp(){
  renderMenu();
  setupListeners();
}



// filepath: c:\Users\PC\Desktop\Food Menu Psuedo App\file.js
document.addEventListener('DOMContentLoaded', () => {
  renderMenu();
  setupListeners();
  updateCart();
});