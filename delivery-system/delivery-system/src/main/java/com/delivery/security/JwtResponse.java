package com.delivery.security;

import java.io.Serializable;

public class JwtResponse implements Serializable {

    private static final long serialVersionUID = -8091879091924046844L;
    private final String jwttoken;
    private final String role;
    private final String id;

    public JwtResponse(String jwttoken, String role, String id) {
        this.jwttoken = jwttoken;
        this.role = role;
        this.id = id;
        
    }

    public String getToken() {
        return this.jwttoken;
    }

    public String getRole() {
        return role;
    }
    
    public String getId() {
		return id;
	}
}
