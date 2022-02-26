package com.capstone_project.hbts.service.impl;

import com.capstone_project.hbts.entity.Provider;
import com.capstone_project.hbts.entity.Users;
import com.capstone_project.hbts.repository.ProviderRepository;
import com.capstone_project.hbts.repository.UserRepository;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    private final ProviderRepository providerRepository;

    public CustomUserDetailsService(UserRepository userRepository, ProviderRepository providerRepository) {
        this.userRepository = userRepository;
        this.providerRepository = providerRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        if(username.startsWith("u-")){
            Users user = userRepository.getUsersByUsername(username);
            if(user == null){
                throw new UsernameNotFoundException("can't find account");
            }
            return new User(user.getUsername(), user.getPassword(), new ArrayList<>());
        } else {
            Provider provider = providerRepository.getProviderByUsername(username);
            if (provider == null) {
                throw new UsernameNotFoundException("can't find account");
            }
            return new User(provider.getUsername(), provider.getPassword(), new ArrayList<>());
        }
    }

}
