import { fetchProducts } from "./api.js";
import {
    savePreferences,
    getPreferences
} from "./storage.js";

let products = [];
let filteredProducts = [];

const main = document.querySelector("main");


/* ================================================
   PRODUCT SECTION
   ================================================ */

const productSection =
    document.createElement("section");

productSection.setAttribute(
    "aria-labelledby",
    "products-heading"
);

productSection.innerHTML = `
    <h2 id="products-heading">
        Products
    </h2>

    <div class="product-controls">

        <div>
            <label for="productSearch">
                Search products
            </label>

            <input
                type="search"
                id="productSearch"
                placeholder="Search products..."
                autocomplete="off"
            >
        </div>

        <div>
            <label for="categoryFilter">
                Filter by category
            </label>

            <select id="categoryFilter">
                <option value="all">
                    All Categories
                </option>
            </select>
        </div>

        <div>
            <label for="sortProducts">
                Sort products
            </label>

            <select id="sortProducts">

                <option value="default">
                    Default
                </option>

                <option value="price-low">
                    Price: Low to High
                </option>

                <option value="price-high">
                    Price: High to Low
                </option>

                <option value="name-az">
                    Name: A to Z
                </option>

                <option value="name-za">
                    Name: Z to A
                </option>

            </select>
        </div>

    </div>

    <div
        id="productStatus"
        role="status"
        aria-live="polite">
    </div>

    <div id="productList"></div>
`;

main.appendChild(productSection);


/* ================================================
   ELEMENTS
   ================================================ */

const productList =
    document.getElementById("productList");

const searchInput =
    document.getElementById("productSearch");

const categoryFilter =
    document.getElementById("categoryFilter");

const sortProducts =
    document.getElementById("sortProducts");

const productStatus =
    document.getElementById("productStatus");


/* ================================================
   DISPLAY PRODUCTS
   ================================================ */

function displayProducts(productsToDisplay) {

    productList.innerHTML = "";

    productStatus.textContent =
        `${productsToDisplay.length} product(s) found`;

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

        article.className = "product-card";

        article.innerHTML = `
            <h3>${product.title}</h3>

            <p>
                <strong>Price:</strong>
                $${product.price}
            </p>

            <p>
                <strong>Category:</strong>
                ${product.category}
            </p>

            <p>
                <strong>Rating:</strong>
                ${product.rating.rate}/5
            </p>
        `;

        productList.appendChild(article);
    });
}


/* ================================================
   POPULATE CATEGORIES
   ================================================ */

function populateCategories() {

    const categories = [
        ...new Set(
            products.map(
                (product) => product.category
            )
        )
    ];

    categories.forEach((category) => {

        const option =
            document.createElement("option");

        option.value = category;
        option.textContent = category;

        categoryFilter.appendChild(option);
    });
}


/* ================================================
   FILTER + SEARCH + SORT
   ================================================ */

function updateProducts() {

    const searchTerm =
        searchInput.value
            .toLowerCase()
            .trim();

    const selectedCategory =
        categoryFilter.value;

    const selectedSort =
        sortProducts.value;


    filteredProducts =
        products.filter((product) => {

            const matchesSearch =
                product.title
                    .toLowerCase()
                    .includes(searchTerm);

            const matchesCategory =
                selectedCategory === "all" ||
                product.category === selectedCategory;

            return (
                matchesSearch &&
                matchesCategory
            );
        });


    /* ============================================
       SORTING
       ============================================ */

    if (selectedSort === "price-low") {

        filteredProducts.sort(
            (a, b) => a.price - b.price
        );

    } else if (selectedSort === "price-high") {

        filteredProducts.sort(
            (a, b) => b.price - a.price
        );

    } else if (selectedSort === "name-az") {

        filteredProducts.sort(
            (a, b) =>
                a.title.localeCompare(b.title)
        );

    } else if (selectedSort === "name-za") {

        filteredProducts.sort(
            (a, b) =>
                b.title.localeCompare(a.title)
        );
    }


    /* ============================================
       SAVE STATE
       ============================================ */

    savePreferences({
        search: searchInput.value,
        category: selectedCategory,
        sort: selectedSort
    });


    displayProducts(filteredProducts);
}


/* ================================================
   LOAD PRODUCTS FROM API
   ================================================ */

async function loadProducts() {

    productList.innerHTML = `
        <p role="status">
            Loading products...
        </p>
    `;

    try {

        products = await fetchProducts();

        populateCategories();


        /* ========================================
           RESTORE SAVED STATE
           ======================================== */

        const preferences =
            getPreferences();

        searchInput.value =
            preferences.search || "";

        const categoryExists =
            [...categoryFilter.options].some(
                (option) =>
                    option.value ===
                    preferences.category
            );

        if (categoryExists) {

            categoryFilter.value =
                preferences.category;

        } else {

            categoryFilter.value = "all";
        }


        sortProducts.value =
            preferences.sort || "default";


        updateProducts();

    } catch (error) {

        productList.innerHTML = `
            <div role="alert">

                <p>
                    Unable to load products.
                    Please try again later.
                </p>

                <button
                    type="button"
                    id="retryButton">
                    Retry
                </button>

            </div>
        `;

        productStatus.textContent =
            "There was an error loading products.";

        console.error(
            "Error loading products:",
            error
        );


        const retryButton =
            document.getElementById("retryButton");

        retryButton.addEventListener(
            "click",
            loadProducts
        );
    }
}


/* ================================================
   SEARCH
   ================================================ */

searchInput.addEventListener(
    "input",
    updateProducts
);


/* ================================================
   CATEGORY FILTER
   ================================================ */

categoryFilter.addEventListener(
    "change",
    updateProducts
);


/* ================================================
   SORT
   ================================================ */

sortProducts.addEventListener(
    "change",
    updateProducts
);


/* ================================================
   START APPLICATION
   ================================================ */

loadProducts();
