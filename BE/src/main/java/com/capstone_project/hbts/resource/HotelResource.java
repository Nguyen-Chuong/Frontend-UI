package com.capstone_project.hbts.resource;

import com.capstone_project.hbts.constants.ErrorConstant;
import com.capstone_project.hbts.constants.ValidateConstant;
import com.capstone_project.hbts.dto.HotelDTO;
import com.capstone_project.hbts.response.ApiResponse;
import com.capstone_project.hbts.service.HotelService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.sql.Date;

@CrossOrigin
@RestController
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
    public ApiResponse<?> searchHotel(@RequestParam int districtId,
                                      @RequestParam Date dateIn,
                                      @RequestParam Date dateOut,
                                      @RequestParam int numberOfPeople,
                                      @RequestParam int numberOfRoom,
                                      @RequestParam(defaultValue = ValidateConstant.PAGE) int page,
                                      @RequestParam(defaultValue = ValidateConstant.PER_PAGE) int pageSize){

        try{
            Page<HotelDTO> hotelDTOPage = hotelService.searchHotel(districtId, dateIn, dateOut, numberOfPeople, numberOfRoom,
                    PageRequest.of(page, pageSize));
            return new ApiResponse(200, hotelDTOPage, null, null);
        }catch (Exception e){
            e.printStackTrace();
            return new ApiResponse(400, ErrorConstant.ERR_000, ErrorConstant.ERR_000_LABEL);
        }
    }

}
