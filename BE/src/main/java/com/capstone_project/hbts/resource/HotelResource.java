package com.capstone_project.hbts.resource;

import com.capstone_project.hbts.constants.ErrorConstant;
import com.capstone_project.hbts.constants.ValidateConstant;
import com.capstone_project.hbts.dto.HotelDTO;
import com.capstone_project.hbts.response.ApiResponse;
import com.capstone_project.hbts.response.DataPagingResponse;
import com.capstone_project.hbts.service.HotelService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.sql.Date;

@CrossOrigin
@RestController
@RequestMapping("api/v1")
public class HotelResource {

    private final HotelService hotelService;

    public HotelResource(HotelService hotelService) {
        this.hotelService = hotelService;
    }

    /**
     * @param districtId
     * @param dateIn
     * @param dateOut
     * @param numberOfPeople
     * @param numberOfRoom
     * @param page
     * @param pageSize
     * @return
     */
    @GetMapping("/search-hotel")
    public ResponseEntity<?> searchHotel(@RequestParam int districtId,
                                         @RequestParam Date dateIn,
                                         @RequestParam Date dateOut,
                                         @RequestParam int numberOfPeople,
                                         @RequestParam int numberOfRoom,
                                         @RequestParam(defaultValue = ValidateConstant.PAGE) int page,
                                         @RequestParam(defaultValue = ValidateConstant.PER_PAGE) int pageSize){

        try{
            Page<HotelDTO> hotelDTOPage = hotelService.searchHotel(districtId, dateIn, dateOut,
                    numberOfPeople, numberOfRoom, PageRequest.of(page, pageSize));

            DataPagingResponse<?> dataPagingResponse = new DataPagingResponse<>(hotelDTOPage.getContent(),
                    hotelDTOPage.getTotalElements(), page, hotelDTOPage.getSize());

            return ResponseEntity.ok()
                    .body(new ApiResponse<>(200, dataPagingResponse,
                            null, null));
            // may catch more kinda exception
        }catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.badRequest()
                    .body(new ApiResponse<>(400, null,
                            ErrorConstant.ERR_000, ErrorConstant.ERR_000_LABEL));
        }
    }

}
