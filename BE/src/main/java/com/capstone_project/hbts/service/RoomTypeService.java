package com.capstone_project.hbts.service;

import com.capstone_project.hbts.dto.RoomTypeDTO;
import com.capstone_project.hbts.entity.RoomType;

import java.util.List;

public interface RoomTypeService {

    /**
     * Create room type
     * @param roomType
     */
    void createRoomType(RoomType roomType);

    /**
     * Update room type
     * @param roomTypeId
     */
    boolean updateRoomType(Integer roomTypeId);

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

}
