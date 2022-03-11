package com.capstone_project.hbts.service;

import com.capstone_project.hbts.dto.Room.RoomBenefitDTO;
import com.capstone_project.hbts.request.BenefitRequest;

import java.util.List;

public interface RoomBenefitService {

    /**
     * Insert list benefit to a room type
     * @param benefitRequest
     */
    void addListBenefitToRoomType(BenefitRequest benefitRequest);

    /**
     * view list benefit of a room type
     * @param roomTypeId
     */
    List<RoomBenefitDTO> viewListBenefit(int roomTypeId);

}
