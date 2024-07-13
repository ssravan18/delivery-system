package com.delivery.security;

import com.delivery.admin.Admin;
import com.delivery.admin.AdminRepository;
import com.delivery.customer.Customer;
import com.delivery.customer.CustomerRepository;
import com.delivery.driver.Driver;
import com.delivery.driver.DriverRepository;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class JwtAuthenticationController {

    @Autowired
    private AuthenticationManager authenticationManager;
	
    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private JwtUserDetailsService userDetailsService;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private DriverRepository driverRepository;
    
    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @PostMapping("/login")
    public ResponseEntity<?> createAuthenticationToken(@RequestBody JwtRequest jwtRequest) throws Exception {
        try {
            authenticate(jwtRequest.getEmail(), jwtRequest.getPassword());
        } catch (UsernameNotFoundException e) {
            e.printStackTrace();
            throw new Exception("User not Found");
        }

        UserDetails userDetails = this.userDetailsService.loadUserByUsername(jwtRequest.getEmail());
        String token = this.jwtTokenUtil.generateToken(userDetails.getUsername());

        // Determine if the user is a customer or a driver
        String role;
        String id;
        Customer customer = customerRepository.findByEmail(jwtRequest.getEmail());
        if (customer != null) {
        	id = customer.getId();
            role = "customer";
        } else if (driverRepository.findByEmail(jwtRequest.getEmail()) != null) {
        	Driver driver = driverRepository.findByEmail(jwtRequest.getEmail());
        	id = driver.getId();
            role = "driver";
        } else {
            throw new Exception("User role not found");
        }
        return ResponseEntity.ok(new JwtResponse(token, role, id));
    }

    private void authenticate(String username, String password) throws Exception {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
        } catch (DisabledException e) {
            throw new Exception("USER_DISABLED", e);
        } catch (BadCredentialsException e) {
            System.out.println("Invalid credentials for user: " + username);
            throw new Exception("INVALID_CREDENTIALS", e);
        }
        
    }


    @PostMapping("/signup/customer")
    public ResponseEntity<?> registerCustomer(@RequestBody Customer customer) throws Exception {
        if (customerRepository.findByEmail(customer.getEmail()) != null) {
            throw new Exception("Customer with username " + customer.getEmail() + " already exists");
        }
        customer.setPassword(passwordEncoder.encode(customer.getPassword()));
        customerRepository.save(customer);
        Map<String, String> response = new HashMap<>();
        response.put("message", "Customer registered successfully");
        return ResponseEntity.ok(response);
    }
    
    @PostMapping("/signup/admin")
    public ResponseEntity<?> registerAdmin(@RequestBody Admin admin, @RequestHeader("Authorization") String authHeader) throws Exception {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            throw new Exception("Invalid or missing authorization header");
        }

        String token = authHeader.substring(7); // Extract token without "Bearer " prefix
        String requesterEmail = jwtTokenUtil.getUsernameFromToken(token); // Extract the email from the token

        Admin mainAdmin = adminRepository.findByRole("MAIN_ADMIN");
        if (mainAdmin == null) {
            // This means no main admin exists, so the first admin will be the main admin
            admin.setRole("MAIN_ADMIN");
        } else {
            Admin requester = adminRepository.findByEmail(requesterEmail);
            if (requester == null || !"MAIN_ADMIN".equals(requester.getRole())) {
                throw new Exception("Only the main admin can register new admins");
            }
            admin.setRole("ADMIN");
        }
        admin.setPassword(passwordEncoder.encode(admin.getPassword()));
        adminRepository.save(admin);
        return ResponseEntity.ok("Admin registered successfully");
    }

    @PostMapping("/signup/driver")
    public ResponseEntity<?> registerDriver(@RequestBody Driver driver) throws Exception {
        if (driverRepository.findByEmail(driver.getEmail()) != null) {
            throw new Exception("Driver with username " + driver.getEmail() + " already exists");
        }
        driver.setPassword(passwordEncoder.encode(driver.getPassword()));
        driverRepository.save(driver);
        Map<String, String> response = new HashMap<>();
        response.put("message", "Driver registered successfully");
        return ResponseEntity.ok(response);
    }

    
}
