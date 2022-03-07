package com.capstone_project.hbts.service;

import com.capstone_project.hbts.dto.Benefit.BenefitDTO;

import java.util.List;

public interface BenefitService {

    /**
     * Get all room's benefit in hotel
     * @param hotelId
     */
    List<BenefitDTO> getListBenefitByHotelId(int hotelId);

}
