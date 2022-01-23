package com.capstone_project.hbts.request;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
public class UserRequest {

    private String username;

    private String password;

    private String firstname;

    private String lastname;

    private String email;

    private String phone;

    private String address;

    private String avatar;

    private BigDecimal spend;

    private int type;

}
