package com.capstone_project.hbts.resource;

import com.capstone_project.hbts.constants.ErrorConstant;
import com.capstone_project.hbts.dto.UserDTO;
import com.capstone_project.hbts.request.UserRequest;
import com.capstone_project.hbts.response.ApiResponse;
import com.capstone_project.hbts.security.jwt.JwtTokenUtil;
import com.capstone_project.hbts.service.UserService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
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
    // Consider about add new admin account / assign new account to db
    // may raw adding but need to think 'bout encrypt password
    // admin account cannot be registered
    @PostMapping("/register")
    public ApiResponse<?> register(@RequestBody UserRequest userRequest){
        if(userService.loadUserByEmail(userRequest.getEmail()) != null){
            return new ApiResponse<>(400, ErrorConstant.ERR_USER_004, ErrorConstant.ERR_USER_004_LABEL);
        }
        if(userService.getUserProfile(userRequest.getUsername()) != null){
            return new ApiResponse<>(400, ErrorConstant.ERR_USER_005, ErrorConstant.ERR_USER_005_LABEL);
        }
        try {
            // type 0 is normal user and 1 is admin
            userRequest.setType(0);
            userService.register(userRequest);
            return new ApiResponse<>(200, null, null);
        } catch (Exception e){
            e.printStackTrace();
            return new ApiResponse<>(400, ErrorConstant.ERR_000, ErrorConstant.ERR_000_LABEL);
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
            return new ApiResponse<>(200, userDTO, null, null);
        }catch (Exception e){
            e.printStackTrace();
            return new ApiResponse<>(400, ErrorConstant.ERR_000, ErrorConstant.ERR_000_LABEL);
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
            try {
                userService.changePassword(username, newPasswordEncoded);
                return new ApiResponse<>(200, null, null);
            }catch (Exception e){
                e.printStackTrace();
                return new ApiResponse<>(400, ErrorConstant.ERR_000, ErrorConstant.ERR_000_LABEL);
            }
        }
    }

    /**
     * @param userDTO
     * return
     */
    @PatchMapping("/update-profile")
    public ApiResponse<?> updateUserProfile(@RequestBody UserDTO userDTO){
        try{
            userService.updateUserProfile(userDTO);
            return new ApiResponse<>(200, null, null);
        }catch (Exception e){
            e.printStackTrace();
            return new ApiResponse<>(400, ErrorConstant.ERR_000, ErrorConstant.ERR_000_LABEL);
        }
    }

    /**
     * @Param username
     * return
     */
    @GetMapping("/check/username/{username}")
    public ApiResponse<?> isUsernameExist(@PathVariable String username){
        try {
            boolean isUsernameExist = userService.isUsernameExist(username);
            return new ApiResponse<>(200, isUsernameExist, null, null);
        }catch (Exception e){
            e.printStackTrace();
            return new ApiResponse<>(400, ErrorConstant.ERR_000, ErrorConstant.ERR_000_LABEL);
        }
    }

    /**
     * @Param email
     * return
     */
    @GetMapping("/check/email/{email}")
    public ApiResponse<?> isEmailExist(@PathVariable String email){
        try {
            boolean isEmailExist = userService.isEmailExist(email);
            return new ApiResponse<>(200, isEmailExist, null, null);
        }catch (Exception e){
            e.printStackTrace();
            return new ApiResponse<>(400, ErrorConstant.ERR_000, ErrorConstant.ERR_000_LABEL);
        }
    }

    // api update vip status will be called when user complete a booking
    /**
     * @param userId
     * return
     */
    @PatchMapping("/update-vip-status/{userId}")
    public ApiResponse<?> updateVipStatus(@PathVariable int userId){
        try{
            userService.updateVipStatus(userId);
            return new ApiResponse<>(200, null, null);
        }catch (Exception e){
            e.printStackTrace();
            return new ApiResponse<>(400, ErrorConstant.ERR_000, ErrorConstant.ERR_000_LABEL);
        }
    }

}
