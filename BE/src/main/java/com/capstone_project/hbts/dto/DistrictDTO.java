package com.capstone_project.hbts.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class DistrictDTO {

    private Integer id;

    private String nameDistrict;

    private List<HotelDTO> listHotel;

}
