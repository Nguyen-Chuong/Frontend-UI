package com.capstone_project.hbts.resource;

import com.capstone_project.hbts.constants.ErrorConstant;
import com.capstone_project.hbts.constants.ValidateConstant;
import com.capstone_project.hbts.dto.Hotel.HotelDTO;
import com.capstone_project.hbts.dto.Hotel.HotelDetailDTO;
import com.capstone_project.hbts.response.ApiResponse;
import com.capstone_project.hbts.response.DataPagingResponse;
import com.capstone_project.hbts.service.HotelService;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.sql.Date;

@CrossOrigin
@RestController
@Log4j2
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
    @GetMapping("/public/search-hotel")
    public ResponseEntity<?> searchHotel(@RequestParam int districtId,
                                         @RequestParam Date dateIn,
                                         @RequestParam Date dateOut,
                                         @RequestParam int numberOfPeople,
                                         @RequestParam int numberOfRoom,
                                         @RequestParam(defaultValue = ValidateConstant.PAGE) int page,
                                         @RequestParam(defaultValue = ValidateConstant.PER_PAGE) int pageSize){
        log.info("REST request to search hotel via district id and other info");

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

    /**
     * @param status
     * @param page
     * @param pageSize
     * @apiNote for admin/manager can view list all hotel in the system
     * @return
     */
    @GetMapping("/get-hotel/{status}")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_MANAGER')")
    public ResponseEntity<?> getAllHotel(@PathVariable int status,
                                         @RequestParam(defaultValue = ValidateConstant.PAGE) int page,
                                         @RequestParam(defaultValue = ValidateConstant.PER_PAGE) int pageSize){
        log.info("REST request to get all hotel by status for admin");

        try{
            Page<HotelDTO> hotelDTOPage = hotelService.getAllHotels(status, PageRequest.of(page, pageSize));

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

    /**
     * @param hotelId
     * @apiNote for admin/manager can view detail of a hotel
     * @return
     */
    @GetMapping("/hotel-detail/{hotelId}")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_MANAGER')")
    public ResponseEntity<?> viewHotelDetail(@PathVariable int hotelId){
        log.info("REST request to get hotel detail by hotel id");

        try{
            HotelDetailDTO hotelDetailDTO = hotelService.getDetailHotelById(hotelId);

            return ResponseEntity.ok()
                    .body(new ApiResponse<>(200, hotelDetailDTO,
                            null, null));
            // may catch more kinda exception
        }catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.badRequest()
                    .body(new ApiResponse<>(400, null,
                            ErrorConstant.ERR_000, ErrorConstant.ERR_000_LABEL));
        }
    }

    /**
     * @param hotelId
     * @apiNote for admin can ban a hotel
     * @return
     */
    @PatchMapping("/ban-hotel/{hotelId}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> banHotelById(@PathVariable int hotelId){
        log.info("REST request to ban hotel by hotel id");

        try{
            hotelService.banHotelByHotelId(hotelId);

            return ResponseEntity.ok()
                    .body(new ApiResponse<>(200, null,
                            null, null));
        }catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.badRequest()
                    .body(new ApiResponse<>(400, null,
                            ErrorConstant.ERR_000, ErrorConstant.ERR_000_LABEL));
        }
    }

}
