package com.capstone_project.hbts.resource;

import com.capstone_project.hbts.constants.ErrorConstant;
import com.capstone_project.hbts.decryption.DataDecryption;
import com.capstone_project.hbts.dto.Room.RoomDetailDTO;
import com.capstone_project.hbts.dto.Room.RoomTypeDTO;
import com.capstone_project.hbts.entity.RoomType;
import com.capstone_project.hbts.response.ApiResponse;
import com.capstone_project.hbts.service.RoomTypeService;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin
@RestController
@Log4j2
@RequestMapping("api/v1")
public class RoomTypeResource {

    private final RoomTypeService roomTypeService;

    private final DataDecryption dataDecryption;

    public RoomTypeResource(RoomTypeService roomTypeService, DataDecryption dataDecryption) {
        this.roomTypeService = roomTypeService;
        this.dataDecryption = dataDecryption;
    }

    /**
     * @param hotelId
     * @apiNote public for guest can view
     * return
     */
    @GetMapping("/public/room-type")
    public ResponseEntity<?> getListRoomTypeByHotel(@RequestParam String hotelId){
        log.info("REST request to get list room type by hotel id");
        int id;
        try {
            id = dataDecryption.convertEncryptedDataToInt(hotelId);
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(new ApiResponse<>(400, null,
                            ErrorConstant.ERR_DATA_001, ErrorConstant.ERR_DATA_001_LABEL));
        }
        try {
            List<RoomTypeDTO> list = roomTypeService.loadRoomTypeByHotelId(id);
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
    @GetMapping("/public/room-detail")
    public ResponseEntity<?> getRoomDetailByRoomTypeId(@RequestParam String roomTypeId){
        log.info("REST request to get detail room type by room type id");
        int id;
        try {
            id = dataDecryption.convertEncryptedDataToInt(roomTypeId);
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(new ApiResponse<>(400, null,
                            ErrorConstant.ERR_DATA_001, ErrorConstant.ERR_DATA_001_LABEL));
        }
        try {
            RoomDetailDTO roomDetailDTO = roomTypeService.viewRoomDetail(id);
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
