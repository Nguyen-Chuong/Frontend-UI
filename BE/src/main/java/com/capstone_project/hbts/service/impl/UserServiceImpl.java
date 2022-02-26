package com.capstone_project.hbts.service.impl;

import com.capstone_project.hbts.dto.UserDTO;
import com.capstone_project.hbts.entity.Users;
import com.capstone_project.hbts.repository.BookingRepository;
import com.capstone_project.hbts.repository.UserRepository;
import com.capstone_project.hbts.request.UserRequest;
import com.capstone_project.hbts.service.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
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
        BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
        Users newUser = modelMapper.map(userRequest, Users.class);
        newUser.setPassword(bCryptPasswordEncoder.encode(userRequest.getPassword()));
        userRepository.save(newUser);
    }

    @Override
    public UserDTO loadUserByEmail(String email) {
        Users users = userRepository.getUsersByEmail(email);
        if(users == null){
            return null;
        }else {
            return modelMapper.map(users, UserDTO.class);
        }
    }

    @Override
    public UserDTO getUserProfile(String username) {
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
        userRepository.changePass(username, newPass);
    }

    @Override
    public String getOldPassword(String username) {
        return userRepository.getOldPassword(username);
    }

    @Override
    @Transactional
    public void updateUserProfile(UserDTO userDTO) {
        userRepository.updateUserProfile(userDTO.getFirstname(), userDTO.getLastname(), userDTO.getPhone(),
                userDTO.getAddress(), userDTO.getAvatar(), userDTO.getSpend(), userDTO.getId());
    }

    @Override
    public boolean isUsernameExist(String username) {
        String usernameFromDB = userRepository.getUsername(username);
        return usernameFromDB != null;
    }

    @Override
    public boolean isEmailExist(String email) {
        String emailFromDB = userRepository.getEmail(email);
        return emailFromDB != null;
    }

    @Override
    @Transactional
    public void updateVipStatus(int userId) {
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
        } else if (numberBookingCompleted >= 10){
            // platinum class
            vipId = 4;
        }
        // may need one more class, and select via number of room, not booking
        userRepository.updateVipStatus(vipId, userId);
    }

}
