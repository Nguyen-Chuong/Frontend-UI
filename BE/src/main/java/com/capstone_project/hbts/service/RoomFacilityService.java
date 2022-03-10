package com.capstone_project.hbts.service;

import com.capstone_project.hbts.request.FacilityRequest;

public interface RoomFacilityService {

    /**
     * Insert list facility to a room type
     * @param facilityRequest
     */
    void addListFacilityToRoomType(FacilityRequest facilityRequest);

}
