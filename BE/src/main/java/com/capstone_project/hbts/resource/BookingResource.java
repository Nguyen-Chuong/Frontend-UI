package com.capstone_project.hbts.resource;

import com.capstone_project.hbts.constants.ErrorConstant;
import com.capstone_project.hbts.dto.Booking.UserBookingDTO;
import com.capstone_project.hbts.response.ApiResponse;
import com.capstone_project.hbts.service.BookingService;
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
public class BookingResource {

    private final BookingService bookingService;

    public BookingResource(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    /**
     * @param userId
     * return
     */
    @GetMapping("/user-bookings/{userId}")
    public ResponseEntity<?> getUserBooking(@PathVariable int userId){
        log.info("REST request to get list user's booking by ID");

        try{
            List<UserBookingDTO> userBookingDTOList = bookingService.getAllBookings(userId);
            return ResponseEntity.ok()
                    .body(new ApiResponse<>(200, userBookingDTOList,
                            null, null));
        }catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.badRequest()
                    .body(new ApiResponse<>(400, null,
                            ErrorConstant.ERR_000, ErrorConstant.ERR_000_LABEL));
        }
    }

    /**
     * @param reviewStatus
     * @param userId
     * return
     */
    @GetMapping("/bookings-review/{userId}/{reviewStatus}")
    public ResponseEntity<?> getUserBookingReview(@PathVariable int reviewStatus,
                                                  @PathVariable int userId){
        log.info("REST request to get list user's booking need to review or not");

        try{
            List<UserBookingDTO> userBookingDTOList = bookingService.getAllBookingsReview(reviewStatus, userId);
            return ResponseEntity.ok()
                    .body(new ApiResponse<>(200, userBookingDTOList,
                            null, null));
        }catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.badRequest()
                    .body(new ApiResponse<>(400, null,
                            ErrorConstant.ERR_000, ErrorConstant.ERR_000_LABEL));
        }
    }

    // api insert a booking into booking table after user booked
    // and modify later when user cancelled or do smth
    // here

    /**
     * @param userId
     * return
     */
    @GetMapping("/bookings-completed/{userId}")
    public ResponseEntity<?> getNumberBookingsCompleted(@PathVariable int userId){
        log.info("REST request to get number booking completed by user id");

        try{
            int numberBookingCompleted = bookingService.getNumberBookingsCompleted(userId);
            return ResponseEntity.ok()
                    .body(new ApiResponse<>(200, numberBookingCompleted,
                            null, null));
        }catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.badRequest()
                    .body(new ApiResponse<>(400, null,
                            ErrorConstant.ERR_000, ErrorConstant.ERR_000_LABEL));
        }
    }

    /**
     * @param status
     * @param userId
     * return
     */
    @GetMapping("/bookings-by-status/{userId}/{status}")
    public ResponseEntity<?> getUserBookingByStatus(@PathVariable int status,
                                                  @PathVariable int userId){
        log.info("REST request to get list user's booking by status");

        try{
            List<UserBookingDTO> userBookingDTOList = bookingService.getAllBookingsByStatus(status, userId);
            return ResponseEntity.ok()
                    .body(new ApiResponse<>(200, userBookingDTOList,
                            null, null));
        }catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.badRequest()
                    .body(new ApiResponse<>(400, null,
                            ErrorConstant.ERR_000, ErrorConstant.ERR_000_LABEL));
        }
    }

}
