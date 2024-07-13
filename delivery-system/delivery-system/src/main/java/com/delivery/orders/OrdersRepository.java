package com.delivery.orders;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface OrdersRepository extends JpaRepository<Orders, String> {

	@Query("SELECT COUNT(o) FROM Orders o WHERE o.driver.id = :driverId AND DATE(o.placedTime) = :date")
    int countOrdersByDriverAndDate(@Param("driverId") String driverId, @Param("date") LocalDate date);

	List<Orders> findByCustomerId(String customerId);
}

