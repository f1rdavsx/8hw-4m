const form = document.getElementById('productForm');
const productsContainer = document.getElementById('products');

async function loadProducts() {
  productsContainer.innerHTML = '';
  try {
    const res = await fetch('http://localhost:8000/products');
    const products = await res.json();

    products.forEach(product => {
      const div = document.createElement('div');
      div.classList.add('product');
      div.innerHTML = `
        <img src="${product.image}" alt="${product.title}">
        <h3>${product.title}</h3>
        <p>${product.description}</p>
        <strong>${product.price} ₽</strong>
        <button class="delete-btn" data-id="${product.id}">Удалить</button>
      `;
      productsContainer.appendChild(div);
    });
  } catch (error) {
    console.error('Ошибка  :', error);
  }
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(form);

  try {
    await fetch('http://localhost:8000/products', {
      method: 'POST',
      body: formData
    });

    form.reset();
    loadProducts();
  } catch (error) {
    console.error('Ошибка :', error);
  }
});

productsContainer.addEventListener('click', async (e) => {
  if (e.target.classList.contains('delete-btn')) {
    const id = e.target.getAttribute('data-id');

    try {
      await fetch(`http://localhost:8000/products/${id}`, {
        method: 'DELETE'
      });

      e.target.parentElement.remove();
    } catch (error) {
      console.error('Ошибка :', error);
    }
  }
});

loadProducts();
