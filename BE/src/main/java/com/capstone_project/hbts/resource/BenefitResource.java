package com.capstone_project.hbts.resource;

import com.capstone_project.hbts.constants.ErrorConstant;
import com.capstone_project.hbts.dto.Benefit.BenefitDTO;
import com.capstone_project.hbts.response.ApiResponse;
import com.capstone_project.hbts.service.BenefitService;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin
@RestController
@Log4j2
@RequestMapping("/api/v1")
public class BenefitResource {

    private final BenefitService benefitService;

    public BenefitResource(BenefitService benefitService) {
        this.benefitService = benefitService;
    }

    /**
     * @param hotelId
     * return
     */
    @GetMapping("/list-hotel-benefit/{hotelId}")
    public ResponseEntity<?> getListBenefitByHotelId(@PathVariable int hotelId) {
        log.info("REST request to get list benefit by hotel id");

        try {
            List<BenefitDTO> benefitDTOList = benefitService.getListBenefitByHotelId(hotelId);
            return ResponseEntity.ok()
                    .body(new ApiResponse<>(200, benefitDTOList,
                            null, null));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest()
                    .body(new ApiResponse<>(400, null,
                            ErrorConstant.ERR_000, ErrorConstant.ERR_000_LABEL));
        }
    }

}
