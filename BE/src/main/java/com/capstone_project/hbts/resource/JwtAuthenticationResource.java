package com.capstone_project.hbts.resource;

import com.capstone_project.hbts.constants.ErrorConstant;
import com.capstone_project.hbts.dto.UserDTO;
import com.capstone_project.hbts.request.ProviderRequest;
import com.capstone_project.hbts.request.UserRequest;
import com.capstone_project.hbts.response.ApiResponse;
import com.capstone_project.hbts.response.JwtResponse;
import com.capstone_project.hbts.security.jwt.JwtTokenUtil;
import com.capstone_project.hbts.service.ProviderService;
import com.capstone_project.hbts.service.UserService;
import com.capstone_project.hbts.service.impl.CustomUserDetailsService;
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

    private final UserService userService;

    private final ProviderService providerService;

    public JwtAuthenticationResource(AuthenticationManager authenticationManager, JwtTokenUtil jwtTokenUtil,
                                     CustomUserDetailsService customUserDetailsService, UserService userService,
                                     ProviderService providerService) {
        this.authenticationManager = authenticationManager;
        this.jwtTokenUtil = jwtTokenUtil;
        this.customUserDetailsService = customUserDetailsService;
        this.userService = userService;
        this.providerService = providerService;
    }


    /**
     * @param
     */
    @PostMapping("/authenticate/user")
    public ApiResponse<?> createJsonWebTokenKeyForUser(@RequestBody UserRequest userRequest) {

        String email = userRequest.getEmail();
        String password = userRequest.getPassword();
        UserDTO user = userService.loadUserByEmail(email);

        if(user == null){
            return new ApiResponse<>(400, null, ErrorConstant.ERR_USER_003, ErrorConstant.ERR_USER_003_LABEL);
        }

        try{
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(user.getUsername(), password));
        } catch (BadCredentialsException e){
            e.printStackTrace();
            return new ApiResponse<>(400, null, ErrorConstant.ERR_USER_002, ErrorConstant.ERR_USER_002_LABEL);
        }

        final UserDetails userDetails = customUserDetailsService.loadUserByUsername(user.getUsername());

        final String jwt = jwtTokenUtil.generateToken(userDetails);

        JwtResponse jwtResponse = new JwtResponse(jwt, user.getType());

        return new ApiResponse<>(200, jwtResponse, null, null);

    }

    /**
     * @param
     */
    @PostMapping("/authenticate/provider")
    public ApiResponse<?> createJsonWebTokenKeyForProvider(@RequestBody ProviderRequest providerRequest) {

        String email = providerRequest.getEmail();
        String password = providerRequest.getPassword();
        String providerUserName = providerService.loadProviderUsernameByEmail(email);

        if(providerUserName == null){
            return new ApiResponse<>(400, null, ErrorConstant.ERR_USER_003, ErrorConstant.ERR_USER_003_LABEL);
        }

        try{
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(providerUserName, password));
        } catch (BadCredentialsException e){
            e.printStackTrace();
            return new ApiResponse<>(400, null, ErrorConstant.ERR_USER_002, ErrorConstant.ERR_USER_002_LABEL);
        }

        final UserDetails userDetails = customUserDetailsService.loadUserByUsername(providerUserName);

        final String jwt = jwtTokenUtil.generateToken(userDetails);

        return new ApiResponse<>(200, jwt, null, null);

    }

}
