package com.delivery.admin;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AdminService {
	
    @Autowired
    private AdminRepository adminRepository;

    // Create or update admin
    public Admin saveAdmin(Admin admin) {
        return adminRepository.save(admin);
    }

    // Get all admins
    public List<Admin> getAllAdmins() {
        return adminRepository.findAll();
    }

    // Get admin by email
    public Admin getAdminByEmail(String email) {
        return adminRepository.findByEmail(email);
    }

	public Optional<Admin> getAdminById(String id) {
		return adminRepository.findById(id);
	}
}
