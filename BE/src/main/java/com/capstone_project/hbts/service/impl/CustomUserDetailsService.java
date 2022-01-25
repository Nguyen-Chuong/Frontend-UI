package com.capstone_project.hbts.service.impl;

import com.capstone_project.hbts.entity.Users;
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

    public CustomUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Users user = userRepository.getUsersByUsername(username);
        if(user == null){
            throw new UsernameNotFoundException("can't find account");
        }
        return new User(user.getUsername(), user.getPassword(), new ArrayList<>());
    }

}
