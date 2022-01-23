package com.capstone_project.hbts.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.Set;

@Data
@NoArgsConstructor
public class UserDTO {

    private Integer id;

    private String username;

    private String firstname;

    private String lastname;

    private String email;

    private String phone;

    private String address;

    private int type;

    private String avatar;

    private BigDecimal spend;

    private Set<UserBookingDTO> listUserBooking;

}
