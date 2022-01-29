package com.capstone_project.hbts.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
public class VipDTO {

    private Integer id;

    private String nameVip;

    private BigDecimal rangeStart;

    private BigDecimal rangeEnd;

    private int discount;

}
