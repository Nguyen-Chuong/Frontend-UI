package com.capstone_project.hbts.resource;

import com.capstone_project.hbts.constants.ErrorConstant;
import com.capstone_project.hbts.decryption.DataDecryption;
import com.capstone_project.hbts.dto.Benefit.ObjectBenefit;
import com.capstone_project.hbts.response.ApiResponse;
import com.capstone_project.hbts.service.BenefitService;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin
@RestController
@Log4j2
@RequestMapping("/api/v1")
public class BenefitResource {

    private final BenefitService benefitService;

    private final DataDecryption dataDecryption;

    public BenefitResource(BenefitService benefitService, DataDecryption dataDecryption) {
        this.benefitService = benefitService;
        this.dataDecryption = dataDecryption;
    }

    /**
     * @param hotelId
     * return
     */
    @GetMapping("/public/list-hotel-benefit")
    public ResponseEntity<?> getListBenefitByHotelId(@RequestParam String hotelId) {
        log.info("REST request to get list benefit by hotel id");
        int id;
        try {
            id = dataDecryption.convertEncryptedDataToInt(hotelId);
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(new ApiResponse<>(400, null,
                            ErrorConstant.ERR_DATA_001, ErrorConstant.ERR_DATA_001_LABEL));
        }
        try {
            List<ObjectBenefit> benefitObjectList = benefitService.getListBenefitByHotelId(id);
            return ResponseEntity.ok()
                    .body(new ApiResponse<>(200, benefitObjectList,
                            null, null));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest()
                    .body(new ApiResponse<>(400, null,
                            ErrorConstant.ERR_000, ErrorConstant.ERR_000_LABEL));
        }
    }

}
