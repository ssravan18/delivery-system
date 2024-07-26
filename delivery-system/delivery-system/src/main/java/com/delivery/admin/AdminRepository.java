package com.delivery.admin;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface AdminRepository extends JpaRepository<Admin, String> {
    Admin findByEmail(String email);
    Optional<Admin> findById(String id);

	Admin findByRole(String role);
}
