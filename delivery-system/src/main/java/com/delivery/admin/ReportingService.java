package com.delivery.admin;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.delivery.feedback.Feedback;
import com.delivery.feedback.FeedbackService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class ReportingService {
	
	@Autowired
	private FeedbackService feedbackService;

    // Generate delivery efficiency report
    public Map<String, Object> generateDeliveryEfficiencyReport() {
        // Implementation to gather and compute delivery efficiency data
        Map<String, Object> report = new HashMap<>();
        // Populate report with data
        return report;
    }

    // Generate driver performance report
    public Map<String, Object> generateDriverPerformanceReport() {
        // Implementation to gather and compute driver performance data
        Map<String, Object> report = new HashMap<>();
        // Populate report with data
        return report;
    }

    public Map<String, Object> generateCustomerSatisfactionReport() {
        Map<String, Object> report = new HashMap<>();
        
        // Fetch all feedback
        List<Feedback> feedbackList = feedbackService.getAllFeedback();

        // Compute statistics
        int totalFeedbacks = feedbackList.size();
        double averageRating = feedbackList.stream()
                                           .mapToInt(Feedback::getRating)
                                           .average()
                                           .orElse(0.0);

        // Extract feedback comments
        List<String> feedbackComments = feedbackList.stream()
                                                    .map(Feedback::getFeedback)
                                                    .collect(Collectors.toList());


        // Populate the report
        report.put("totalFeedbacks", totalFeedbacks);
        report.put("averageRating", averageRating);
        report.put("feedbackComments", feedbackComments);

        return report;
    }
}
