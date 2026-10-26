
document.addEventListener("DOMContentLoaded", function () {

    // ========== MOBILE NAVIGATION ==========
    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");

    menuToggle.addEventListener("click", function () {
        const isOpen = navLinks.classList.toggle("open");

        menuToggle.setAttribute("aria-expanded", isOpen);
        menuToggle.textContent = isOpen ? "✕" : "☰";
    });

    // Close mobile menu after clicking a link
    navLinks.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", function () {
            navLinks.classList.remove("open");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.textContent = "☰";
        });
    });


    // ========== BOOK SEARCH AND FILTER ==========
    const searchInput = document.getElementById("bookSearch");
    const categoryFilter = document.getElementById("categoryFilter");
    const categoryButtons = document.querySelectorAll(".category-card");
    const bookCards = document.querySelectorAll(".book-card");
    const resultsMessage = document.getElementById("resultsMessage");
    const emptyMessage = document.getElementById("emptyMessage");

    let selectedCategory = "All";

    function filterBooks() {
        const searchText = searchInput.value.trim().toLowerCase();
        const dropdownCategory = categoryFilter.value;

        // A selected category button takes priority over "All"
        const activeCategory = selectedCategory !== "All"
            ? selectedCategory
            : dropdownCategory;

        let visibleBooks = 0;

        bookCards.forEach(function (card) {
            const name = card.dataset.name.toLowerCase();
            const author = card.dataset.author.toLowerCase();
            const category = card.dataset.category;

            const matchesSearch =
                name.includes(searchText) ||
                author.includes(searchText);

            const matchesCategory =
                activeCategory === "All" ||
                category === activeCategory;

            const shouldShow = matchesSearch && matchesCategory;

            card.hidden = !shouldShow;

            if (shouldShow) {
                visibleBooks++;
            }
        });

        resultsMessage.textContent =
            visibleBooks + (visibleBooks === 1
                ? " book found"
                : " books found");

        emptyMessage.hidden = visibleBooks !== 0;
    }

    searchInput.addEventListener("input", filterBooks);

    categoryFilter.addEventListener("change", function () {
        selectedCategory = "All";

        categoryButtons.forEach(function (button) {
            button.classList.remove("active");
        });

        filterBooks();
    });

    categoryButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            const category = button.dataset.category;

            // Click the same category again to show all books
            selectedCategory =
                selectedCategory === category ? "All" : category;

            categoryButtons.forEach(function (item) {
                item.classList.toggle(
                    "active",
                    item.dataset.category === selectedCategory
                );
            });

            categoryFilter.value = selectedCategory;
            filterBooks();

            document.getElementById("books").scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        });
    });

    // Show the initial book count
    filterBooks();


    // ========== SHOPPING CART DEMO ==========
    const cartCount = document.getElementById("cartCount");
    const addButtons = document.querySelectorAll(".add-cart");
    const toast = document.getElementById("toast");

    let cartTotal = 0;
    let toastTimer;

    function showToast(message) {
        toast.textContent = message;
        toast.classList.add("show");

        clearTimeout(toastTimer);

        toastTimer = setTimeout(function () {
            toast.classList.remove("show");
        }, 2500);
    }

    addButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            const card = button.closest(".book-card");
            const bookName = card.dataset.name;

            cartTotal++;
            cartCount.textContent = cartTotal;

            showToast('"' + bookName + '" added to your cart!');

            // Brief button feedback
            const originalText = button.textContent;

            button.textContent = "✓ Added";
            button.disabled = true;

            setTimeout(function () {
                button.textContent = originalText;
                button.disabled = false;
            }, 800);
        });
    });


    // ========== NEWSLETTER FORM ==========
    const newsletterForm = document.getElementById("newsletterForm");
    const emailInput = document.getElementById("emailInput");
    const newsletterMessage =
        document.getElementById("newsletterMessage");

    newsletterForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const email = emailInput.value.trim();

        if (!email || !emailInput.checkValidity()) {
            newsletterMessage.textContent =
                "Please enter a valid email address.";

            newsletterMessage.style.color = "#a33b2d";
            emailInput.focus();
            return;
        }

        newsletterMessage.textContent =
            "Thank you for your interest! This is a demo subscription.";

        newsletterMessage.style.color = "#52754a";

        newsletterForm.reset();
    });


    // ========== AUTOMATIC COPYRIGHT YEAR ==========
    document.getElementById("currentYear").textContent =
        new Date().getFullYear();

});
