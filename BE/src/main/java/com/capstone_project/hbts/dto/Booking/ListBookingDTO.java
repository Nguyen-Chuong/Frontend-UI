package com.capstone_project.hbts.dto.Booking;

import com.capstone_project.hbts.dto.HotelDTO;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Data
@NoArgsConstructor
public class ListBookingDTO {

    private Timestamp checkIn;

    private Timestamp checkOut;

    private int status;

    private HotelDTO hotel;

    private Timestamp bookingDate;

    private String username;

}
