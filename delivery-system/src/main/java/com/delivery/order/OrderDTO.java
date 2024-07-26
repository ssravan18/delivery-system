package com.delivery.order;

import java.time.LocalDateTime;

public class OrderDTO {
	private String id;
    private String customerId;
    private String driverId;
    private String packageType;
    private String packageWeight;
    private String pickupAddress;
    private int pickupPincode;
    private String deliveryAddress;
    private String orderStatus;
    private LocalDateTime placedTime;
    private LocalDateTime deliveryTime;
    
//    public OrderDTO(
//    		String id,
//    		String customerId,
//    		String driverId,
//    		String packageType,
//    		String packageWeight,
//    		String pickupAddress,
//    		String pickupPincode,
//    		String deliveryAddress,
//    		String orderStatus,
//    		LocalDateTime deliveryTime
//    		) {
//    	this.id = id;
//    	this.customerId = customerId;
//    	this.driverId = driverId;
//    	this.packageType = packageType; 
//		this.packageWeight = packageWeight;
//		this.pickupAddress = pickupAddress;
//		this.pickupPincode = pickupPincode;
//		this.deliveryAddress = deliveryAddress;
//		this.orderStatus = orderStatus;
//		this.deliveryTime = deliveryTime;
//    	
//    }
    
    //setters and getters
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getCustomerId() {
		return customerId;
	}
	public void setCustomerId(String customerId) {
		this.customerId = customerId;
	}
	public String getDriverId() {
		return driverId;
	}
	public void setDriverId(String driverId) {
		this.driverId = driverId;
	}
	public String getPackageWeight() {
		return packageWeight;
	}
	public void setPackageWeight(String packageWeight) {
		this.packageWeight = packageWeight;
	}
	public String getPackageType() {
		return packageType;
	}
	public void setPackageType(String packageType) {
		this.packageType = packageType;
	}
	public String getPickupAddress() {
		return pickupAddress;
	}
	public void setPickupAddress(String pickupAddress) {
		this.pickupAddress = pickupAddress;
	}
	public int getPickupPincode() {
		return pickupPincode;
	}
	public void setPickupPincode(int pickupPincode) {
		this.pickupPincode = pickupPincode;
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
}
