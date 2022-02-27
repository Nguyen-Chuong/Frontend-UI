package com.capstone_project.hbts.resource;

import com.capstone_project.hbts.constants.ErrorConstant;
import com.capstone_project.hbts.dto.Actor.UserDTO;
import com.capstone_project.hbts.request.JwtRequest;
import com.capstone_project.hbts.request.ProviderRequest;
import com.capstone_project.hbts.request.UserRequest;
import com.capstone_project.hbts.response.ApiResponse;
import com.capstone_project.hbts.response.JwtResponse;
import com.capstone_project.hbts.security.jwt.JwtTokenUtil;
import com.capstone_project.hbts.service.JwtService;
import com.capstone_project.hbts.service.ProviderService;
import com.capstone_project.hbts.service.UserService;
import com.capstone_project.hbts.service.impl.CustomUserDetailsService;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
@Log4j2
@RequestMapping("api/v1")
public class JwtAuthenticationResource {

    private final AuthenticationManager authenticationManager;

    private final JwtTokenUtil jwtTokenUtil;

    private final CustomUserDetailsService customUserDetailsService;

    private final UserService userService;

    private final ProviderService providerService;

    private final JwtService jwtService;

    public JwtAuthenticationResource(AuthenticationManager authenticationManager, JwtTokenUtil jwtTokenUtil,
                                     CustomUserDetailsService customUserDetailsService, UserService userService,
                                     ProviderService providerService, JwtService jwtService) {
        this.authenticationManager = authenticationManager;
        this.jwtTokenUtil = jwtTokenUtil;
        this.customUserDetailsService = customUserDetailsService;
        this.userService = userService;
        this.providerService = providerService;
        this.jwtService = jwtService;
    }


    /**
     * @param
     */
    @PostMapping("/authenticate/user")
    public ResponseEntity<?> createJsonWebTokenKeyForUser(@RequestBody UserRequest userRequest) {
        log.info("REST request to authenticate user request : {}", userRequest);

        String email = userRequest.getEmail();
        String password = userRequest.getPassword();
        UserDTO user = userService.loadUserByEmail(email);

        if(user == null){
            return ResponseEntity.badRequest()
                    .body(new ApiResponse<>(400, null,
                            ErrorConstant.ERR_USER_003, ErrorConstant.ERR_USER_003_LABEL));
        }

        try{
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(user.getUsername(), password));
        } catch (BadCredentialsException e){
            e.printStackTrace();
            return ResponseEntity.badRequest()
                    .body(new ApiResponse<>(400, null,
                            ErrorConstant.ERR_USER_002, ErrorConstant.ERR_USER_002_LABEL));
        }

        final UserDetails userDetails = customUserDetailsService.loadUserByUsername(user.getUsername());

        final String jwt = jwtTokenUtil.generateToken(userDetails);

        JwtResponse jwtResponse = new JwtResponse(jwt, user.getType());

        if(user.getType() == 1){
            JwtRequest jwtRequest = new JwtRequest(1, jwt);
            try{
                jwtService.saveTokenKeyForAdmin(jwtRequest);
            }catch (Exception e){
                e.printStackTrace();
            }
        }

        return ResponseEntity.ok()
                .body(new ApiResponse<>(200, jwtResponse,
                        null, null));
    }

    /**
     * @param
     */
    @PostMapping("/authenticate/provider")
    public ResponseEntity<?> createJsonWebTokenKeyForProvider(@RequestBody ProviderRequest providerRequest) {
        log.info("REST request to authenticate provider request : {}", providerRequest);

        String email = providerRequest.getEmail();
        String password = providerRequest.getPassword();
        String providerUserName = providerService.loadProviderUsernameByEmail(email);

        if(providerUserName == null){
            return ResponseEntity.badRequest()
                    .body(new ApiResponse<>(400, null,
                            ErrorConstant.ERR_USER_003, ErrorConstant.ERR_USER_003_LABEL));
        }

        try{
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(providerUserName, password));
        } catch (BadCredentialsException e){
            e.printStackTrace();
            return ResponseEntity.badRequest()
                    .body(new ApiResponse<>(400, null,
                            ErrorConstant.ERR_USER_002, ErrorConstant.ERR_USER_002_LABEL));
        }

        final UserDetails userDetails = customUserDetailsService.loadUserByUsername(providerUserName);

        final String jwt = jwtTokenUtil.generateToken(userDetails);

        return ResponseEntity.ok()
                .body(new ApiResponse<>(200, jwt,
                        null, null));

    }

    /**
     * @Param
     * return
     */
    @GetMapping("/authenticate/admin")
    public ResponseEntity<?> getJsonWebTokenKeyForAdmin(){
        log.info("REST request to get jwt token for admin");

        try {
            String jwt = jwtService.getTokenKeyForAdmin();
            return ResponseEntity.ok()
                    .body(new ApiResponse<>(200, jwt,
                            null, null));
        }catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.badRequest()
                    .body(new ApiResponse<>(400, null,
                            ErrorConstant.ERR_000, ErrorConstant.ERR_000_LABEL));
        }
    }

}
