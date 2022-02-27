package com.capstone_project.hbts.dto.Booking;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
public class UserBookingDetailDTO {

    private Integer id;

    private BigDecimal paid;

    private int userBookingId;

    private int roomTypeId;

    private int quantity;

}
