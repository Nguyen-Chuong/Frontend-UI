package com.capstone_project.hbts.service.impl;

import com.capstone_project.hbts.entity.Provider;
import com.capstone_project.hbts.repository.ProviderRepository;
import com.capstone_project.hbts.request.ProviderRequest;
import com.capstone_project.hbts.service.ProviderService;
import org.modelmapper.ModelMapper;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class ProviderServiceImpl implements ProviderService {

    private final ProviderRepository providerRepository;

    private final ModelMapper modelMapper;

    public ProviderServiceImpl(ProviderRepository providerRepository, ModelMapper modelMapper) {
        this.providerRepository = providerRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public String loadProviderUsernameByEmail(String email) {
        return providerRepository.getProviderUsernameByEmail(email);
    }

    @Override
    public void register(ProviderRequest providerRequest) {
        BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
        Provider newProvider = modelMapper.map(providerRequest, Provider.class);
        newProvider.setPassword(bCryptPasswordEncoder.encode(newProvider.getPassword()));
        providerRepository.save(newProvider);
    }

    @Override
    public boolean isUsernameExist(String username) {
        String usernameFromDB = providerRepository.getUsername(username);
        return usernameFromDB != null;
    }

    @Override
    public boolean isEmailExist(String email) {
        String usernameFromDB = providerRepository.getEmail(email);
        return usernameFromDB != null;
    }

}
