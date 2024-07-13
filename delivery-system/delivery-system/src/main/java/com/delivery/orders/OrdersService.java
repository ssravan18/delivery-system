package com.delivery.orders;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.delivery.customer.Customer;
import com.delivery.customer.CustomerRepository;
import com.delivery.driver.Driver;
import com.delivery.driver.DriverRepository;
import com.delivery.util.RandomIdGenerator;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class OrdersService {

    @Autowired
    private OrdersRepository ordersRepository;
    
    @Autowired
    private DriverRepository driverRepository;
    
    @Autowired
    private CustomerRepository customerRepository;

    // Get all orders
    public List<Orders> getAllOrders() {
        return ordersRepository.findAll();
    }

    // Get order by ID
    public Orders getOrderById(String id) {
        Optional<Orders> order = ordersRepository.findById(id);
        return order.orElse(null);
    }

    // Create a new order
    public Orders createOrder(Orders order) {
        String id = RandomIdGenerator.generateRandomId();
        order.setId(id); // Set the generated ID
        order.setPlacedTime(LocalDateTime.now());

        // Set the authenticated customer
        String email = getCurrentUsername();
        Customer customer = customerRepository.findByEmail(email);
        if (customer == null) {
            throw new UsernameNotFoundException("Customer not found with email: " + email);
        }
        order.setCustomer(customer);

        order.setDriver(assignOrderToDriver(order));
        return ordersRepository.save(order);
    }

    private String getCurrentUsername() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return authentication.getName();
    }
    
    public Driver assignOrderToDriver(Orders order) {
        int pickupPincode = order.getPickupPincode();
        List<Driver> drivers = driverRepository.findAll();

        for (Driver driver : drivers) {
            if (driver.getPincode() == pickupPincode) {
                // Check how many orders are assigned to this driver today
                int orderCountToday = ordersRepository.countOrdersByDriverAndDate(driver.getId(), LocalDate.now());

                if (orderCountToday < 10) { 
                    order.setDriver(driver); 
                    return driver;
                }
            }
        }
        return null;
    }

    // Update an existing order
    public Orders updateOrder(String id, Orders orderDetails) {
        Optional<Orders> optionalOrder = ordersRepository.findById(id);
        if (optionalOrder.isPresent()) {
            Orders order = optionalOrder.get();
            order.setCustomer(orderDetails.getCustomer());
            order.setDriver(orderDetails.getDriver());
            order.setPackageType(orderDetails.getPackageType());
            order.setPackageWeight(orderDetails.getPackageWeight());
            order.setPickupAddress(orderDetails.getPickupAddress());
            order.setDeliveryAddress(orderDetails.getDeliveryAddress());
            order.setOrderStatus(orderDetails.getOrderStatus());
            order.setPlacedTime(orderDetails.getPlacedTime());
            order.setDeliveryTime(orderDetails.getDeliveryTime());
            return ordersRepository.save(order);
        }
        return null;
    }

    // Delete an order
    public void deleteOrder(String id) {
        ordersRepository.deleteById(id);
    }
    
    public Orders updateOrderStatus(String id, String orderStatus) {
        Optional<Orders> optionalOrder = ordersRepository.findById(id);
        if (optionalOrder.isPresent()) {
            Orders order = optionalOrder.get();
            order.setOrderStatus(orderStatus);
            return ordersRepository.save(order);
        }
        return null;
    }
    
    public Orders updateDeliveryTime(String id, LocalDateTime deliveryTime) {
        Orders order = ordersRepository.findById(id).orElse(null);
        if (order != null) {
            order.setDeliveryTime(deliveryTime);
            return ordersRepository.save(order);
        }
        return null;
    }

    public List<Orders> getOrdersByCustomerId(String customerId) {
        return ordersRepository.findByCustomerId(customerId);
    }
    
}
