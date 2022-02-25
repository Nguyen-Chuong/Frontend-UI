package com.capstone_project.hbts.resource;

import com.capstone_project.hbts.constants.ErrorConstant;
import com.capstone_project.hbts.request.ProviderRequest;
import com.capstone_project.hbts.response.ApiResponse;
import com.capstone_project.hbts.service.ProviderService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
public class ProviderResource {

    private final ProviderService providerService;

    public ProviderResource(ProviderService providerService) {
        this.providerService = providerService;
    }

    /**
     * @param
     */
    @PostMapping("/register/provider")
    public ApiResponse<?> register(@RequestBody ProviderRequest providerRequest){
        if(providerService.isEmailExist(providerRequest.getEmail())){
            return new ApiResponse<>(400, ErrorConstant.ERR_USER_004, ErrorConstant.ERR_USER_004_LABEL);
        }
        if(providerService.isUsernameExist(providerRequest.getUsername())){
            return new ApiResponse<>(400, ErrorConstant.ERR_USER_005, ErrorConstant.ERR_USER_005_LABEL);
        }
        try {
            providerService.register(providerRequest);
            return new ApiResponse<>(200, null, null);
        } catch (Exception e){
            e.printStackTrace();
            return new ApiResponse<>(400, ErrorConstant.ERR_000, ErrorConstant.ERR_000_LABEL);
        }
    }

}
