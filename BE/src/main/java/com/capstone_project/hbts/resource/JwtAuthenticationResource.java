package com.capstone_project.hbts.resource;

import com.capstone_project.hbts.entity.Users;
import com.capstone_project.hbts.request.UserRequest;
import com.capstone_project.hbts.response.JwtResponse;
import com.capstone_project.hbts.service.impl.CustomUserDetailsService;
import com.capstone_project.hbts.security.jwt.JwtTokenUtil;
import com.capstone_project.hbts.service.impl.UserServicesImpl;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
public class JwtAuthenticationResource {

    private final AuthenticationManager authenticationManager;

    private final JwtTokenUtil jwtTokenUtil;

    private final CustomUserDetailsService customUserDetailsService;

    private final UserServicesImpl userServices;

    public JwtAuthenticationResource(AuthenticationManager authenticationManager, JwtTokenUtil jwtTokenUtil, CustomUserDetailsService customUserDetailsService, UserServicesImpl userServices) {
        this.authenticationManager = authenticationManager;
        this.jwtTokenUtil = jwtTokenUtil;
        this.customUserDetailsService = customUserDetailsService;
        this.userServices = userServices;
    }

    /**
     * @param
     */
    @PostMapping("/authenticate")
    public JwtResponse createJsonWebTokenKey(@RequestBody UserRequest userRequest) {

        String email = userRequest.getEmail();
        String password = userRequest.getPassword();
        Users users = userServices.loadUserByEmail(email);

        try{
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(users.getUsername(), password));
        } catch (BadCredentialsException e){
            e.printStackTrace();
        }

        final UserDetails userDetails = customUserDetailsService.loadUserByUsername(users.getUsername());

        final String jwt = jwtTokenUtil.generateToken(userDetails);

        return new JwtResponse(jwt, users.getUsername(), users.getAvatar());

    }

}
