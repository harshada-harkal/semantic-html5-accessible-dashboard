import { fetchProducts } from "./api.js";

let products = [];

const main = document.querySelector("main");

const productSection = document.createElement("section");
productSection.setAttribute("aria-labelledby", "products-heading");

productSection.innerHTML = `
    <h2 id="products-heading">Products</h2>
    <div id="productList"></div>
`;

main.appendChild(productSection);

const productList = document.getElementById("productList");

async function loadProducts() {
    productList.innerHTML = "<p>Loading products...</p>";

    try {
        products = await fetchProducts();

        productList.innerHTML = "";

        products.forEach((product) => {
            const article = document.createElement("article");

            article.innerHTML = `
                <h3>${product.title}</h3>
                <p>Price: $${product.price}</p>
                <p>Category: ${product.category}</p>
            `;

            productList.appendChild(article);
        });

    } catch (error) {
        productList.innerHTML = `
            <p role="alert">
                Unable to load products. Please try again later.
            </p>
        `;

        console.error(error);
    }
}

loadProducts();
  
