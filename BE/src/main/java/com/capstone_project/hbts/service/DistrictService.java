package com.capstone_project.hbts.service;

import com.capstone_project.hbts.dto.Location.DistrictSearchDTO;

import java.util.List;

public interface DistrictService {

    /**
     * search districts
     * @param text
     */
    List<DistrictSearchDTO> searchDistrict(String text);

}
