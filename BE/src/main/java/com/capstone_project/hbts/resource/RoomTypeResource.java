package com.capstone_project.hbts.resource;

import com.capstone_project.hbts.constants.ErrorConstant;
import com.capstone_project.hbts.dto.Room.RoomDetailDTO;
import com.capstone_project.hbts.dto.Room.RoomTypeDTO;
import com.capstone_project.hbts.response.ApiResponse;
import com.capstone_project.hbts.service.RoomTypeService;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin
@RestController
@Log4j2
@RequestMapping("api/v1")
public class RoomTypeResource {

    private final RoomTypeService roomTypeService;

    public RoomTypeResource(RoomTypeService roomTypeService) {
        this.roomTypeService = roomTypeService;
    }

    /**
     * @param hotelId
     * @apiNote public for guest can view
     * return
     */
    @GetMapping("/public/room-type/{hotelId}")
    public ResponseEntity<?> getRoomType(@PathVariable int hotelId){
        log.info("REST request to get list room type by hotel id");

        try {
            List<RoomTypeDTO> list = roomTypeService.loadRoomTypeByHotelId(hotelId);
            return ResponseEntity.ok()
                    .body(new ApiResponse<>(200, list,
                            null, null));
        }catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.badRequest()
                    .body(new ApiResponse<>(400, null,
                            ErrorConstant.ERR_000, ErrorConstant.ERR_000_LABEL));
        }
    }

    /**
     * @param roomTypeId
     * @apiNote public for guest can view
     * return
     */
    @GetMapping("/public/room-detail/{roomTypeId}")
    public ResponseEntity<?> getRoomDetailByRoomTypeId(@PathVariable int roomTypeId){
        log.info("REST request to get detail room type by room type id");

        try {
            RoomDetailDTO roomDetailDTO = roomTypeService.viewRoomDetail(roomTypeId);
            return ResponseEntity.ok()
                    .body(new ApiResponse<>(200, roomDetailDTO,
                            null, null));
        }catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.badRequest()
                    .body(new ApiResponse<>(400, null,
                            ErrorConstant.ERR_000, ErrorConstant.ERR_000_LABEL));
        }
    }

}
