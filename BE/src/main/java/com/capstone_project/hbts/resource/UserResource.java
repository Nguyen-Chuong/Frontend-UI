package com.capstone_project.hbts.resource;

import com.capstone_project.hbts.constants.ErrorConstant;
import com.capstone_project.hbts.dto.UserDTO;
import com.capstone_project.hbts.dto.VipDTO;
import com.capstone_project.hbts.request.UserRequest;
import com.capstone_project.hbts.response.ApiResponse;
import com.capstone_project.hbts.security.jwt.JwtTokenUtil;
import com.capstone_project.hbts.service.UserService;
import org.springframework.http.ResponseEntity;
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
    @PostMapping("/register/user")
    public ResponseEntity<?> register(@RequestBody UserRequest userRequest){
        if(userService.loadUserByEmail(userRequest.getEmail()) != null){
            return ResponseEntity.badRequest()
                    .body(new ApiResponse<>(400, null,
                            ErrorConstant.ERR_USER_004, ErrorConstant.ERR_USER_004_LABEL));
        }
        if(userService.getUserProfile("u-" + userRequest.getUsername()) != null){
            return ResponseEntity.badRequest()
                    .body(new ApiResponse<>(400, null,
                            ErrorConstant.ERR_USER_005, ErrorConstant.ERR_USER_005_LABEL));
        }
        try {
            // type 0 is normal user and 1 is admin, register is always user
            userRequest.setType(0);
            // name prefix for user table
            userRequest.setUsername("u-" + userRequest.getUsername());
            // set vip status auto 1 for new user
            VipDTO vipDTO = new VipDTO();
            vipDTO.setId(1);
            userRequest.setIdVip(vipDTO);
            userService.register(userRequest);
            return ResponseEntity.ok()
                    .body(new ApiResponse<>(200, null,
                            null, null));
        } catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.badRequest()
                    .body(new ApiResponse<>(400, null,
                            ErrorConstant.ERR_000, ErrorConstant.ERR_000_LABEL));
        }
    }

    /**
     * return
     */
    @GetMapping("/profile/user")
    public ResponseEntity<?> getUserProfile(@RequestHeader("Authorization") String jwttoken){
        try {
            String username = jwtTokenUtil.getUsernameFromToken(jwttoken.substring(7));
            UserDTO userDTO = userService.getUserProfile(username);
            return ResponseEntity.ok()
                    .body(new ApiResponse<>(200, userDTO,
                            null, null));
        }catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.badRequest()
                    .body(new ApiResponse<>(400, null,
                            ErrorConstant.ERR_000, ErrorConstant.ERR_000_LABEL));
        }
    }

    /**
     * @param oldPass
     * @param newPass
     * return
     */
    @PatchMapping("/change-password")
    public ResponseEntity<?> changePassword(@RequestHeader("Authorization") String jwttoken,
                                         @RequestParam String oldPass,
                                         @RequestParam String newPass){
        BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
        String newPasswordEncoded = bCryptPasswordEncoder.encode(newPass);

        String username = jwtTokenUtil.getUsernameFromToken(jwttoken.substring(7));
        String userPassword = userService.getOldPassword(username);

        if(!bCryptPasswordEncoder.matches(oldPass, userPassword)){
            return ResponseEntity.badRequest()
                    .body(new ApiResponse<>(400, null,
                            ErrorConstant.ERR_USER_001, ErrorConstant.ERR_USER_001_LABEL));
        }else {
            try {
                userService.changePassword(username, newPasswordEncoded);
                return ResponseEntity.ok()
                        .body(new ApiResponse<>(200, null,
                                null, null));
            }catch (Exception e){
                e.printStackTrace();
                return ResponseEntity.badRequest()
                        .body(new ApiResponse<>(400, null,
                                ErrorConstant.ERR_000, ErrorConstant.ERR_000_LABEL));
            }
        }
    }

    /**
     * @param userDTO
     * return
     */
    @PatchMapping("/update-profile")
    public ResponseEntity<?> updateUserProfile(@RequestBody UserDTO userDTO){
        try{
            userService.updateUserProfile(userDTO);
            return ResponseEntity.ok()
                    .body(new ApiResponse<>(200, null,
                            null, null));
        }catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.badRequest()
                    .body(new ApiResponse<>(400, null,
                            ErrorConstant.ERR_000, ErrorConstant.ERR_000_LABEL));
        }
    }

    /**
     * @Param username
     * return
     */
    @GetMapping("/check/user/username/{username}")
    public ResponseEntity<?> isUsernameExist(@PathVariable String username){
        try {
            boolean isUsernameExist = userService.isUsernameExist(username);
            return ResponseEntity.ok()
                    .body(new ApiResponse<>(200, isUsernameExist,
                            null, null));
        }catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.badRequest()
                    .body(new ApiResponse<>(400, null,
                            ErrorConstant.ERR_000, ErrorConstant.ERR_000_LABEL));
        }
    }

    /**
     * @Param email
     * return
     */
    @GetMapping("/check/user/email/{email}")
    public ResponseEntity<?> isEmailExist(@PathVariable String email){
        try {
            boolean isEmailExist = userService.isEmailExist(email);
            return ResponseEntity.ok()
                    .body(new ApiResponse<>(200, isEmailExist,
                            null, null));
        }catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.badRequest()
                    .body(new ApiResponse<>(400, null,
                            ErrorConstant.ERR_000, ErrorConstant.ERR_000_LABEL));
        }
    }

    // api update vip status will be called when user complete a booking
    /**
     * @param userId
     * return
     */
    @PatchMapping("/update-vip-status/{userId}")
    public ResponseEntity<?> updateVipStatus(@PathVariable int userId){
        try{
            userService.updateVipStatus(userId);
            return ResponseEntity.ok()
                    .body(new ApiResponse<>(200, null,
                            null, null));
        }catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.badRequest()
                    .body(new ApiResponse<>(400, null,
                            ErrorConstant.ERR_000, ErrorConstant.ERR_000_LABEL));
        }
    }

}
