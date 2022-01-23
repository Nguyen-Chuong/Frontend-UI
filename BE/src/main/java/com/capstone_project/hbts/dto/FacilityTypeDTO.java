package com.capstone_project.hbts.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class FacilityTypeDTO {

    private Integer id;

    private String name;

    private List<FacilityDTO> listFacility;

}
