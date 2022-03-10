package com.capstone_project.hbts.service;

import com.capstone_project.hbts.dto.Room.RoomDetailDTO;
import com.capstone_project.hbts.dto.Room.RoomTypeDTO;
import com.capstone_project.hbts.request.RoomTypeRequest;

import java.util.List;

public interface RoomTypeService {

    /**
     * Create room type for provider
     * @param roomTypeRequest
     */
    void createRoomType(RoomTypeRequest roomTypeRequest);

    /**
     * Update room type for provider
     * @param roomTypeDTO
     */
    void updateRoomType(RoomTypeDTO roomTypeDTO);

    /**
     * Get room type by hotel id
     * @param hotelId
     */
    List<RoomTypeDTO> loadRoomTypeByHotelId(int hotelId);

    /**
     * Delete room type
     * @param roomTypeId
     */
    void deleteRoomType(int roomTypeId);

    /**
     * View detail of a room type
     * @param roomTypeId
     */
    RoomDetailDTO viewRoomDetail(int roomTypeId);

    // have drop down list pick facility, benefit type -> filter list facility, benefit to pick
    // add to room facility, room benefit table

}
