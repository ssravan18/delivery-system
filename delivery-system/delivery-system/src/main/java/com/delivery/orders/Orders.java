package com.delivery.orders;

import jakarta.persistence.*;
import java.time.LocalDateTime;

import com.delivery.customer.Customer;
import com.delivery.driver.Driver;

@Entity
@Table(name = "orders")
public class Orders {

    @Id
    @Column(name = "id", nullable = false)
    private String id;

    @ManyToOne
    @JoinColumn(name = "customer_id", nullable = false)
    private Customer customer;

    @ManyToOne
    @JoinColumn(name = "driver_id", nullable = true)
    private Driver driver;

    @Column(name = "package_type", nullable = false)
    private String packageType;
    
    @Column(name = "package_weight", nullable = false)
    private String packageWeight;
    
    @Column(name = "pickup_address", nullable = false)
    private String pickupAddress;
    
    @Column(name = "pickup_pincode", nullable = false)
    private int pickupPincode;

    @Column(name = "delivery_address", nullable = false)
    private String deliveryAddress;

    @Column(name = "order_status", nullable = false)
    private String orderStatus;

    @Column(name = "placed_time", nullable = false)
    private LocalDateTime placedTime;

    @Column(name = "delivery_time", nullable = true)
    private LocalDateTime deliveryTime;
    
    // Getters and setters

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public Customer getCustomer() {
		return customer;
	}

	public void setCustomer(Customer customer) {
		this.customer = customer;
	}

	public Driver getDriver() {
		return driver;
	}

	public void setDriver(Driver driver) {
		this.driver = driver;
	}

	
	
	public String getPickupAddress() {
		return pickupAddress;
	}

	public void setPickupAddress(String pickupAddress) {
		this.pickupAddress = pickupAddress;
	}

	public String getDeliveryAddress() {
		return deliveryAddress;
	}

	public void setDeliveryAddress(String deliveryAddress) {
		this.deliveryAddress = deliveryAddress;
	}

	public String getOrderStatus() {
		return orderStatus;
	}

	public void setOrderStatus(String orderStatus) {
		this.orderStatus = orderStatus;
	}

	public LocalDateTime getPlacedTime() {
		return placedTime;
	}

	public void setPlacedTime(LocalDateTime placedTime) {
		this.placedTime = placedTime;
	}

	public LocalDateTime getDeliveryTime() {
		return deliveryTime;
	}

	public void setDeliveryTime(LocalDateTime deliveryTime) {
		this.deliveryTime = deliveryTime;
	}


	public int getPickupPincode() {
		return pickupPincode;
	}

	public void setPickupPincode(int pickupPincode) {
		this.pickupPincode = pickupPincode;
	}

	public String getPackageType() {
		return packageType;
	}

	public void setPackageType(String packageType) {
		this.packageType = packageType;
	}

	public String getPackageWeight() {
		return packageWeight;
	}

	public void setPackageWeight(String packageWeight) {
		this.packageWeight = packageWeight;
	}

}
