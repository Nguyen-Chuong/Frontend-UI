package com.capstone_project.hbts.resource;

import com.capstone_project.hbts.constants.ErrorConstant;
import com.capstone_project.hbts.dto.ProviderDTO;
import com.capstone_project.hbts.request.ProviderRequest;
import com.capstone_project.hbts.response.ApiResponse;
import com.capstone_project.hbts.security.jwt.JwtTokenUtil;
import com.capstone_project.hbts.service.ProviderService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
public class ProviderResource {

    private final ProviderService providerService;

    private final JwtTokenUtil jwtTokenUtil;

    public ProviderResource(ProviderService providerService, JwtTokenUtil jwtTokenUtil) {
        this.providerService = providerService;
        this.jwtTokenUtil = jwtTokenUtil;
    }

    /**
     * @param
     */
    @PostMapping("/register/provider")
    public ApiResponse<?> register(@RequestBody ProviderRequest providerRequest){
        if(providerService.isEmailExist(providerRequest.getEmail())){
            return new ApiResponse<>(400, ErrorConstant.ERR_USER_004, ErrorConstant.ERR_USER_004_LABEL);
        }
        if(providerService.isUsernameExist("p-" + providerRequest.getUsername())){
            return new ApiResponse<>(400, ErrorConstant.ERR_USER_005, ErrorConstant.ERR_USER_005_LABEL);
        }
        try {
            providerRequest.setUsername("p-" + providerRequest.getUsername());
            providerService.register(providerRequest);
            return new ApiResponse<>(200, null, null);
        } catch (Exception e){
            e.printStackTrace();
            return new ApiResponse<>(400, ErrorConstant.ERR_000, ErrorConstant.ERR_000_LABEL);
        }
    }

    /**
     * return
     */
    @GetMapping("/profile/provider")
    public ApiResponse<?> getProviderProfile(@RequestHeader("Authorization") String jwttoken){
        try {
            String username = jwtTokenUtil.getUsernameFromToken(jwttoken.substring(7));
            ProviderDTO providerDTO = providerService.getProviderProfile(username);
            return new ApiResponse<>(200, providerDTO, null, null);
        }catch (Exception e){
            e.printStackTrace();
            return new ApiResponse<>(400, ErrorConstant.ERR_000, ErrorConstant.ERR_000_LABEL);
        }
    }

    /**
     * @Param username
     * return
     */
    @GetMapping("/check/provider/username/{username}")
    public ApiResponse<?> isUsernameExist(@PathVariable String username){
        try {
            boolean isUsernameExist = providerService.isUsernameExist(username);
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
    @GetMapping("/check/provider/email/{email}")
    public ApiResponse<?> isEmailExist(@PathVariable String email){
        try {
            boolean isEmailExist = providerService.isEmailExist(email);
            return new ApiResponse<>(200, isEmailExist, null, null);
        }catch (Exception e){
            e.printStackTrace();
            return new ApiResponse<>(400, ErrorConstant.ERR_000, ErrorConstant.ERR_000_LABEL);
        }
    }

}
