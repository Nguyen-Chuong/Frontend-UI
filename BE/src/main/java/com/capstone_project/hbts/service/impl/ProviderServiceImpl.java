package com.capstone_project.hbts.service.impl;

import com.capstone_project.hbts.repository.ProviderRepository;
import com.capstone_project.hbts.service.ProviderService;
import org.springframework.stereotype.Service;

@Service
public class ProviderServiceImpl implements ProviderService {

    private final ProviderRepository providerRepository;

    public ProviderServiceImpl(ProviderRepository providerRepository) {
        this.providerRepository = providerRepository;
    }

    @Override
    public String loadProviderUsernameByEmail(String email) {
        return providerRepository.getProviderUsernameByEmail(email);
    }

}
