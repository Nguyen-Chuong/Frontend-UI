package com.capstone_project.hbts.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

@Data
@NoArgsConstructor
public class VipDTO {

    private Integer id;

    private String nameVip;

    private BigDecimal rangeStart;

    private BigDecimal rangeEnd;

    private int discount;

    private List<UserDTO> listUsers;

}
