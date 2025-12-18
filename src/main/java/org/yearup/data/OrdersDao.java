package org.yearup.data;

import org.yearup.models.Order;
import org.yearup.models.OrderLineItem;
import java.util.List;

public interface OrdersDao {
    Order getById(int orderId);
    List<Order> getByUserId(int userId);
    Order create(Order order);
    void addLineItem(OrderLineItem lineItem);
}
