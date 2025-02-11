import { Product } from "../Models/Product.js";

export class ProductManager {
  constructor() {
    this.products = [];
    this.addButton = document.getElementById("add-btn");
    this.cancelButton = document.getElementById("cancel-btn");
    this.h2Heading = document.querySelector("h2");

    this.editingProductIndex = null;

    this.init();
  }

  init() {
    document.addEventListener("DOMContentLoaded", () => {
      this.displayProducts();
      this.addButton.addEventListener(
        "click",
        this.handleProductSubmission.bind(this)
      );
      this.cancelButton.addEventListener("click", this.cancel.bind(this));
    });
  }

  displayProducts() {
    const productsContainer = document.getElementById("products");
    productsContainer.innerHTML = "";

    if (this.products.length === 0) {
      productsContainer.innerHTML = "<p>No saved products</p>";
    } else {
      this.products.forEach((item, index) => {
        const productCard = this.createCard(item, index);
        productsContainer.appendChild(productCard);
      });
    }
  }

  createCard(item, index) {
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
      this.deleteProduct(index);
    });

    productDiv.addEventListener("click", () => {
      this.prepareForEditing(index);
    });

    return productDiv;
  }

  handleProductSubmission(event) {
    event.preventDefault();

    const nameInput = document.getElementById("name");
    const priceInput = document.getElementById("price");
    const categoryInput = document.getElementById("category");

    if (nameInput.value && priceInput.value && categoryInput.value) {
      if (!isNaN(priceInput.value) && priceInput.value > 0) {
        const newProduct = new Product(
          nameInput.value,
          priceInput.value,
          categoryInput.value
        );

        if (this.editingProductIndex !== null) {
          this.products[this.editingProductIndex] = newProduct;
          //alert("Product updated successfully!");
        } else {
          this.products.push(newProduct);
          //alert("Product added successfully!");
        }

        this.displayProducts();
        this.clearFormFields();
        this.resetForm();
      } else {
        alert("Price should be higher than 0");
      }
    } else {
      alert("Name and price cannot be empty.");
    }
  }

  prepareForEditing(index) {
    const product = this.products[index];

    document.getElementById("name").value = product.name;
    document.getElementById("price").value = product.price;
    document.getElementById("category").value = product.category;

    this.h2Heading.textContent = "Update Existing Product";
    this.addButton.textContent = "Update Product";
    this.editingProductIndex = index;
  }

  deleteProduct(index) {
    const userResponse = confirm("Do you really want to delete this product?");
    if (userResponse) {
      this.products.splice(index, 1);
      this.displayProducts();
    }
  }

  clearFormFields() {
    document.getElementById("name").value = "";
    document.getElementById("price").value = "";
    document.getElementById("category").selectedIndex = 0;
  }

  resetForm() {
    this.addButton.textContent = "Add Product";
    this.h2Heading.textContent = "Add New Product";
    this.editingProductIndex = null;
  }

  cancel() {
    this.clearFormFields();
    this.resetForm();
  }
}
