package com.delivery.feedback;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.delivery.customer.Customer;
import com.delivery.customer.CustomerRepository;
import com.delivery.util.RandomIdGenerator;

import java.util.List;

@Service
public class FeedbackService {

    @Autowired
    private FeedbackRepository feedbackRepository;
    
    @Autowired
    private CustomerRepository customerRepository;
    
    public List<Feedback> getAllFeedback() {
		return feedbackRepository.findAll();
	}

    public List<Feedback> getFeedbackByCustomerId(String customerId) {
        return feedbackRepository.findByCustomerId(customerId);
    }

    public List<Feedback> getFeedbackByOrderId(String orderId) {
        return feedbackRepository.findByOrderId(orderId);
    }

    public Feedback addFeedback(Feedback feedback) {
    	String id = RandomIdGenerator.generateRandomId();
        feedback.setId(id); // Set the generated ID
        
     // Set the authenticated customer
        String email = getCurrentUsername();
        Customer customer = customerRepository.findByEmail(email);
        if (customer == null) {
            throw new UsernameNotFoundException("Customer not found with email: " + email);
        }
        feedback.setCustomer(customer);
        
        return feedbackRepository.save(feedback);
    }
    
    private String getCurrentUsername() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return authentication.getName();
    }

    public Feedback updateFeedback(String id, Feedback feedback) {
        if (feedbackRepository.existsById(id)) {
            feedback.setId(id);
            return feedbackRepository.save(feedback);
        }
        return null;
    }

    public void deleteFeedback(String id) {
        feedbackRepository.deleteById(id);
    }

}

