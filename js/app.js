import { fetchProducts } from "./api.js";

let products = [];

const main = document.querySelector("main");

const productSection = document.createElement("section");

productSection.setAttribute(
    "aria-labelledby",
    "products-heading"
);

productSection.innerHTML = `
    <h2 id="products-heading">Products</h2>

    <label for="productSearch">
        Search products
    </label>

    <input
        type="search"
        id="productSearch"
        placeholder="Search products..."
        aria-label="Search products"
    >

    <div id="productList"></div>
`;

main.appendChild(productSection);

const productList =
    document.getElementById("productList");

const searchInput =
    document.getElementById("productSearch");


/* ================================================
   DISPLAY PRODUCTS
   ================================================ */

function displayProducts(productsToDisplay) {

    productList.innerHTML = "";

    if (productsToDisplay.length === 0) {

        productList.innerHTML = `
            <p role="status">
                No products found.
            </p>
        `;

        return;
    }

    productsToDisplay.forEach((product) => {

        const article =
            document.createElement("article");

        article.innerHTML = `
            <h3>${product.title}</h3>

            <p>
                Price: $${product.price}
            </p>

            <p>
                Category: ${product.category}
            </p>
        `;

        productList.appendChild(article);
    });
}


/* ================================================
   LOAD PRODUCTS FROM REST API
   ================================================ */

async function loadProducts() {

    productList.innerHTML = `
        <p role="status">
            Loading products...
        </p>
    `;

    try {

        products = await fetchProducts();

        displayProducts(products);

    } catch (error) {

        productList.innerHTML = `
            <p role="alert">
                Unable to load products.
                Please try again later.
            </p>
        `;

        console.error(
            "Error loading products:",
            error
        );
    }
}


/* ================================================
   SEARCH FILTER
   ================================================ */

searchInput.addEventListener(
    "input",
    function () {

        const searchTerm =
            searchInput.value
                .toLowerCase()
                .trim();

        const filteredProducts =
            products.filter((product) =>
                product.title
                    .toLowerCase()
                    .includes(searchTerm)
            );

        displayProducts(filteredProducts);
    }
);


/* ================================================
   INITIAL LOAD
   ================================================ */

loadProducts();
