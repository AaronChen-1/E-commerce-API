package org.yearup.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import org.yearup.data.OrdersDao;
import org.yearup.data.ProfileDao;
import org.yearup.data.ShoppingCartDao;
import org.yearup.data.UserDao;
import org.yearup.models.*;
import java.math.BigDecimal;
import java.security.Principal;
import java.time.LocalDateTime;
import java.util.Map;

@RestController
@RequestMapping("/orders")
@CrossOrigin
@PreAuthorize("isAuthenticated()")
public class OrdersController {

    private final OrdersDao ordersDao;
    private final ShoppingCartDao shoppingCartDao;
    private final UserDao userDao;
    private final ProfileDao profileDao;

    @Autowired
    public OrdersController(OrdersDao ordersDao, ShoppingCartDao shoppingCartDao,
                            UserDao userDao, ProfileDao profileDao) {
        this.ordersDao = ordersDao;
        this.shoppingCartDao = shoppingCartDao;
        this.userDao = userDao;
        this.profileDao = profileDao;
    }

    // POST /orders - Convert shopping cart to order (CHECKOUT)
    @PostMapping
    public Order checkout(Principal principal) {
        try {
            String userName = principal.getName();
            User user = userDao.getByUserName(userName);
            int userId = user.getId();

            // Get user's shopping cart
            ShoppingCart cart = shoppingCartDao.getByUserId(userId);
            if (cart.getItems().isEmpty()) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Cart is empty.");
            }

            // Get user's profile for shipping info
            Profile profile = profileDao.getByUserId(userId);
            if (profile == null) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Complete your profile first.");
            }

            // Create order with current timestamp and user's profile info
            Order order = new Order(
                    userId,
                    LocalDateTime.now(),
                    profile.getAddress(),
                    profile.getCity(),
                    profile.getState(),
                    profile.getZip(),
                    new BigDecimal("0.00")  // Default shipping cost
            );

            // Insert order into database (gets auto-generated orderId)
            Order createdOrder = ordersDao.create(order);

            // Add line items from cart to the order
            for (ShoppingCartItem item : cart.getItems().values()) {
                OrderLineItem lineItem = new OrderLineItem(
                        createdOrder.getOrderId(),
                        item.getProductId(),
                        item.getProduct().getPrice(),
                        item.getQuantity(),
                        item.getDiscountPercent()
                );
                ordersDao.addLineItem(lineItem);
            }

            // Clear shopping cart after successful order
            shoppingCartDao.clear(userId);

            return createdOrder;
        } catch(Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Oops... our bad.");
        }
    }
}
