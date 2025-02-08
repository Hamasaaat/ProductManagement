import { Product } from "../Models/Product.js";


const addButton = document.getElementById("add-btn");
const cancelButton = document.getElementById("cancel-btn");
let updateProductListener;
let products = [];

document.addEventListener("DOMContentLoaded", function () {
  displayProducts();
  addButton.addEventListener("click", addProduct);
  cancelButton.addEventListener("click", cancel);
});

async function displayProducts(productsCollection) {
  const productsContainer = document.getElementById("products");
  productsContainer.innerHTML = "";

  if (!productsCollection) {
    productsContainer.innerHTML = "<p>No saved products</p>";
    return;
  }

  if (productsCollection != null) {
    productsCollection.forEach((item, index) => {
      const productCard = createElement(item, index, productsCollection);
      productsContainer.appendChild(productCard);

      productCard.addEventListener("click", () =>
        prepareForEditing(item, index, productsCollection)
      );
    });
  }
}

function createElement(item, index, productsCollection) {
  const productDiv = document.createElement("div");
  productDiv.classList.add("product");

  const heading = document.createElement("h3");
  heading.textContent = item.name;

  const price = document.createElement("p");
  price.textContent = item.price;

  const category = document.createElement("p");
  category.textContent = item.category;

  const deleteButton = document.createElement("button");
  deleteButton.classList.add("delete-btn");
  deleteButton.textContent = "Delete Product";

  productDiv.appendChild(heading);
  productDiv.appendChild(price);
  productDiv.appendChild(category);
  productDiv.appendChild(deleteButton);

  deleteButton.addEventListener("click", (e) => {
    e.stopPropagation();
    deleteProduct(index, productsCollection);
  });
  return productDiv;
}

function addProduct(event) {
  event.preventDefault();

  const nameInput = document.getElementById("name");
  const priceInput = document.getElementById("price");
  const categoryInput = document.getElementById("category");

  if (nameInput.value && priceInput.value && categoryInput.value) {
    if (!isNaN(priceInput.value) && priceInput.value > 0) {
      try {
        const newProduct = new Product(
          nameInput.value,
          priceInput.value,
          categoryInput.value
        );

        const updatedProducts = [...products, newProduct];
        displayProducts(updatedProducts);
        products = updatedProducts;
        clearFormFields();
      } catch (error) {
        console.error("Error adding product:", error);
        alert("An error occurred while adding the product. Please try again.");
      }
    } else {
      alert("Price should be higher than 0");
    }
  } else {
    alert("name and price cannot be empty.");
  }
}

function prepareForEditing(product, index, products) {
  document.getElementById("name").value = product.name;
  document.getElementById("price").value = product.price;
  document.getElementById("category").value = product.category;

  const h2Heading = document.querySelector("h2");
  h2Heading.textContent = "Update Existing Product";
  addButton.removeEventListener("click", addProduct);

  addButton.textContent = "Update Product";
  updateProductListener = () => updateProduct(index, products);
  addButton.addEventListener("click", updateProductListener);
  addButton.updateProductListener = updateProductListener;
}

function updateProduct(index, productsList) {
  const nameInput = document.getElementById("name").value.trim();
  const priceInput = document.getElementById("price").value.trim();
  const categoryInput = document.getElementById("category").value;

  if (!nameInput || !priceInput || !categoryInput) {
    alert("Please, fill all the fields");
    return;
  }

  if (priceInput === "" || isNaN(priceInput) || parseFloat(priceInput) <= 0) {
    alert("Product price must be higher than zero");
    return;
  }


  const updatedProduct = new Product(nameInput, priceInput, categoryInput);

  const updatedProducts = [
    ...productsList.slice(0, index),
    updatedProduct,
    ...productsList.slice(index + 1),
  ];

  displayProducts(updatedProducts);
  products = updatedProducts;
  clearFormFields();

  addButton.removeEventListener("click", updateProductListener);
  addButton.textContent = "Add Product";

  const h2Heading = document.querySelector("h2");
  h2Heading.textContent = "Add New Product";
  addButton.addEventListener("click", addProduct);
}

function deleteProduct(index, productsCollection) {
  const userResponse = confirm("Do you really want to delete this product?");
  if (userResponse) {
    productsCollection.splice(index, 1);
    displayProducts(productsCollection);
    products = productsCollection;
  }
  clearFormFields();
}

function clearFormFields() {
  document.getElementById("name").value = "";
  document.getElementById("price").value = "";
  document.getElementById("category").selectedIndex = 0;
}

function cancel() {
  clearFormFields();
  if (addButton.textContent === "Update Product") {
    addButton.removeEventListener("click", updateProductListener);
    addButton.textContent = "Add Product";
    const h2Heading = document.querySelector("h2");
    h2Heading.textContent = "Add New Product";

    addButton.addEventListener("click", addProduct);
  }
  displayProducts(products);
}
