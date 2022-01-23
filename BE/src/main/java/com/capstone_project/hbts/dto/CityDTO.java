package com.capstone_project.hbts.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class CityDTO {

    private Integer id;

    private String nameCity;

    private List<DistrictDTO> listDistrict;

}
