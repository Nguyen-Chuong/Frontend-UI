package com.capstone_project.hbts.resource;

import com.capstone_project.hbts.constants.ErrorConstant;
import com.capstone_project.hbts.request.FacilityRequest;
import com.capstone_project.hbts.response.ApiResponse;
import com.capstone_project.hbts.service.RoomFacilityService;
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
public class RoomFacilityResource {

    private final RoomFacilityService roomFacilityService;

    public RoomFacilityResource(RoomFacilityService roomFacilityService) {
        this.roomFacilityService = roomFacilityService;
    }

    /**
     * @param facilityRequest
     * @apiNote for provider can add a list facility to their room type
     * return
     */
    @PostMapping("/add-list-facility")
    public ResponseEntity<?> addListRoomFacility(@RequestBody FacilityRequest facilityRequest) {
        log.info("REST request to add a list facility to provider's room type");
        List<Integer> listIds = facilityRequest.getFacilityIds();
        Set<Integer> setIds = new HashSet<>(listIds);
        if(setIds.size() < listIds.size()){
            return ResponseEntity.badRequest()
                    .body(new ApiResponse<>(400, null,
                            ErrorConstant.ERR_ITEM_001, ErrorConstant.ERR_ITEM_001_LABEL));
        }
        try {
            roomFacilityService.addListFacilityToRoomType(facilityRequest);
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
