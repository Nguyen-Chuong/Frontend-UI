package com.capstone_project.hbts.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ProviderDTO {

    private Integer id;

    private String username;

    private String providerName;

    private String email;

    private String phone;

    private String address;

}
