package com.capstone_project.hbts.dto.Room;

import com.capstone_project.hbts.dto.Benefit.BenefitDTO;
import com.capstone_project.hbts.dto.Facility.FacilityDTO;
import com.capstone_project.hbts.dto.ImageDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RoomDetailDTO {

    private Integer id;

    private String name;

    private Set<ImageDTO> listImage;

    private List<FacilityDTO> listFacility;

    private Set<BenefitDTO> listBenefit;

}
