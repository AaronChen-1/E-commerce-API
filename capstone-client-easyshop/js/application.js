function showLoginForm() {
    templateBuilder.build('login-form', {}, 'login');
}

function hideModalForm() {
    templateBuilder.clear('login');
}

function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    userService.login(username, password);
    hideModalForm()
}

function showImageDetailForm(product, imageUrl) {
    const imageDetail = {
        name: product,
        imageUrl: imageUrl
    };
    templateBuilder.build('image-detail', imageDetail, 'login')
}

function loadHome() {
    templateBuilder.build('home', {}, 'main')
    productService.search();
    if (categoryService) {
        categoryService.getAllCategories(loadCategories);
    }
}

function loadCategories(categories) {
    const categorySelect = document.getElementById("category-select");
    const subcategorySelect = document.getElementById("subcategory-select");
    
    if (categorySelect) {
        categorySelect.innerHTML = '<option value="0">Show All</option>';
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category.id;
            option.textContent = category.name;
            categorySelect.appendChild(option);
        });
    }
}

function editProfile() {
    if (!userService.isLoggedIn()) {
        const data = { error: "You must be logged in to view profile" };
        templateBuilder.append("error", data, "errors");
        return;
    }
    profileService.loadProfile();
}

function saveProfile() {
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const phone = document.getElementById("phone").value;
    const email = document.getElementById("email").value;
    const address = document.getElementById("address").value;
    const city = document.getElementById("city").value;
    const state = document.getElementById("state").value;
    const zip = document.getElementById("zip").value;

    const profile = {
        firstName,
        lastName,
        phone,
        email,
        address,
        city,
        state,
        zip
    };

    profileService.updateProfile(profile);
}

function showCart() {
    cartService.loadCartPage();
}

function clearCart() {
    cartService.clearCart();
    cartService.loadCartPage();
}

function proceedToCheckout() {
    if (!userService.isLoggedIn()) {
        const data = { error: "You must be logged in to checkout" };
        templateBuilder.append("error", data, "errors");
        return;
    }

    if (cartService.cart.items.length === 0) {
        const data = { error: "Your cart is empty" };
        templateBuilder.append("error", data, "errors");
        return;
    }

    templateBuilder.build('checkout', {}, 'main');
    
    // Display checkout items after template loads
    setTimeout(() => {
        displayCheckoutItems();
    }, 200);
}


function proceedWithCheckout() {
    console.log("proceedWithCheckout called");
    console.log("Cart items:", cartService.cart.items);

    if (cartService.cart.items.length === 0) {
        const data = { error: "Your cart is empty" };
        templateBuilder.append("error", data, "errors");
        return;
    }

    if (!userService.isLoggedIn()) {
        const data = { error: "You must be logged in to checkout" };
        templateBuilder.append("error", data, "errors");
        return;
    }

    console.log("Starting checkout...");
    ordersService.checkout();
}

function setCategory(control) {
    productService.addCategoryFilter(control.value);
    productService.search();
}

function setSubcategory(control) {
    productService.addSubcategoryFilter(control.value);
    productService.search();
}

function setMinPrice(control) {
    const label = document.getElementById("min-price-display")
    label.innerText = control.value;
    const value = control.value != 0 ? control.value : "";
    productService.addMinPriceFilter(value)
    productService.search();
}

function setMaxPrice(control) {
    const label = document.getElementById("max-price-display")
    label.innerText = control.value;
    const value = control.value != 1500 ? control.value : "";
    productService.addMaxPriceFilter(value)
    productService.search();
}

function closeError(control) {
    setTimeout(() => {
        control.click();
    }, 3000);
}

function displayCheckoutItems() {
    console.log("displayCheckoutItems called");
    console.log("Cart items:", cartService.cart.items);
    
    const container = document.getElementById('checkout-items');
    if (!container) {
        console.error("checkout-items container not found!");
        return;
    }
    
    container.innerHTML = '';
    let calculatedTotal = 0;
    
    if (!cartService.cart.items || cartService.cart.items.length === 0) {
        container.innerHTML = '<p style="color: red; font-size: 16px;">Your cart is empty!</p>';
        document.getElementById('checkout-total').innerText = '0.00';
        return;
    }
    
    cartService.cart.items.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.style.cssText = 'padding: 10px 0; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #eee;';
        
        const itemTotal = item.product.price * item.quantity;
        calculatedTotal += itemTotal;
        
        const productName = item.product.name;
        const quantity = item.quantity;
        const price = item.product.price.toFixed(2);
        const total = itemTotal.toFixed(2);
        
        itemDiv.innerHTML = `
            <div>
                <div style="font-weight: bold; font-size: 16px;">${productName}</div>
                <div style="font-size: 14px; color: #666;">Qty: ${quantity} @ $${price} each</div>
            </div>
            <div style="font-weight: bold; font-size: 16px;">$${total}</div>
        `;
        
        container.appendChild(itemDiv);
    });
    
    console.log("Total calculated:", calculatedTotal.toFixed(2));
    document.getElementById('checkout-total').innerText = calculatedTotal.toFixed(2);
}


document.addEventListener('DOMContentLoaded', () => {
    loadHome();
});
