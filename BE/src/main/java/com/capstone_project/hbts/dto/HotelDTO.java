package com.capstone_project.hbts.dto;

import com.capstone_project.hbts.entity.RoomType;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.Set;

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

    private DistrictDTO district;

}
