let ordersService;

class OrdersService {
    
    currentOrder = {};
    
    checkout() {
        const url = `${config.baseUrl}/orders`;
        
        console.log("Starting checkout...");
        
        axios.post(url, {})
            .then(response => {
                console.log("Checkout success:", response.data);
                this.currentOrder = response.data;
                this.displayOrderConfirmation();
                
                cartService.cart = {
                    items: [],
                    total: 0
                };
                cartService.updateCartDisplay();
            })
            .catch(error => {
                console.error("Checkout failed:", error);
                
                let errorMsg = "Checkout failed.";
                
                if (error.response && error.response.data) {
                    errorMsg = error.response.data.message || "Checkout failed.";
                } else if (error.message) {
                    errorMsg = error.message;
                }
                
                const data = {
                    error: errorMsg + " Make sure your profile is complete with address, city, state, and zip."
                };
                templateBuilder.append("error", data, "errors");
            });
    }
    
    displayOrderConfirmation() {
        const confirmationData = {
            orderId: this.currentOrder.orderId,
            total: this.currentOrder.shippingAmount.toFixed(2),
            address: this.currentOrder.address,
            city: this.currentOrder.city,
            state: this.currentOrder.state,
            zip: this.currentOrder.zip,
            date: new Date(this.currentOrder.date).toLocaleString()
        };
        
        templateBuilder.build('order-confirmation', confirmationData, 'main');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    ordersService = new OrdersService();
});
