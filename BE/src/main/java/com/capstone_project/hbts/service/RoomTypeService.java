package com.capstone_project.hbts.service;

import com.capstone_project.hbts.dto.RoomTypeDTO;
import com.capstone_project.hbts.entity.RoomType;
import org.springframework.stereotype.Service;

import java.util.List;


public interface RoomTypeService {
    /**
     * Create room type
     * @param roomType
     */
    void createRoomType(RoomType roomType);

    /**
     * Load all room type
     */
    List<RoomTypeDTO> loadRoomType();

    /**
     * Update room type
     * @param roomTypeId
     */
    boolean updateRoomType(Integer roomTypeId);

    /**
     * Create room type
     */
    List<RoomTypeDTO> loadRoomTypeByHotelId(int hotelId);

    /**
     * Delete room type
     * @param roomTypeId
     */
    void deleteRoomType(int roomTypeId);
}
