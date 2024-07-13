package com.delivery.driver;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DriverService {

    @Autowired
    private DriverRepository driverRepository;

    // Get all drivers
    public List<Driver> getAllDrivers() {
        return driverRepository.findAll();
    }

    // Get driver by ID
    public Driver getDriverById(String id) {
        Optional<Driver> driver = driverRepository.findById(id);
        return driver.orElse(null);
    }

    // Create a new driver
    public Driver createDriver(Driver driver) {
        return driverRepository.save(driver);
    }

    // Update an existing driver
    public Driver updateDriver(String id, Driver driverDetails) {
        Optional<Driver> optionalDriver = driverRepository.findById(id);
        if (optionalDriver.isPresent()) {
            Driver driver = optionalDriver.get();
            driver.setName(driverDetails.getName());
            driver.setEmail(driverDetails.getEmail());
            driver.setPassword(driverDetails.getPassword());
            driver.setPhone(driverDetails.getPhone());
            return driverRepository.save(driver);
        }
        return null;
    }

    // Delete a driver
    public void deleteDriver(String id) {
        driverRepository.deleteById(id);
    }
}
