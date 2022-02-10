package com.capstone_project.hbts.resource;

import com.capstone_project.hbts.constants.ErrorConstant;
import com.capstone_project.hbts.dto.UserDTO;
import com.capstone_project.hbts.request.UserRequest;
import com.capstone_project.hbts.response.ApiResponse;
import com.capstone_project.hbts.security.jwt.JwtTokenUtil;
import com.capstone_project.hbts.service.UserService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
public class UserResource {

    private final UserService userService;

    private final JwtTokenUtil jwtTokenUtil;

    public UserResource(UserService userService, JwtTokenUtil jwtTokenUtil) {
        this.userService = userService;
        this.jwtTokenUtil = jwtTokenUtil;
    }

    /**
     * @param
     */
    @PostMapping("/register")
    public ApiResponse<?> register(@RequestBody UserRequest userRequest){
        try {
            userService.register(userRequest);
            // check duplicate email, username
            return new ApiResponse(200, null, null);
        } catch (Exception e){
            return new ApiResponse(400, ErrorConstant.ERR_000, ErrorConstant.ERR_000_LABEL);
        }
    }

    /**
     * return
     */
    @GetMapping("/profile")
    public ApiResponse<?> getUserProfile(@RequestHeader("Authorization") String jwttoken){
        try {
            String username = jwtTokenUtil.getUsernameFromToken(jwttoken.substring(7));
            UserDTO userDTO = userService.getUserProfile(username);
            return new ApiResponse(200, userDTO, null, null);
        }catch (Exception e){
            e.printStackTrace();
            return new ApiResponse(400, ErrorConstant.ERR_000, ErrorConstant.ERR_000_LABEL);
        }
    }

    /**
     * @param oldPass
     * @param newPass
     * return
     */
    @PatchMapping("/change-password")
    public ApiResponse<?> changePassword(@RequestHeader("Authorization") String jwttoken,
                                         @RequestParam String oldPass,
                                         @RequestParam String newPass){
        BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
        String newPasswordEncoded = bCryptPasswordEncoder.encode(newPass);

        String username = jwtTokenUtil.getUsernameFromToken(jwttoken.substring(7));
        String userPassword = userService.getOldPassword(username);

        if(!bCryptPasswordEncoder.matches(oldPass, userPassword)){
            return new ApiResponse<>(400, ErrorConstant.ERR_USER_001, ErrorConstant.ERR_USER_001_LABEL);
        }else {
            userService.changePassword(username, newPasswordEncoded);
            return new ApiResponse<>(200, null, null);
        }
    }
}
