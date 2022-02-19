package com.capstone_project.hbts.resource;

import com.capstone_project.hbts.constants.ErrorConstant;
import com.capstone_project.hbts.dto.VipDTO;
import com.capstone_project.hbts.response.ApiResponse;
import com.capstone_project.hbts.service.VipService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin
@RestController
public class VipResource {

    private final VipService vipService;

    public VipResource(VipService vipService) {
        this.vipService = vipService;
    }

    /**
     * return
     */
    @GetMapping("/vip-info")
    public ApiResponse<?> getVipStatus(){
        try {
            List<VipDTO> vipDTOList = vipService.getVipStatus();
            return new ApiResponse(200, vipDTOList, null, null);
        }catch (Exception e){
            e.printStackTrace();
            return new ApiResponse(400, ErrorConstant.ERR_000, ErrorConstant.ERR_000_LABEL);
        }
    }

}
