package com.capstone_project.hbts.resource;

import com.capstone_project.hbts.constants.ErrorConstant;
import com.capstone_project.hbts.dto.Booking.UserBookingDetailDTO;
import com.capstone_project.hbts.response.ApiResponse;
import com.capstone_project.hbts.service.BookingDetailService;
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
public class BookingDetailResource {

    private final BookingDetailService bookingDetailService;

    public BookingDetailResource(BookingDetailService bookingDetailService) {
        this.bookingDetailService = bookingDetailService;
    }

    /**
     * @param bookingId
     * return
     */
    @GetMapping("/booking-detail/{bookingId}")
    public ResponseEntity<?> getBookingDetailByBookingId(@PathVariable int bookingId){
        log.info("REST request to get list booking detail by booking ID");

        try{
            List<UserBookingDetailDTO> userBookingDetailDTOList = bookingDetailService.getAllBookingDetail(bookingId);
            return ResponseEntity.ok()
                    .body(new ApiResponse<>(200, userBookingDetailDTOList,
                            null, null));
        }catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.badRequest()
                    .body(new ApiResponse<>(400, null,
                            ErrorConstant.ERR_000, ErrorConstant.ERR_000_LABEL));
        }
    }

}
