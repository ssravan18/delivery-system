package com.delivery.customer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.delivery.order.Order;
import com.delivery.order.OrderRepository;

import java.util.List;
import java.util.Optional;

@Service
public class CustomerService {

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private OrderRepository ordersRepository;
    
    // Get all customers
    public List<Customer> getAllCustomers() {
        return customerRepository.findAll();
    }

    // Get customer by ID
    public Customer getCustomerById(String id) {
        Optional<Customer> customer = customerRepository.findById(id);
        return customer.orElse(null);
    }

    // Create a new customer
    public Customer createCustomer(Customer customer) {
        return customerRepository.save(customer);
    }

    // Update an existing customer
    public Customer updateCustomer(String id, Customer customerDetails) {
        Optional<Customer> optionalCustomer = customerRepository.findById(id);
        if (optionalCustomer.isPresent()) {
            Customer customer = optionalCustomer.get();
            customer.setName(customerDetails.getName());
            customer.setEmail(customerDetails.getEmail());
            customer.setPassword(customerDetails.getPassword());
            customer.setPhone(customerDetails.getPhone());
            return customerRepository.save(customer);
        }
        return null;
    }

    // Delete a customer
    public void deleteCustomer(String id) {
        customerRepository.deleteById(id);
    }

    public Optional<Order> getCustomerOrders(String customerId) {
        Customer customer = customerRepository.findById(customerId).orElse(null);
        if (customer != null) {
            return ordersRepository.findById(customerId);
        }
        return null;
    }
    
    public long count() {
        return customerRepository.count();
    }
    
}

