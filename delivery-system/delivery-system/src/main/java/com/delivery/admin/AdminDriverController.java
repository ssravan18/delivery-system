package com.delivery.admin;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.delivery.driver.Driver;
import com.delivery.driver.DriverService;
import com.delivery.orders.Orders;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/admin/drivers")
public class AdminDriverController {

    @Autowired
    private DriverService driverService;

    @GetMapping
    public ResponseEntity<List<Driver>> getAllDrivers() {
        List<Driver> drivers = driverService.getAllDrivers();
        return new ResponseEntity<>(drivers, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Driver> createDriver(@RequestBody Driver driver) {
        Driver newDriver = driverService.createDriver(driver);
        return new ResponseEntity<>(newDriver, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Driver> updateDriver(@PathVariable("id") String id, @RequestBody Driver driver) {
        Driver updatedDriver = driverService.updateDriver(id, driver);
        return new ResponseEntity<>(updatedDriver, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDriver(@PathVariable("id") String id) {
        driverService.deleteDriver(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PutMapping("/{id}/assignDelivery")
    public ResponseEntity<Driver> assignDelivery(@PathVariable("id") String id, @RequestBody Orders order) {
        Driver driver = driverService.getDriverById(id);
        if (driver != null) {
            driver.getOrders().add(order);
            driverService.updateDriver(id, driver);
            return new ResponseEntity<>(driver, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
