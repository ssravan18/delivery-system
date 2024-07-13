package com.delivery.orders;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/orders")
public class OrderController {

    @Autowired
    private OrdersService ordersService;

    // Get all orders
    @GetMapping
    public ResponseEntity<List<Orders>> getAllOrders() {
        List<Orders> orders = ordersService.getAllOrders();
        return new ResponseEntity<>(orders, HttpStatus.OK);
    }

    // Get order by ID
    @GetMapping("/{id}")
    public ResponseEntity<Orders> getOrderById(@PathVariable("id") String id) {
        Orders order = ordersService.getOrderById(id);
        if (order != null) {
            return new ResponseEntity<>(order, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    
    //get customer's all orders
    @GetMapping("/customer/{customerId}")
    public ResponseEntity<List<Orders>> getOrdersByCustomerId(@PathVariable String customerId) {
        List<Orders> orders = ordersService.getOrdersByCustomerId(customerId);
        return new ResponseEntity<>(orders, HttpStatus.OK);
    }

    // Create a new order
    @PostMapping
    public ResponseEntity<Orders> createOrder(@RequestBody Orders order) {
    	order.setDriver(ordersService.assignOrderToDriver(order));
        Orders newOrder = ordersService.createOrder(order);
        return ResponseEntity.status(HttpStatus.CREATED)
                .contentType(MediaType.APPLICATION_JSON)
                .body(newOrder);
    }
    
    
    
 // Update only the order status
    @PatchMapping("/{id}/status")
    public ResponseEntity<Orders> updateOrderStatus(@PathVariable("id") String id, @RequestBody String orderStatus) {
        Orders updatedOrder = ordersService.updateOrderStatus(id, orderStatus);
        if (updatedOrder != null) {
            return new ResponseEntity<>(updatedOrder, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    
    @PatchMapping("/{id}/deliveryTime")
    public ResponseEntity<Orders> updateDeliveryTime(@PathVariable("id") String id, @RequestBody LocalDateTime deliveryTime) {
        Orders updatedOrder = ordersService.updateDeliveryTime(id, deliveryTime);
        if (updatedOrder != null) {
            return new ResponseEntity<>(updatedOrder, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Update an existing order
    @PutMapping("/{id}")
    public ResponseEntity<Orders> updateOrder(@PathVariable("id") String id, @RequestBody Orders order) {
        Orders updatedOrder = ordersService.updateOrder(id, order);
        if (updatedOrder != null) {
            return new ResponseEntity<>(updatedOrder, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Delete an order
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOrder(@PathVariable("id") String id) {
        ordersService.deleteOrder(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
