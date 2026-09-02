const form = document.querySelector("form");

if (form) {
    form.addEventListener("submit", function (event) {
        if (!form.checkValidity()) {
            event.preventDefault();
            alert("Please complete all required fields.");
        }
    });
}
