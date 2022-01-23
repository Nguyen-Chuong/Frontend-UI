package com.capstone_project.hbts.security;

import com.capstone_project.hbts.entity.Users;
import com.capstone_project.hbts.repository.UserRepository;
import com.capstone_project.hbts.request.UserRequest;
import com.capstone_project.hbts.response.ApiResponse;
import org.modelmapper.ModelMapper;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    private final ModelMapper modelMapper;

    public CustomUserDetailsService(UserRepository userRepository, ModelMapper modelMapper) {
        this.userRepository = userRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Users user = userRepository.getUsersByUsername(username);
        if(user == null){
            throw new UsernameNotFoundException("can't find account");
        }
        return new User(user.getUsername(), user.getPassword(), new ArrayList<>());
    }

    // should in user resource, modify later
    // register
    public ApiResponse register(UserRequest userRequest){
        BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
        Users newUser = modelMapper.map(userRequest, Users.class);
        newUser.setPassword(bCryptPasswordEncoder.encode(userRequest.getPassword()));
        userRepository.save(newUser);
        return new ApiResponse(200, null, null);
    }

}
