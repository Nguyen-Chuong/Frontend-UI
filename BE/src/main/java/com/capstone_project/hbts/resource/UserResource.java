package com.capstone_project.hbts.resource;

import com.capstone_project.hbts.dto.UserDTO;
import com.capstone_project.hbts.request.UserRequest;
import com.capstone_project.hbts.response.ApiResponse;
import com.capstone_project.hbts.service.impl.UserServicesImpl;
import org.springframework.web.bind.annotation.*;

@RestController
public class UserResource {

    private final UserServicesImpl userServices;

    public UserResource(UserServicesImpl userServices) {
        this.userServices = userServices;
    }

    /**
     * @param
     */
    @PostMapping("/register")
    public ApiResponse<?> register(@RequestBody UserRequest userRequest){
        try {
            userServices.register(userRequest);
            return new ApiResponse(200, null, null);
        } catch (Exception e){
            return new ApiResponse(400, null, null);
        }
    }

    /**
     * @param username
     * return
     */
    @GetMapping("/profile")
    public ApiResponse<?> getUserProfile(@RequestParam String username){
        UserDTO userDTO = userServices.getUserProfile(username);
        return new ApiResponse(200, userDTO, null, null);
    }
}
