package com.capstone_project.hbts.resource;

import com.capstone_project.hbts.entity.Users;
import com.capstone_project.hbts.request.UserRequest;
import com.capstone_project.hbts.response.ApiResponse;
import com.capstone_project.hbts.response.JwtResponse;
import com.capstone_project.hbts.security.CustomUserDetailsService;
import com.capstone_project.hbts.security.jwt.JwtTokenUtil;
import org.springframework.http.ResponseEntity;
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

    public JwtAuthenticationResource(AuthenticationManager authenticationManager, JwtTokenUtil jwtTokenUtil, CustomUserDetailsService customUserDetailsService) {
        this.authenticationManager = authenticationManager;
        this.jwtTokenUtil = jwtTokenUtil;
        this.customUserDetailsService = customUserDetailsService;
    }

    @PostMapping("/authenticate")
    public ResponseEntity<?> createJsonWebTokenKey(@RequestBody UserRequest userRequest) throws Exception {

        String username = userRequest.getUsername();
        String password = userRequest.getPassword();

        try{
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
        } catch (BadCredentialsException e){
            throw new Exception("Incorrect username or password", e);
        }

        final UserDetails userDetails = customUserDetailsService.loadUserByUsername(username);

        final String jwt = jwtTokenUtil.generateToken(userDetails);

        return ResponseEntity.ok(new JwtResponse(jwt));

    }

    @PostMapping("/register")
    public ApiResponse<?> register(@RequestBody UserRequest userRequest){
        return customUserDetailsService.register(userRequest);
    }

}
