package com.capstone_project.hbts.service;

import com.capstone_project.hbts.dto.UserDTO;
import com.capstone_project.hbts.entity.Users;
import com.capstone_project.hbts.request.UserRequest;

public interface UserService {

    /**
     * Register an user
     * @param userRequest
     */
    void register(UserRequest userRequest);

    /**
     * Load detail user by email
     * @param email
     */
    Users loadUserByEmail(String email);

    /**
     * Get detail user by username
     * @param username
     */
    UserDTO getUserProfile(String username);
}
