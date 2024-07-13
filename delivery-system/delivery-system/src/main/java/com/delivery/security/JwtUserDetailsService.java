package com.delivery.security;

import com.delivery.customer.Customer;
import com.delivery.customer.CustomerRepository;
import com.delivery.driver.Driver;
import com.delivery.driver.DriverRepository;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class JwtUserDetailsService implements UserDetailsService {

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private DriverRepository driverRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Customer customer = customerRepository.findByEmail(email);
        if (customer != null) {
            return new org.springframework.security.core.userdetails.User(customer.getEmail(), customer.getPassword(), new ArrayList<>());
        }

        Driver driver = driverRepository.findByEmail(email);
        if (driver != null) {
            return new org.springframework.security.core.userdetails.User(driver.getEmail(), driver.getPassword(), new ArrayList<>());
        }

        throw new UsernameNotFoundException("User not found with username: " + email);
    }
}
