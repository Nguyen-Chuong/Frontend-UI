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
    List<UserBookingDTO> getAllBookingsReview(int reviewStatus, int userId);

    /**
     * count number of all bookings completed by user id
     * @param userId
     */
    int getNumberBookingsCompleted(int userId);

    /**
     * get all bookings by status
     * @param status
     * @param userId
     */
    List<UserBookingDTO> getAllBookingsByStatus(int status, int userId);


}
