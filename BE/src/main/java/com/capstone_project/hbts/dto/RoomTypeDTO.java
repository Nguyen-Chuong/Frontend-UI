package com.capstone_project.hbts.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.List;

@Data
@NoArgsConstructor
public class RoomTypeDTO {

    private Integer id;

    private String name;

    private BigDecimal price;

    private int numberOfPeople;

    private int quantity;

    private int availableRooms;

    private int dealPercentage;

    private Timestamp dealExpire;

    private List<UserBookingDetailDTO> listUserBookingDetail;

    private List<ImageDTO> listImage;

    private List<RoomFacilityDTO> listRoomFacility;

}
