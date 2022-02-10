package com.capstone_project.hbts.service;

import com.capstone_project.hbts.dto.UserBookingDTO;

import java.util.List;

public interface BookingService {

    /**
     * get all bookings
     * @param userId
     */
    List<UserBookingDTO> getAllBookings(int userId);

    /**
     * get all bookings need to review or done
     * @param reviewStatus
     */
    List<UserBookingDTO> getAllBookingsReview(int reviewStatus);

}
