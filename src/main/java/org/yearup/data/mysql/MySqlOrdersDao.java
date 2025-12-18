package org.yearup.data.mysql;

import org.springframework.stereotype.Component;
import org.yearup.data.OrdersDao;
import org.yearup.models.Order;
import org.yearup.models.OrderLineItem;
import javax.sql.DataSource;
import java.sql.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Component
public class MySqlOrdersDao extends MySqlDaoBase implements OrdersDao {

    public MySqlOrdersDao(DataSource dataSource) {
        super(dataSource);
    }

    @Override
    public Order getById(int orderId) {
        String sql = "SELECT * FROM orders WHERE order_id = ?";

        try (Connection connection = getConnection()) {
            PreparedStatement statement = connection.prepareStatement(sql);
            statement.setInt(1, orderId);

            ResultSet row = statement.executeQuery();
            if (row.next()) {
                return mapRow(row);
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }

        return null;
    }

    @Override
    public List<Order> getByUserId(int userId) {
        List<Order> orders = new ArrayList<>();
        String sql = "SELECT * FROM orders WHERE user_id = ? ORDER BY date DESC";

        try (Connection connection = getConnection()) {
            PreparedStatement statement = connection.prepareStatement(sql);
            statement.setInt(1, userId);

            ResultSet row = statement.executeQuery();
            while (row.next()) {
                Order order = mapRow(row);
                orders.add(order);
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }

        return orders;
    }

    @Override
    public Order create(Order order) {
        String sql = "INSERT INTO orders (user_id, date, address, city, state, zip, shipping_amount) " +
                "VALUES (?, ?, ?, ?, ?, ?, ?)";

        try (Connection connection = getConnection()) {
            PreparedStatement statement = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            statement.setInt(1, order.getUserId());
            statement.setTimestamp(2, Timestamp.valueOf(order.getDate()));
            statement.setString(3, order.getAddress());
            statement.setString(4, order.getCity());
            statement.setString(5, order.getState());
            statement.setString(6, order.getZip());
            statement.setBigDecimal(7, order.getShippingAmount());

            int rowsAffected = statement.executeUpdate();

            if (rowsAffected > 0) {
                ResultSet generatedKeys = statement.getGeneratedKeys();
                if (generatedKeys.next()) {
                    int orderId = generatedKeys.getInt(1);
                    return getById(orderId);
                }
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }

        return null;
    }

    @Override
    public void addLineItem(OrderLineItem lineItem) {
        String sql = "INSERT INTO order_line_items (order_id, product_id, sales_price, quantity, discount) " +
                "VALUES (?, ?, ?, ?, ?)";

        try (Connection connection = getConnection()) {
            PreparedStatement statement = connection.prepareStatement(sql);
            statement.setInt(1, lineItem.getOrderId());
            statement.setInt(2, lineItem.getProductId());
            statement.setBigDecimal(3, lineItem.getSalesPrice());
            statement.setInt(4, lineItem.getQuantity());
            statement.setBigDecimal(5, lineItem.getDiscount());

            statement.executeUpdate();
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    private Order mapRow(ResultSet row) throws SQLException {
        int orderId = row.getInt("order_id");
        int userId = row.getInt("user_id");
        LocalDateTime date = row.getTimestamp("date").toLocalDateTime();
        String address = row.getString("address");
        String city = row.getString("city");
        String state = row.getString("state");
        String zip = row.getString("zip");
        java.math.BigDecimal shippingAmount = row.getBigDecimal("shipping_amount");

        Order order = new Order(userId, date, address, city, state, zip, shippingAmount);
        order.setOrderId(orderId);

        return order;
    }
}
