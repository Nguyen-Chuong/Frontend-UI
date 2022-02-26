package com.capstone_project.hbts.resource;

import com.capstone_project.hbts.constants.ErrorConstant;
import com.capstone_project.hbts.dto.RoomTypeDTO;
import com.capstone_project.hbts.response.ApiResponse;
import com.capstone_project.hbts.service.RoomTypeService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin
@RestController
public class RoomTypeResource {

    private final RoomTypeService roomTypeService;

    public RoomTypeResource(RoomTypeService roomTypeService) {
        this.roomTypeService = roomTypeService;
    }

    @GetMapping("/room-type/{hotelId}")
    public ApiResponse<?> getRoomType(@PathVariable int hotelId){
        try {
            List<RoomTypeDTO> list = roomTypeService.loadRoomTypeByHotelId(hotelId);
            return new ApiResponse<>(200, list, null, null);
        }catch (Exception e){
            e.printStackTrace();
            return new ApiResponse<>(400, ErrorConstant.ERR_000, ErrorConstant.ERR_000_LABEL);
        }
    }
}