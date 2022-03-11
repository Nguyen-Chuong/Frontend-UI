package com.capstone_project.hbts.service;

import com.capstone_project.hbts.dto.Room.RoomFacilityDTO;
import com.capstone_project.hbts.request.FacilityRequest;

import java.util.List;

public interface RoomFacilityService {

    /**
     * Insert list facility to a room type
     * @param facilityRequest
     */
    void addListFacilityToRoomType(FacilityRequest facilityRequest);

    /**
     * view list facility of a room type
     * @param roomTypeId
     */
    List<RoomFacilityDTO> viewListFacility(int roomTypeId);

}
