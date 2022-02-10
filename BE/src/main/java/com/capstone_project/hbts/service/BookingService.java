package com.capstone_project.hbts.service;

import com.capstone_project.hbts.dto.UserBookingDTO;

import java.util.List;

public interface BookingService {

    /**
     * get all bookings
     * @param
     */
    List<UserBookingDTO> getAllBookings(int userId);

}
