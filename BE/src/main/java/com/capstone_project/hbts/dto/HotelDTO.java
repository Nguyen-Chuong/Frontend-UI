package com.capstone_project.hbts.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

@Data
@NoArgsConstructor
public class HotelDTO {

    private Integer id;

    private String name;

    private String address;

    private String avatar;

    private String description;

    private BigDecimal lowestPrice;

    private int status;

    private List<UserBookingDTO> listUserBooking;

    private List<RoomTypeDTO> listRoomType;

}