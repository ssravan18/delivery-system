package com.delivery.order;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderRepository extends JpaRepository<Order, String> {

	 @Query("SELECT COUNT(o) FROM Order o WHERE o.driver.id = :driverId AND FUNCTION('DATE', o.placedTime) = :date")
	 int countOrdersByDriverAndDate(@Param("driverId") String driverId, @Param("date") LocalDate date);

	List<Order> findByCustomerId(String customerId);

	List<Order> findByDriverId(String driverId);

	long countByOrderStatus(String status);
	
	
}

