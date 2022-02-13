package com.capstone_project.hbts.resource;

import com.capstone_project.hbts.constants.ErrorConstant;
import com.capstone_project.hbts.dto.UserBookingDTO;
import com.capstone_project.hbts.response.ApiResponse;
import com.capstone_project.hbts.service.BookingService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin
@RestController
public class BookingResource {

    private final BookingService bookingService;

    public BookingResource(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    /**
     * @param userId
     * return
     */
    @GetMapping("/user-bookings")
    public ApiResponse<?> getUserBooking(@RequestParam int userId){
        try{
            List<UserBookingDTO> userBookingDTOList = bookingService.getAllBookings(userId);
            return new ApiResponse(200, userBookingDTOList, null, null);
        }catch (Exception e){
            e.printStackTrace();
            return new ApiResponse(400, ErrorConstant.ERR_000, ErrorConstant.ERR_000_LABEL);
        }
    }

    /**
     * @param reviewStatus
     * return
     */
    @GetMapping("/bookings-review")
    public ApiResponse<?> getUserBookingReview(@RequestParam int reviewStatus){
        try{
            List<UserBookingDTO> userBookingDTOList = bookingService.getAllBookingsReview(reviewStatus);
            return new ApiResponse(200, userBookingDTOList, null, null);
        }catch (Exception e){
            e.printStackTrace();
            return new ApiResponse(400, ErrorConstant.ERR_000, ErrorConstant.ERR_000_LABEL);
        }
    }
}
