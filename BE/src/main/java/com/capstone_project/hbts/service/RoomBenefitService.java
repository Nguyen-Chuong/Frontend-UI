package com.capstone_project.hbts.service;

import com.capstone_project.hbts.request.BenefitRequest;

public interface RoomBenefitService {

    /**
     * Insert list benefit to a room type
     * @param benefitRequest
     */
    void addListBenefitToRoomType(BenefitRequest benefitRequest);

}
