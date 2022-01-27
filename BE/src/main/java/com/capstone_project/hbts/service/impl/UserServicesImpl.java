package com.capstone_project.hbts.service.impl;

import com.capstone_project.hbts.dto.UserDTO;
import com.capstone_project.hbts.entity.Users;
import com.capstone_project.hbts.repository.UserRepository;
import com.capstone_project.hbts.request.UserRequest;
import com.capstone_project.hbts.service.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserServicesImpl implements UserService {

    private final UserRepository userRepository;

    private final ModelMapper modelMapper;

    public UserServicesImpl(UserRepository userRepository, ModelMapper modelMapper) {
        this.userRepository = userRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public void register(UserRequest userRequest) {
        BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
        Users newUser = modelMapper.map(userRequest, Users.class);
        newUser.setPassword(bCryptPasswordEncoder.encode(userRequest.getPassword()));
        userRepository.save(newUser);
    }

    @Override
    public Users loadUserByEmail(String email) {
        return userRepository.getUsersByEmail(email);
    }

    @Override
    public UserDTO getUserProfile(String username) {
        Users users = userRepository.getUsersByUsername(username);
        UserDTO userDTO = modelMapper.map(users, UserDTO.class);
        return userDTO;
    }

    @Override
    @Transactional
    public void changePassword(String username, String newPass) {
        userRepository.changePass(username, newPass);
    }

    @Override
    public String getOldPassword(String username) {
        return userRepository.getOldPassword(username);
    }

}
