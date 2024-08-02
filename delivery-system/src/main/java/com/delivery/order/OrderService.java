package com.delivery.order;

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
import java.util.stream.Collectors;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;
    
    @Autowired
    private DriverRepository driverRepository;
    
    @Autowired
    private CustomerRepository customerRepository;

    // Get all orders
    public List<OrderDTO> getAllOrders() {
        List<Order> orders = orderRepository.findAll();
        return orders.stream().map(this::convertToDTO).collect(Collectors.toList());
    }


    private OrderDTO convertToDTO(Order order) {
        OrderDTO orderDTO = new OrderDTO();
        orderDTO.setId(order.getId());
        orderDTO.setCustomerId(order.getCustomer().getId());
        orderDTO.setDriverId(order.getDriver().getId());
        orderDTO.setPackageType(order.getPackageType());
        orderDTO.setPackageWeight(order.getPackageWeight());
        orderDTO.setPickupAddress(order.getPickupAddress());
        orderDTO.setPickupPincode(order.getPickupPincode());
        orderDTO.setDeliveryAddress(order.getDeliveryAddress());
        orderDTO.setOrderStatus(order.getOrderStatus());
        orderDTO.setDeliveryTime(order.getDeliveryTime());
        orderDTO.setPlacedTime(order.getPlacedTime());
        return orderDTO;
    }

    // Get order by ID
    public Order getOrderById(String id) {
        Optional<Order> order = orderRepository.findById(id);
        return order.orElse(null);
    }

    // Create a new order
    public Order createOrder(Order order) {
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
        return orderRepository.save(order);
    }

    private String getCurrentUsername() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return authentication.getName();
    }
    
    public Driver assignOrderToDriver(Order order) {
        int pickupPincode = order.getPickupPincode();
        List<Driver> drivers = driverRepository.findAll();

        for (Driver driver : drivers) {
            if (driver.getPincode() == pickupPincode) {
                // Check how many orders are assigned to this driver today
                int orderCountToday = orderRepository.countOrdersByDriverAndDate(driver.getId(), LocalDate.now());

                if (orderCountToday < 10) { 
                    order.setDriver(driver); 
                    return driver;
                }
            }
        }
        return null;
    }

    // Update an existing order
    public Order updateOrder(String id, Order orderDetails) {
        Optional<Order> optionalOrder = orderRepository.findById(id);
        if (optionalOrder.isPresent()) {
            Order order = optionalOrder.get();
            order.setCustomer(orderDetails.getCustomer());
            order.setDriver(orderDetails.getDriver());
            order.setPackageType(orderDetails.getPackageType());
            order.setPackageWeight(orderDetails.getPackageWeight());
            order.setPickupAddress(orderDetails.getPickupAddress());
            order.setDeliveryAddress(orderDetails.getDeliveryAddress());
            order.setOrderStatus(orderDetails.getOrderStatus());
            order.setPlacedTime(LocalDateTime.now());
            order.setDeliveryTime(orderDetails.getDeliveryTime());
            return orderRepository.save(order);
        }
        return null;
    }

    // Delete an order
    public void deleteOrder(String id) {
    	orderRepository.deleteById(id);
    }
    
    public Order updateOrderStatus(String id, String orderStatus) {
        Optional<Order> optionalOrder = orderRepository.findById(id);
        if (optionalOrder.isPresent()) {
            Order order = optionalOrder.get();
            if(orderStatus.equals("Delivered")) {
            	System.out.println(">>>>>>"+orderStatus+" "+LocalDateTime.now() );
            	order.setDeliveryTime(LocalDateTime.now());
            }
            order.setOrderStatus(orderStatus);
            return orderRepository.save(order);
        }
        return null;
    }
    
    public Order updateDeliveryTime(String id, LocalDateTime deliveryTime) {
        Order order = orderRepository.findById(id).orElse(null);
        if (order != null) {
            order.setDeliveryTime(deliveryTime);
            return orderRepository.save(order);
        }
        return null;
    }

    public List<Order> getOrdersByCustomerId(String customerId) {
        return orderRepository.findByCustomerId(customerId);
    }
    
    public List<Order> getOrdersByDriverId(String driverId) {
        return orderRepository.findByDriverId(driverId);
    }


	public Order getOrderStatus(String id) {
		Optional<Order> optionalOrder = orderRepository.findById(id);
		Order order = optionalOrder.get();
		return order;
	}
	
	public long count() {
        return orderRepository.count();
    }

    public long countByOrderStatus(String status) {
        return orderRepository.countByOrderStatus(status);
    }
    
}
