package com.capstone_project.hbts.request;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ManagerRequest {

    private String username;

    private String password;

    private String firstname;

    private String lastname;

    private String email;

    private String phone;

    private int type;

}
