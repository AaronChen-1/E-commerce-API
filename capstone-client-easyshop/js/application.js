// Phase 4: User Profile
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

// Phase 5: Checkout
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
}

function proceedWithCheckout() {
    ordersService.checkout();
}
