package com.capstone_project.hbts.security;

import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    //private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        //User user = userRepository.getByUsername...;

//        if(user==null){
//            throw new UsernameNotFoundException("can't find account");
//        }
        BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
        String new_pass = bCryptPasswordEncoder.encode("06052000");
        System.out.println(new_pass);
        return new User("chuongntn", new_pass, new ArrayList<>());

    }

    // should in user resource
    // register
//    public ApiResponse save(User user){
//
//    }

}
