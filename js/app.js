import { fetchProducts } from "./api.js";

let products = [];

async function loadProducts() {
    try {
        products = await fetchProducts();
        console.log("Products loaded:", products);
    } catch (error) {
        console.error("Error loading products:", error);
    }
}

loadProducts();
  
