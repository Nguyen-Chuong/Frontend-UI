package com.capstone_project.hbts.resource;

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
            return new ApiResponse(200, null, null);
        } catch (Exception e){
            return new ApiResponse(400, null, null);
        }
    }

    /**
     * return
     */
    @GetMapping("/profile")
    public ApiResponse<?> getUserProfile(@RequestHeader("Authorization") String jwttoken){
        String username = jwtTokenUtil.getUsernameFromToken(jwttoken.substring(7));
        UserDTO userDTO = userService.getUserProfile(username);
        return new ApiResponse(200, userDTO, null, null);
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
            return new ApiResponse<>(400, null, null);
        }else {
            userService.changePassword(username, newPasswordEncoded);
            return new ApiResponse<>(200, null, null);
        }
    }
}
