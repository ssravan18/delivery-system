package com.delivery.admin;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.delivery.customer.CustomerService;
import com.delivery.driver.DriverService;
import com.delivery.order.OrderDTO;
import com.delivery.order.OrderService;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private OrderService orderService;
    
    @Autowired
    private AdminService adminService;
    
    @Autowired
    private DriverService driverService;
    
    @Autowired
    private CustomerService customerService;

    @PostMapping
    public ResponseEntity<Admin> createAdmin(@RequestBody Admin admin) {
        Admin savedAdmin = adminService.saveAdmin(admin);
        return new ResponseEntity<>(savedAdmin, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<Admin>> getAllAdmins() {
        List<Admin> admins = adminService.getAllAdmins();
        return new ResponseEntity<>(admins, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Admin> getAdminByEmail(@PathVariable String id) {
        Optional<Admin> admin = adminService.getAdminById(id);
        return admin.isPresent() ? new ResponseEntity<>(admin.get(), HttpStatus.OK) : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping("/orders")
    public ResponseEntity<List<OrderDTO>> getAllOders() {
        List<OrderDTO> orders = orderService.getAllOrders();
        return new ResponseEntity<>(orders, HttpStatus.OK);
    }
    
    @GetMapping("/orders-count")
    public ResponseEntity<Long> getOrderCount() {
        long count = orderService.count();
        return ResponseEntity.ok(count);
    }

    @GetMapping("/delivered/orders-count")
    public ResponseEntity<Long> getDeliveredOrderCount() {
        long count = orderService.countByOrderStatus("Delivered");
        return ResponseEntity.ok(count);
    }
    
    @GetMapping("/customers-count")
    public ResponseEntity<Long> getCustomerCount() {
        long count = customerService.count();
        return ResponseEntity.ok(count);
    }
    
    @GetMapping("/drivers-count")
    public ResponseEntity<Long> getDriverCount() {
        long count = driverService.count();
        return ResponseEntity.ok(count);
    }
}
