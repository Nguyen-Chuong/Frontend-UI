package com.capstone_project.hbts.service;

import com.capstone_project.hbts.dto.Actor.ProviderDTO;
import com.capstone_project.hbts.request.ProviderRequest;

public interface ProviderService {

    /**
     * Load provider's username by email
     * @param email
     */
    String loadProviderUsernameByEmail(String email);

    /**
     * Register an provider
     * @param providerRequest
     */
    void register(ProviderRequest providerRequest);

    /**
     * Check duplicate username
     * @param username
     */
    boolean isUsernameExist(String username);

    /**
     * Check duplicate email
     * @param email
     */
    boolean isEmailExist(String email);

    /**
     * Get detail provider by username
     * @param username
     */
    ProviderDTO getProviderProfile(String username);

}
