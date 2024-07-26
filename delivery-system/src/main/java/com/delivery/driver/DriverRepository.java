package com.delivery.driver;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DriverRepository extends JpaRepository<Driver, String> {

	Driver findByEmail(String email);
	
	List<Driver> findByPincode(int pincode);

}

