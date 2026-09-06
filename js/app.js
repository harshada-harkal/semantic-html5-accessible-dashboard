// app.js
// Dynamic DOM, search, filtering, sorting and localStorage

let allUsers = [];
let currentRole = "All";

const tableBody = document.querySelector("table tbody");

// Create controls above the table
const userSection = tableBody.closest("section");

const controls = document.createElement("div");
controls.className = "user-controls";

controls.innerHTML = `
    <label for="userSearch">Search users:</label>
    <input
        type="search"
        id="userSearch"
        placeholder="Search by name or email"
        aria-label="Search users"
    >

    <label for="roleFilter">Filter by role:</label>
    <select id="roleFilter">
        <option value="All">All</option>
        <option value="Admin">Admin</option>
        <option value="User">User</option>
    </select>

    <label for="sortUsers">Sort:</label>
    <select id="sortUsers">
        <option value="none">Default</option>
        <option value="asc">Name A-Z</option>
        <option value="desc">Name Z-A</option>
    </select>
`;

userSection.insertBefore(controls, userSection.querySelector(".table-container"));

// Loading message
const loadingMessage = document.createElement("p");
loadingMessage.id = "loadingMessage";
loadingMessage.textContent = "Loading users...";
userSection.insertBefore(loadingMessage, controls);

// Error message
const errorMessage = document.createElement("p");
errorMessage.id = "errorMessage";
errorMessage.setAttribute("role", "alert");
errorMessage.hidden = true;
userSection.insertBefore(errorMessage, controls);

// Render users
function renderUsers(users) {
    tableBody.innerHTML = "";

    if (users.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="3">No users found.</td>
            </tr>
        `;
        return;
    }

    users.forEach(user => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.role}</td>
        `;

        tableBody.appendChild(row);
    });
}

// Apply search, filter and sorting
function updateUsers() {
    const searchText =
        document.getElementById("userSearch").value.toLowerCase();

    let filteredUsers = allUsers.filter(user => {
        const matchesSearch =
            user.name.toLowerCase().includes(searchText) ||
            user.email.toLowerCase().includes(searchText);

        const matchesRole =
            currentRole === "All" || user.role === currentRole;

        return matchesSearch && matchesRole;
    });

    const sortValue = document.getElementById("sortUsers").value;

    if (sortValue === "asc") {
        filteredUsers.sort((a, b) =>
            a.name.localeCompare(b.name)
        );
    }

    if (sortValue === "desc") {
        filteredUsers.sort((a, b) =>
            b.name.localeCompare(a.name)
        );
    }

    renderUsers(filteredUsers);
}

// Load API data
async function loadUsers() {
    try {
        loadingMessage.hidden = false;
        errorMessage.hidden = true;

        const users = await fetchUsers();

        allUsers = users.map(user => ({
            ...user,
            role: user.id % 2 === 0 ? "Admin" : "User"
        }));

        renderUsers(allUsers);

        // Save users to localStorage
        localStorage.setItem("dashboardUsers", JSON.stringify(allUsers));

    } catch (error) {
        console.error(error);

        errorMessage.textContent =
            "Unable to load users. Please try again later.";
        errorMessage.hidden = false;

        // Try cached data
        const cachedUsers =
            localStorage.getItem("dashboardUsers");

        if (cachedUsers) {
            allUsers = JSON.parse(cachedUsers);
            renderUsers(allUsers);
        }
    } finally {
        loadingMessage.hidden = true;
    }
}

// Search event
document
    .getElementById("userSearch")
    .addEventListener("input", updateUsers);

// Filter event
document
    .getElementById("roleFilter")
    .addEventListener("change", function () {
        currentRole = this.value;
        updateUsers();
    });

// Sort event
document
    .getElementById("sortUsers")
    .addEventListener("change", updateUsers);

// Load data when page starts
loadUsers();
