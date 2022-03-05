package com.capstone_project.hbts.resource;

import com.capstone_project.hbts.constants.ErrorConstant;
import com.capstone_project.hbts.constants.ValidateConstant;
import com.capstone_project.hbts.dto.Booking.BookingListDTO;
import com.capstone_project.hbts.dto.Booking.UserBookingDTO;
import com.capstone_project.hbts.response.ApiResponse;
import com.capstone_project.hbts.response.DataPagingResponse;
import com.capstone_project.hbts.service.BookingService;
import com.capstone_project.hbts.service.UserService;
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

import java.util.List;

@CrossOrigin
@RestController
@Log4j2
@RequestMapping("/api/v1")
public class BookingResource {

    private final BookingService bookingService;

    private final UserService userService;

    public BookingResource(BookingService bookingService, UserService userService) {
        this.bookingService = bookingService;
        this.userService = userService;
    }

    /**
     * @param username
     * @apiNote both admin & user can call this
     * return
     */
    @GetMapping("/user-bookings/{username}")
    public ResponseEntity<?> getUserBooking(@PathVariable String username){
        log.info("REST request to get list user's booking by username");

        int userId = userService.getUserId(username);
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

    /**
     * @param page
     * @param pageSize
     * return
     */
    @GetMapping("/get-all-booking")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_MANAGER')")
    public ResponseEntity<?> getAllUserBooking(@RequestParam(defaultValue = ValidateConstant.PAGE) int page,
                                               @RequestParam(defaultValue = ValidateConstant.PER_PAGE) int pageSize){
        log.info("REST request to get list user's booking for admin");

        try{
            Page<BookingListDTO> userBookingDTOList = bookingService.getAllBookingForAdmin(PageRequest.of(page, pageSize));

            DataPagingResponse<?> dataPagingResponse = new DataPagingResponse<>(userBookingDTOList.getContent(),
                    userBookingDTOList.getTotalElements(), page, userBookingDTOList.getSize());

            return ResponseEntity.ok()
                    .body(new ApiResponse<>(200, dataPagingResponse,
                            null, null));
        }catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.badRequest()
                    .body(new ApiResponse<>(400, null,
                            ErrorConstant.ERR_000, ErrorConstant.ERR_000_LABEL));
        }
    }

    /**
     * @param bookingId
     * return
     */
    @GetMapping("/booking/{bookingId}")
    public ResponseEntity<?> getBookingById(@PathVariable int bookingId){
        log.info("REST request to get user's booking by id");

        try{
            UserBookingDTO userBookingDTO = bookingService.getBookingById(bookingId);
            return ResponseEntity.ok()
                    .body(new ApiResponse<>(200, userBookingDTO,
                            null, null));
        }catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.badRequest()
                    .body(new ApiResponse<>(400, null,
                            ErrorConstant.ERR_000, ErrorConstant.ERR_000_LABEL));
        }
    }

    /**
     * @param hotelId
     * @param page
     * @param pageSize
     * @apiNote for provider
     * return
     */
    @GetMapping("/bookings/hotel/{hotelId}")
    public ResponseEntity<?> getBookingByHotelId(@PathVariable int hotelId,
                                                 @RequestParam(defaultValue = ValidateConstant.PAGE) int page,
                                                 @RequestParam(defaultValue = ValidateConstant.PER_PAGE) int pageSize){
        log.info("REST request to get user's booking by hotel id");

        try{
            Page<UserBookingDTO> userBookingDTOPage = bookingService.getBookingsByHotelId(hotelId,
                    PageRequest.of(page, pageSize));

            DataPagingResponse<?> dataPagingResponse = new DataPagingResponse<>(userBookingDTOPage.getContent(),
                    userBookingDTOPage.getTotalElements(), page, userBookingDTOPage.getSize());

            return ResponseEntity.ok()
                    .body(new ApiResponse<>(200, dataPagingResponse,
                            null, null));
        }catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.badRequest()
                    .body(new ApiResponse<>(400, null,
                            ErrorConstant.ERR_000, ErrorConstant.ERR_000_LABEL));
        }
    }

    /**
     * @param bookingId
     * return
     */
    @PatchMapping("/cancel-booking/{bookingId}")
    public ResponseEntity<?> cancelBooking(@PathVariable int bookingId){
        log.info("REST request to cancel booking");

        try{
            bookingService.cancelBooking(bookingId);
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
