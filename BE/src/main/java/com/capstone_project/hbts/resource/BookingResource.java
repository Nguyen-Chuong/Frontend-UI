package com.capstone_project.hbts.resource;

import com.capstone_project.hbts.constants.ErrorConstant;
import com.capstone_project.hbts.dto.UserBookingDTO;
import com.capstone_project.hbts.response.ApiResponse;
import com.capstone_project.hbts.service.BookingService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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
    @GetMapping("/user-bookings/{userId}")
    public ApiResponse<?> getUserBooking(@PathVariable int userId){
        try{
            List<UserBookingDTO> userBookingDTOList = bookingService.getAllBookings(userId);
            return new ApiResponse<>(200, userBookingDTOList, null, null);
        }catch (Exception e){
            e.printStackTrace();
            return new ApiResponse<>(400, ErrorConstant.ERR_000, ErrorConstant.ERR_000_LABEL);
        }
    }

    /**
     * @param reviewStatus
     * return
     */
    @GetMapping("/bookings-review/{reviewStatus}")
    public ApiResponse<?> getUserBookingReview(@PathVariable int reviewStatus){
        try{
            List<UserBookingDTO> userBookingDTOList = bookingService.getAllBookingsReview(reviewStatus);
            return new ApiResponse<>(200, userBookingDTOList, null, null);
        }catch (Exception e){
            e.printStackTrace();
            return new ApiResponse<>(400, ErrorConstant.ERR_000, ErrorConstant.ERR_000_LABEL);
        }
    }

    // api insert a booking into booking table after user booked
    // and modify later when user cancelled or so smth
    // here

    /**
     * @param userId
     * return
     */
    @GetMapping("/bookings-completed/{userId}")
    public ApiResponse<?> getNumberBookingsCompleted(@PathVariable int userId){
        try{
            int numberBookingCompleted = bookingService.getNumberBookingsCompleted(userId);
            return new ApiResponse<>(200, numberBookingCompleted, null, null);
        }catch (Exception e){
            e.printStackTrace();
            return new ApiResponse<>(400, ErrorConstant.ERR_000, ErrorConstant.ERR_000_LABEL);
        }
    }

}
