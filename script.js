class Product {
  constructor(name, price, category) {
    this.name = name;
    this.price = price;
    this.category = category;
  }
}


class ProductManagement{
  
}

const form = document.getElementById("product-form");
const products = [];

async function displayProducts() {
  const productsContainer = document.getElementById("products");
  productsContainer.innerHTML = "";

  products.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("product");
    productDiv.innerHTML = `
        <h3>${product.name.value}</h3>
        <p>${product.price.value}</p>
        <p>${product.category.value}</p>
        `;
    productsContainer.appendChild(productDiv);
  });
}

function addProduct(event) {
  event.preventDefault();

  const nameInput = document.getElementById("name");
  const priceInput = document.getElementById("price");
  const categoryInput = document.getElementById("category");

  const newProduct = new Product(nameInput, priceInput, categoryInput);
  products.push(newProduct);
  displayProducts();

  nameInput.value = "";
  priceInput.value = "";
  categoryInput.selectedIndex = 0;
}

document.addEventListener("DOMContentLoaded", function () {
  displayProducts();
  form.addEventListener("submit", addProduct);
});
