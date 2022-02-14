package com.capstone_project.hbts.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Data
@NoArgsConstructor
public class UserBookingDTO {

    private Integer id;

    private Timestamp checkIn;

    private Timestamp checkOut;

    private int status;

    private int reviewStatus;

    private UserDTO users;

    private HotelDTO hotel;

}
