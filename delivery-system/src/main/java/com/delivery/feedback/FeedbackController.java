package com.delivery.feedback;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/feedback")
public class FeedbackController {

    @Autowired
    private FeedbackService feedbackService;
    
    @GetMapping
    public ResponseEntity<List<Feedback>> getAllDrivers() {
        List<Feedback> drivers = feedbackService.getAllFeedback();
        return new ResponseEntity<>(drivers, HttpStatus.OK);
    }

    @GetMapping("/customer/{customerId}")
    public ResponseEntity<List<Feedback>> getFeedbackByCustomerId(@PathVariable String customerId) {
        List<Feedback> feedback = feedbackService.getFeedbackByCustomerId(customerId);
        return new ResponseEntity<>(feedback, HttpStatus.OK);
    }

    @GetMapping("/order/{orderId}")
    public ResponseEntity<List<Feedback>> getFeedbackByOrderId(@PathVariable String orderId) {
        List<Feedback> feedback = feedbackService.getFeedbackByOrderId(orderId);
        return new ResponseEntity<>(feedback, HttpStatus.OK);
    }

    @PostMapping("{orderId}")
    public ResponseEntity<Feedback> addFeedback(@RequestBody Feedback feedback, @PathVariable String orderId) {
        Feedback newFeedback = feedbackService.addFeedback(feedback, orderId);
        return new ResponseEntity<>(newFeedback, HttpStatus.CREATED);
    }
}

