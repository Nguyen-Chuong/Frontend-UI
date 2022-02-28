package com.capstone_project.hbts.service.impl;

import com.capstone_project.hbts.dto.Actor.UserDTO;
import com.capstone_project.hbts.entity.Users;
import com.capstone_project.hbts.repository.BookingRepository;
import com.capstone_project.hbts.repository.UserRepository;
import com.capstone_project.hbts.request.UserRequest;
import com.capstone_project.hbts.service.UserService;
import lombok.extern.log4j.Log4j2;
import org.modelmapper.ModelMapper;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Log4j2
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    private final ModelMapper modelMapper;

    private final BookingRepository bookingRepository;

    public UserServiceImpl(UserRepository userRepository, ModelMapper modelMapper, BookingRepository bookingRepository) {
        this.userRepository = userRepository;
        this.modelMapper = modelMapper;
        this.bookingRepository = bookingRepository;
    }

    @Override
    public void register(UserRequest userRequest) {
        log.info("Request to register an user");
        BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
        Users newUser = modelMapper.map(userRequest, Users.class);
        newUser.setPassword(bCryptPasswordEncoder.encode(userRequest.getPassword()));
        userRepository.save(newUser);
    }

    @Override
    public UserDTO loadUserByEmail(String email) {
        log.info("Request to load user by email");
        Users users = userRepository.getUsersByEmail(email);
        if(users == null){
            return null;
        }else {
            return modelMapper.map(users, UserDTO.class);
        }
    }

    @Override
    public UserDTO getUserProfile(String username) {
        log.info("Request to get user profile");
        Users users = userRepository.getUsersByUsername(username);
        if(users == null){
            return null;
        }else {
            return modelMapper.map(users, UserDTO.class);
        }
    }

    @Override
    @Transactional
    public void changePassword(String username, String newPass) {
        log.info("Request to change user's password");
        userRepository.changePass(username, newPass);
    }

    @Override
    public String getOldPassword(String username) {
        log.info("Request to get user's old password");
        return userRepository.getOldPassword(username);
    }

    @Override
    @Transactional
    public void updateUserProfile(UserDTO userDTO) {
        log.info("Request to update user profile");
        userRepository.updateUserProfile(userDTO.getFirstname(), userDTO.getLastname(), userDTO.getPhone(),
                userDTO.getAddress(), userDTO.getAvatar(), userDTO.getSpend(), userDTO.getId());
    }

    @Override
    public boolean isUsernameExist(String username) {
        log.info("Request to check duplicate username");
        String usernameFromDB = userRepository.getUsername(username);
        return usernameFromDB != null;
    }

    @Override
    public boolean isEmailExist(String email) {
        log.info("Request to check duplicate email");
        String emailFromDB = userRepository.getEmail(email);
        return emailFromDB != null;
    }

    @Override
    @Transactional
    public void updateVipStatus(int userId) {
        log.info("Request to update user's vip status");
        int numberBookingCompleted = bookingRepository.numberBookingCompleted(userId);
        int vipId = 0;
        if(numberBookingCompleted == 0 || numberBookingCompleted == 1){
            // member class
            vipId = 1;
        } else if (numberBookingCompleted >=2 && numberBookingCompleted <= 4){
            // silver class
            vipId = 2;
        } else if (numberBookingCompleted >=5 && numberBookingCompleted <= 9){
            // gold class
            vipId = 3;
        } else if (numberBookingCompleted >= 10 && numberBookingCompleted <= 19){
            // platinum class
            vipId = 4;
        } else if (numberBookingCompleted >= 20){
            // diamond class
            vipId = 5;
        }
        userRepository.updateVipStatus(vipId, userId);
    }

    @Override
    @Transactional
    public void changeForgotPassword(String email, String newPass) {
        log.info("Request to change user's password that forgot");
        userRepository.changeForgotPassword(email, newPass);
    }

}
