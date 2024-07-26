package com.delivery.admin;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.delivery.customer.Customer;
import com.delivery.customer.CustomerService;
import com.delivery.feedback.Feedback;
import com.delivery.feedback.FeedbackService;
import com.delivery.order.Order;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/admin/customers")
public class AdminCustomerController {

    @Autowired
    private CustomerService customerService;
    
    @Autowired
    private FeedbackService feedbackService;

    @GetMapping
    public ResponseEntity<List<Customer>> getAllCustomers() {
        List<Customer> customers = customerService.getAllCustomers();
        return new ResponseEntity<>(customers, HttpStatus.OK);
    }

    @GetMapping("/{id}/orders")
    public ResponseEntity<Optional<Order>> getCustomerOrders(@PathVariable("id") String id) {
        Optional<Order> orders = customerService.getCustomerOrders(id);
        return new ResponseEntity<>(orders, HttpStatus.OK);
    }

    @GetMapping("/{id}/feedback")
    public ResponseEntity<List<Feedback>> getCustomerFeedback(@PathVariable("id") String id) {
        List<Feedback> feedback = feedbackService.getFeedbackByOrderId(id);
        return new ResponseEntity<List<Feedback>>(feedback, HttpStatus.OK);
    }
}

