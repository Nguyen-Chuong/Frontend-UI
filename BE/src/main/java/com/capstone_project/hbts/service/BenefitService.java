package com.capstone_project.hbts.service;

import com.capstone_project.hbts.dto.Benefit.BenefitResult;
import com.capstone_project.hbts.dto.Benefit.BenefitTypeDTO;

import java.util.List;
import java.util.Map;

public interface BenefitService {

    /**
     * Get all room's benefit in hotel
     * @param hotelId
     */
    Map<BenefitTypeDTO, List<BenefitResult>> getListBenefitByHotelId(int hotelId);

}
