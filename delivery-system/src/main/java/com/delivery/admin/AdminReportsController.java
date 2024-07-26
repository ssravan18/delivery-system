package com.delivery.admin;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/admin/reports")
public class AdminReportsController {

    @Autowired
    private ReportingService reportingService;

    @GetMapping("/deliveryEfficiency")
    public ResponseEntity<Map<String, Object>> getDeliveryEfficiencyReport() {
        Map<String, Object> report = reportingService.generateDeliveryEfficiencyReport();
        return new ResponseEntity<>(report, HttpStatus.OK);
    }

    @GetMapping("/driverPerformance")
    public ResponseEntity<Map<String, Object>> getDriverPerformanceReport() {
        Map<String, Object> report = reportingService.generateDriverPerformanceReport();
        return new ResponseEntity<>(report, HttpStatus.OK);
    }

    @GetMapping("/customerSatisfaction")
    public ResponseEntity<Map<String, Object>> getCustomerSatisfactionReport() {
        Map<String, Object> report = reportingService.generateCustomerSatisfactionReport();
        return new ResponseEntity<>(report, HttpStatus.OK);
    }
}
