package com.capstone_project.hbts.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
public class UserBookingDetailDTO {

    private Integer id;

    private BigDecimal paid;

    private int userBooking;

    private int roomType;

    private int quantity;

}
