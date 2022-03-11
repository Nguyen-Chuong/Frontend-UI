package com.capstone_project.hbts.resource;

import com.capstone_project.hbts.constants.ErrorConstant;
import com.capstone_project.hbts.request.BenefitRequest;
import com.capstone_project.hbts.response.ApiResponse;
import com.capstone_project.hbts.service.RoomBenefitService;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@RestController
@CrossOrigin
@Log4j2
@RequestMapping("api/v1")
public class RoomBenefitResource {

    private final RoomBenefitService roomBenefitService;

    public RoomBenefitResource(RoomBenefitService roomBenefitService) {
        this.roomBenefitService = roomBenefitService;
    }

    /**
     * @param benefitRequest
     * @apiNote for provider can add a list benefit to their room type
     * return
     */
    @PostMapping("/add-list-benefit")
    public ResponseEntity<?> addListRoomBenefit(@RequestBody BenefitRequest benefitRequest) {
        log.info("REST request to add a list benefit to provider's room type");
        List<Integer> listIds = benefitRequest.getBenefitIds();
        Set<Integer> setIds = new HashSet<>(listIds);
        if(setIds.size() < listIds.size()){
            return ResponseEntity.badRequest()
                    .body(new ApiResponse<>(400, null,
                            ErrorConstant.ERR_ITEM_001, ErrorConstant.ERR_ITEM_001_LABEL));
        }
        try {
            roomBenefitService.addListBenefitToRoomType(benefitRequest);
            return ResponseEntity.ok()
                    .body(new ApiResponse<>(200, null,
                            null, null));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest()
                    .body(new ApiResponse<>(400, null,
                            ErrorConstant.ERR_000, ErrorConstant.ERR_000_LABEL));
        }
    }

}
